"""
Unit tests for utils.stripe_checkout, the in-repo replacement for
emergentintegrations.payments.stripe.checkout.

These are pure unit tests: they do not reach Stripe and need no running server.
Run them with:  pytest tests/test_stripe_checkout.py
"""

import asyncio

import pytest

from utils.stripe_checkout import (
    CheckoutSessionRequest,
    StripeCheckout,
    to_minor_units,
)


class TestToMinorUnits:
    """Amounts cross the API boundary in major units and must reach Stripe
    as exact integer minor units."""

    @pytest.mark.parametrize(
        "amount,currency,expected",
        [
            (50.0, "eur", 5000),
            (130.0, "eur", 13000),
            (51.0, "EUR", 5100),      # currency casing must not matter
            (0.99, "eur", 99),
            (1.10, "eur", 110),       # classic float-repr trap
            (2.675, "eur", 268),      # rounds half-up rather than truncating to 267
            (0.0, "eur", 0),
        ],
    )
    def test_decimal_currencies_scale_by_100(self, amount, currency, expected):
        assert to_minor_units(amount, currency) == expected

    @pytest.mark.parametrize("currency", ["jpy", "KRW", "vnd"])
    def test_zero_decimal_currencies_are_not_scaled(self, currency):
        assert to_minor_units(5000.0, currency) == 5000

    def test_package_prices_survive_the_round_trip(self):
        """The two configured packages must not drift by a cent."""
        from config.payment_config import PAYMENT_PACKAGES

        for package_id, package in PAYMENT_PACKAGES.items():
            minor = to_minor_units(package["price"], package["currency"])
            assert minor == int(round(package["price"] * 100)), package_id
            assert minor > 0, package_id


class TestStripeCheckoutConstruction:
    def test_missing_api_key_is_rejected_early(self):
        """An empty key must fail here rather than deep inside Stripe."""
        with pytest.raises(ValueError, match="STRIPE_API_KEY"):
            StripeCheckout(api_key="")

    def test_webhook_secret_falls_back_to_environment(self, monkeypatch):
        monkeypatch.setenv("STRIPE_WEBHOOK_SECRET", "whsec_from_env")
        checkout = StripeCheckout(api_key="sk_test_123")
        assert checkout.webhook_secret == "whsec_from_env"

    def test_explicit_webhook_secret_wins(self, monkeypatch):
        monkeypatch.setenv("STRIPE_WEBHOOK_SECRET", "whsec_from_env")
        checkout = StripeCheckout(api_key="sk_test_123", webhook_secret="whsec_explicit")
        assert checkout.webhook_secret == "whsec_explicit"


class TestWebhookVerification:
    def test_unverifiable_webhook_is_refused(self, monkeypatch):
        """Without a signing secret the payload cannot be trusted to mark a
        payment paid, so handle_webhook must fail closed."""
        monkeypatch.delenv("STRIPE_WEBHOOK_SECRET", raising=False)
        checkout = StripeCheckout(api_key="sk_test_123")

        with pytest.raises(ValueError, match="STRIPE_WEBHOOK_SECRET"):
            asyncio.run(
                checkout.handle_webhook(b'{"id": "evt_1"}', "t=1,v1=deadbeef")
            )


class TestCheckoutSessionRequest:
    def test_product_name_is_optional(self):
        request = CheckoutSessionRequest(
            amount=50.0,
            currency="eur",
            success_url="https://example.com/ok",
            cancel_url="https://example.com/no",
        )
        assert request.product_name is None
        assert request.metadata == {}
