"""
Stripe Checkout integration built on the official `stripe` SDK.

This module replaces `emergentintegrations.payments.stripe.checkout`, which was
only installable from Emergent's private package index. The public surface
(`StripeCheckout` plus the request/response models) is kept deliberately close
to the package it replaces so callers did not have to change.

Amounts cross this boundary in major currency units (e.g. 50.0 EUR), matching
`config.payment_config.PAYMENT_PACKAGES`. Stripe itself works in minor units,
so the conversion happens here and nowhere else.
"""

import logging
import os
from decimal import ROUND_HALF_UP, Decimal
from typing import Dict, Optional

import stripe
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

# Currencies Stripe expects without a fractional part. Everything else is x100.
# https://docs.stripe.com/currencies#zero-decimal
ZERO_DECIMAL_CURRENCIES = {
    "bif", "clp", "djf", "gnf", "jpy", "kmf", "krw", "mga",
    "pyg", "rwf", "ugx", "vnd", "vuv", "xaf", "xof", "xpf",
}


def to_minor_units(amount: float, currency: str) -> int:
    """Convert a major-unit amount to the integer minor units Stripe expects.

    Uses Decimal so 130.0 EUR cannot land on 12999 through float drift, and
    rounds half-up because that is the convention customers expect on money.
    """
    value = Decimal(str(amount))
    if currency.lower() not in ZERO_DECIMAL_CURRENCIES:
        value *= 100
    return int(value.to_integral_value(rounding=ROUND_HALF_UP))


class CheckoutSessionRequest(BaseModel):
    amount: float = Field(..., description="Amount in major currency units, e.g. 50.0")
    currency: str = Field(..., description="ISO currency code, e.g. 'eur'")
    success_url: str
    cancel_url: str
    metadata: Dict[str, str] = Field(default_factory=dict)
    product_name: Optional[str] = Field(
        None, description="Line item name shown on the Stripe Checkout page"
    )


class CheckoutSessionResponse(BaseModel):
    session_id: str
    url: str


class CheckoutStatusResponse(BaseModel):
    session_id: str
    status: str = Field(..., description="Stripe session status: open | complete | expired")
    payment_status: str = Field(
        ..., description="Stripe payment status: paid | unpaid | no_payment_required"
    )
    amount_total: Optional[int] = Field(None, description="Total in minor units")
    currency: Optional[str] = None
    metadata: Dict[str, str] = Field(default_factory=dict)


class WebhookResponse(BaseModel):
    event_id: str
    event_type: str
    session_id: Optional[str] = None
    payment_status: Optional[str] = None
    metadata: Dict[str, str] = Field(default_factory=dict)


class StripeCheckout:
    """Thin async wrapper over the Stripe Checkout Session API."""

    def __init__(
        self,
        api_key: str,
        webhook_url: Optional[str] = None,
        webhook_secret: Optional[str] = None,
    ):
        if not api_key:
            raise ValueError("STRIPE_API_KEY is not configured")
        self.api_key = api_key
        # Retained for call-site compatibility; Stripe derives the endpoint from
        # the dashboard configuration, not from the request.
        self.webhook_url = webhook_url
        self.webhook_secret = webhook_secret or os.environ.get("STRIPE_WEBHOOK_SECRET")

    async def create_checkout_session(
        self, request: CheckoutSessionRequest
    ) -> CheckoutSessionResponse:
        product_name = (
            request.product_name
            or request.metadata.get("package_name")
            or "Online session"
        )

        session = await stripe.checkout.Session.create_async(
            api_key=self.api_key,
            mode="payment",
            success_url=request.success_url,
            cancel_url=request.cancel_url,
            line_items=[
                {
                    "quantity": 1,
                    "price_data": {
                        "currency": request.currency.lower(),
                        "unit_amount": to_minor_units(request.amount, request.currency),
                        "product_data": {"name": product_name},
                    },
                }
            ],
            # Stripe rejects non-string metadata values.
            metadata={k: str(v) for k, v in request.metadata.items()},
        )

        if not session.url:
            raise RuntimeError(f"Stripe returned no checkout URL for session {session.id}")

        return CheckoutSessionResponse(session_id=session.id, url=session.url)

    async def get_checkout_status(self, session_id: str) -> CheckoutStatusResponse:
        session = await stripe.checkout.Session.retrieve_async(
            session_id, api_key=self.api_key
        )
        return CheckoutStatusResponse(
            session_id=session.id,
            status=session.status or "open",
            payment_status=session.payment_status or "unpaid",
            amount_total=session.amount_total,
            currency=session.currency,
            metadata=dict(session.metadata or {}),
        )

    async def handle_webhook(self, body: bytes, signature: str) -> WebhookResponse:
        """Verify a Stripe webhook signature and summarise the event.

        Fails closed: without a signing secret the payload is unverifiable, and
        an unverified payload must never be allowed to mark a payment as paid.
        """
        if not self.webhook_secret:
            raise ValueError(
                "STRIPE_WEBHOOK_SECRET is not configured; refusing to trust an "
                "unverified webhook payload"
            )

        event = stripe.Webhook.construct_event(
            payload=body, sig_header=signature, secret=self.webhook_secret
        )

        obj = event["data"]["object"]
        return WebhookResponse(
            event_id=event["id"],
            event_type=event["type"],
            session_id=obj.get("id"),
            payment_status=obj.get("payment_status"),
            metadata=dict(obj.get("metadata") or {}),
        )
