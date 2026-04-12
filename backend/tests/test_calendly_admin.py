"""
Test suite for Calendly Webhook and Admin Dashboard functionality.
Tests:
- Calendly webhook endpoint (invitee.created and invitee.canceled events)
- Admin authentication (login/logout)
- Admin booking stats API
- Admin bookings list with filters
- Status transitions (confirmed -> canceled)
"""

import pytest
import requests
import os
import time
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test data prefix for cleanup
TEST_PREFIX = "TEST_"


class TestHealthCheck:
    """Basic health check to ensure API is running"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✅ API root endpoint working: {data}")


class TestAdminAuth:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test successful admin login"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert "expires_at" in data
        assert len(data["token"]) > 0
        print(f"✅ Admin login successful, token received")
        return data["token"]
    
    def test_admin_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print(f"✅ Invalid credentials correctly rejected")
    
    def test_admin_login_invalid_username(self):
        """Test login with invalid username"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "wronguser",
            "password": "admin123"
        })
        assert response.status_code == 401
        print(f"✅ Invalid username correctly rejected")


class TestCalendlyWebhook:
    """Calendly webhook endpoint tests"""
    
    @pytest.fixture
    def unique_invitee_uri(self):
        """Generate unique invitee URI for each test"""
        return f"https://api.calendly.com/scheduled_events/TEST_{int(time.time())}/invitees/test-invitee"
    
    def test_webhook_invitee_created(self, unique_invitee_uri):
        """Test invitee.created webhook event"""
        webhook_payload = {
            "event": "invitee.created",
            "payload": {
                "invitee": {
                    "email": f"{TEST_PREFIX}user_{int(time.time())}@example.com",
                    "name": f"{TEST_PREFIX}Test User",
                    "uri": unique_invitee_uri,
                    "questions_and_answers": []
                },
                "event": {
                    "event_type": {
                        "name": "Coaching Session"
                    },
                    "start_time": "2026-02-15T10:00:00Z",
                    "end_time": "2026-02-15T11:00:00Z",
                    "uri": f"https://api.calendly.com/scheduled_events/TEST_{int(time.time())}"
                },
                "payment": {
                    "amount": 150,
                    "currency": "EUR",
                    "status": "paid"
                }
            }
        }
        
        response = requests.post(f"{BASE_URL}/api/calendly/webhook", json=webhook_payload)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["event"] == "invitee.created"
        print(f"✅ invitee.created webhook processed successfully")
        return unique_invitee_uri
    
    def test_webhook_invitee_canceled(self):
        """Test invitee.canceled webhook event - creates booking first then cancels"""
        # First create a booking
        unique_uri = f"https://api.calendly.com/scheduled_events/TEST_CANCEL_{int(time.time())}/invitees/test-invitee"
        
        create_payload = {
            "event": "invitee.created",
            "payload": {
                "invitee": {
                    "email": f"{TEST_PREFIX}cancel_user_{int(time.time())}@example.com",
                    "name": f"{TEST_PREFIX}Cancel Test User",
                    "uri": unique_uri,
                    "questions_and_answers": []
                },
                "event": {
                    "event_type": {
                        "name": "Coaching Session"
                    },
                    "start_time": "2026-02-20T14:00:00Z",
                    "end_time": "2026-02-20T15:00:00Z",
                    "uri": f"https://api.calendly.com/scheduled_events/TEST_CANCEL_{int(time.time())}"
                },
                "payment": {
                    "amount": 200,
                    "currency": "EUR",
                    "status": "paid"
                }
            }
        }
        
        # Create the booking
        create_response = requests.post(f"{BASE_URL}/api/calendly/webhook", json=create_payload)
        assert create_response.status_code == 200
        print(f"✅ Booking created for cancellation test")
        
        # Now cancel it
        cancel_payload = {
            "event": "invitee.canceled",
            "payload": {
                "invitee": {
                    "uri": unique_uri
                },
                "event": {
                    "uri": f"https://api.calendly.com/scheduled_events/TEST_CANCEL_{int(time.time())}"
                },
                "cancellation": {
                    "reason": "Schedule conflict - testing cancellation"
                }
            }
        }
        
        cancel_response = requests.post(f"{BASE_URL}/api/calendly/webhook", json=cancel_payload)
        assert cancel_response.status_code == 200
        data = cancel_response.json()
        assert data["status"] == "success"
        assert data["event"] == "invitee.canceled"
        print(f"✅ invitee.canceled webhook processed successfully")
        
        return unique_uri
    
    def test_webhook_unhandled_event(self):
        """Test webhook with unhandled event type"""
        webhook_payload = {
            "event": "some.other.event",
            "payload": {}
        }
        
        response = requests.post(f"{BASE_URL}/api/calendly/webhook", json=webhook_payload)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        print(f"✅ Unhandled event type processed gracefully")


class TestAdminBookingsAPI:
    """Admin bookings API tests"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Admin authentication failed")
    
    @pytest.fixture
    def auth_headers(self, admin_token):
        """Get authorization headers"""
        return {"Authorization": f"Bearer {admin_token}"}
    
    def test_get_booking_stats(self, auth_headers):
        """Test booking stats endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/bookings/stats", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        # Verify all required fields are present
        assert "total_bookings" in data
        assert "confirmed_bookings" in data
        assert "canceled_bookings" in data
        assert "total_revenue" in data
        assert "bookings_by_package" in data
        
        # Verify data types
        assert isinstance(data["total_bookings"], int)
        assert isinstance(data["confirmed_bookings"], int)
        assert isinstance(data["canceled_bookings"], int)
        assert isinstance(data["total_revenue"], (int, float))
        
        print(f"✅ Booking stats retrieved:")
        print(f"   Total: {data['total_bookings']}")
        print(f"   Confirmed: {data['confirmed_bookings']}")
        print(f"   Canceled: {data['canceled_bookings']}")
        print(f"   Revenue: €{data['total_revenue']}")
        
        return data
    
    def test_get_booking_stats_unauthorized(self):
        """Test stats endpoint without auth"""
        response = requests.get(f"{BASE_URL}/api/admin/bookings/stats")
        assert response.status_code == 401
        print(f"✅ Stats endpoint correctly requires authentication")
    
    def test_get_all_bookings(self, auth_headers):
        """Test get all bookings endpoint"""
        response = requests.get(f"{BASE_URL}/api/admin/bookings", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        assert "bookings" in data
        assert "total" in data
        assert isinstance(data["bookings"], list)
        
        print(f"✅ Retrieved {len(data['bookings'])} bookings (total: {data['total']})")
        
        # Verify booking structure if any exist
        if data["bookings"]:
            booking = data["bookings"][0]
            assert "id" in booking
            assert "status" in booking
            # Verify _id is not present (MongoDB ObjectId should be excluded)
            assert "_id" not in booking
            print(f"   First booking status: {booking['status']}")
        
        return data
    
    def test_filter_bookings_by_status_confirmed(self, auth_headers):
        """Test filtering bookings by confirmed status"""
        response = requests.get(f"{BASE_URL}/api/admin/bookings?status=confirmed", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        # All returned bookings should be confirmed
        for booking in data["bookings"]:
            assert booking["status"] == "confirmed", f"Expected confirmed, got {booking['status']}"
        
        print(f"✅ Confirmed filter working: {len(data['bookings'])} confirmed bookings")
        return data
    
    def test_filter_bookings_by_status_canceled(self, auth_headers):
        """Test filtering bookings by canceled status"""
        response = requests.get(f"{BASE_URL}/api/admin/bookings?status=canceled", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        # All returned bookings should be canceled
        for booking in data["bookings"]:
            assert booking["status"] == "canceled", f"Expected canceled, got {booking['status']}"
        
        print(f"✅ Canceled filter working: {len(data['bookings'])} canceled bookings")
        return data
    
    def test_search_bookings(self, auth_headers):
        """Test search functionality"""
        response = requests.get(f"{BASE_URL}/api/admin/bookings?search=TEST_", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        
        print(f"✅ Search working: found {len(data['bookings'])} bookings matching 'TEST_'")
        return data


class TestCancellationFlow:
    """End-to-end cancellation flow tests"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Admin authentication failed")
    
    @pytest.fixture
    def auth_headers(self, admin_token):
        """Get authorization headers"""
        return {"Authorization": f"Bearer {admin_token}"}
    
    def test_full_cancellation_flow(self, auth_headers):
        """
        Test complete flow:
        1. Create booking via webhook
        2. Verify it appears as confirmed
        3. Cancel via webhook
        4. Verify status changed to canceled
        5. Verify stats updated correctly
        """
        unique_id = int(time.time() * 1000)
        unique_uri = f"https://api.calendly.com/scheduled_events/FLOW_TEST_{unique_id}/invitees/test"
        test_email = f"{TEST_PREFIX}flow_test_{unique_id}@example.com"
        
        # Step 1: Get initial stats
        initial_stats = requests.get(f"{BASE_URL}/api/admin/bookings/stats", headers=auth_headers).json()
        initial_confirmed = initial_stats["confirmed_bookings"]
        initial_canceled = initial_stats["canceled_bookings"]
        initial_revenue = initial_stats["total_revenue"]
        print(f"📊 Initial stats - Confirmed: {initial_confirmed}, Canceled: {initial_canceled}, Revenue: €{initial_revenue}")
        
        # Step 2: Create booking
        create_payload = {
            "event": "invitee.created",
            "payload": {
                "invitee": {
                    "email": test_email,
                    "name": f"{TEST_PREFIX}Flow Test User",
                    "uri": unique_uri
                },
                "event": {
                    "event_type": {"name": "Premium Coaching"},
                    "start_time": "2026-03-01T10:00:00Z",
                    "end_time": "2026-03-01T11:00:00Z",
                    "uri": f"https://api.calendly.com/scheduled_events/FLOW_TEST_{unique_id}"
                },
                "payment": {
                    "amount": 300,
                    "currency": "EUR",
                    "status": "paid"
                }
            }
        }
        
        create_response = requests.post(f"{BASE_URL}/api/calendly/webhook", json=create_payload)
        assert create_response.status_code == 200
        print(f"✅ Step 2: Booking created")
        
        # Step 3: Verify booking appears as confirmed
        time.sleep(0.5)  # Small delay for DB write
        bookings_response = requests.get(f"{BASE_URL}/api/admin/bookings?search={test_email}", headers=auth_headers)
        assert bookings_response.status_code == 200
        bookings_data = bookings_response.json()
        
        assert len(bookings_data["bookings"]) >= 1, "Booking not found after creation"
        created_booking = bookings_data["bookings"][0]
        assert created_booking["status"] == "confirmed", f"Expected confirmed, got {created_booking['status']}"
        print(f"✅ Step 3: Booking verified as confirmed")
        
        # Step 4: Verify stats updated (confirmed count increased)
        after_create_stats = requests.get(f"{BASE_URL}/api/admin/bookings/stats", headers=auth_headers).json()
        assert after_create_stats["confirmed_bookings"] == initial_confirmed + 1, "Confirmed count didn't increase"
        assert after_create_stats["total_revenue"] == initial_revenue + 300, "Revenue didn't increase by 300"
        print(f"✅ Step 4: Stats updated after creation - Confirmed: {after_create_stats['confirmed_bookings']}, Revenue: €{after_create_stats['total_revenue']}")
        
        # Step 5: Cancel the booking
        cancel_payload = {
            "event": "invitee.canceled",
            "payload": {
                "invitee": {"uri": unique_uri},
                "event": {"uri": f"https://api.calendly.com/scheduled_events/FLOW_TEST_{unique_id}"},
                "cancellation": {"reason": "Testing cancellation flow"}
            }
        }
        
        cancel_response = requests.post(f"{BASE_URL}/api/calendly/webhook", json=cancel_payload)
        assert cancel_response.status_code == 200
        print(f"✅ Step 5: Cancellation webhook sent")
        
        # Step 6: Verify booking status changed to canceled
        time.sleep(0.5)  # Small delay for DB update
        bookings_after_cancel = requests.get(f"{BASE_URL}/api/admin/bookings?search={test_email}", headers=auth_headers)
        canceled_booking = bookings_after_cancel.json()["bookings"][0]
        assert canceled_booking["status"] == "canceled", f"Expected canceled, got {canceled_booking['status']}"
        
        # Verify cancellation details stored
        if "cancellation_reason" in canceled_booking:
            assert canceled_booking["cancellation_reason"] == "Testing cancellation flow"
            print(f"✅ Step 6: Cancellation reason stored: {canceled_booking['cancellation_reason']}")
        if "canceled_at" in canceled_booking:
            print(f"✅ Step 6: Canceled_at timestamp stored: {canceled_booking['canceled_at']}")
        
        print(f"✅ Step 6: Booking status changed to canceled")
        
        # Step 7: Verify final stats
        final_stats = requests.get(f"{BASE_URL}/api/admin/bookings/stats", headers=auth_headers).json()
        assert final_stats["canceled_bookings"] == initial_canceled + 1, "Canceled count didn't increase"
        # Revenue should NOT include canceled booking
        assert final_stats["total_revenue"] == initial_revenue, f"Revenue should be {initial_revenue} (excluding canceled), got {final_stats['total_revenue']}"
        print(f"✅ Step 7: Final stats correct - Canceled: {final_stats['canceled_bookings']}, Revenue: €{final_stats['total_revenue']} (excludes canceled)")
        
        print(f"\n🎉 Full cancellation flow test PASSED!")


class TestPublicCalendlyEndpoints:
    """Test public Calendly endpoints (no auth required)"""
    
    def test_get_bookings_public(self):
        """Test public bookings endpoint"""
        response = requests.get(f"{BASE_URL}/api/calendly/bookings")
        assert response.status_code == 200
        data = response.json()
        assert "bookings" in data
        assert "count" in data
        print(f"✅ Public bookings endpoint working: {data['count']} bookings")
    
    def test_get_bookings_by_status(self):
        """Test filtering public bookings by status"""
        response = requests.get(f"{BASE_URL}/api/calendly/bookings?status=confirmed")
        assert response.status_code == 200
        data = response.json()
        for booking in data["bookings"]:
            assert booking["status"] == "confirmed"
        print(f"✅ Public bookings status filter working")


# Cleanup fixture to run after all tests
@pytest.fixture(scope="session", autouse=True)
def cleanup_test_data():
    """Cleanup test data after all tests complete"""
    yield
    # Note: In production, you'd want to clean up TEST_ prefixed data
    # For now, we leave it for manual inspection
    print("\n📝 Test data with TEST_ prefix left in database for inspection")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
