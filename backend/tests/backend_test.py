"""Backend API tests for 3CAPSTECH site (root, contact, newsletter, enroll, stats, PostgreSQL persistence)."""
import os
import uuid
import sys
from pathlib import Path

import pytest
import requests

# Configure Django environment for direct ORM access in test assertions
BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django
django.setup()

from api.models import Contact, Newsletter, Enrollment

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://127.0.0.1:8000").rstrip("/")


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Module: root / stats ----------
class TestHealth:
    def test_root_ok(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/", timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["status"] == "ok"
        assert d["service"] == "3CAPSTECH API"
        assert isinstance(d.get("time"), str) and len(d["time"]) > 0

    def test_stats(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/stats", timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        for k in ["projects", "learners", "instructors", "countries", "satisfaction"]:
            assert isinstance(d[k], int), f"{k} not int"

    def test_brand_config(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/config", timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["primary_color"] == "#11A831"
        assert d["secondary_color"] == "#0549B1"
        assert d["text_primary_light"] == "#1E293B"
        assert d["name"] == "3CAPSTECH"

    def test_services(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/services", timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["count"] == 8
        assert len(d["services"]) == 8

    def test_engagement(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/engagement", json={"event": "click_service", "service_id": "software"}, timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["ok"] is True
        assert d["event"] == "click_service"

    def test_guidance(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/guidance", timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert len(d["prompts"]) == 3
        assert "guided_action" in d


# ---------- Module: contact ----------
class TestContact:
    def test_contact_valid(self, api_client):
        payload = {
            "name": "TEST_QA User",
            "email": f"TEST_qa_{uuid.uuid4().hex[:8]}@example.com",
            "message": "TEST_ automated contact message",
            "interest": "Custom Software",
            "company": "TEST_Co",
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["ok"] is True
        assert isinstance(d["id"], str) and len(d["id"]) > 0
        assert "24 hours" in d["message"]

    def test_contact_minimal_fields(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Min", "email": f"TEST_min_{uuid.uuid4().hex[:6]}@example.com",
            "message": "hi"}, timeout=30)
        assert r.status_code == 200, r.text
        assert r.json()["ok"] is True

    def test_contact_invalid_email_422(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Bad", "email": "not-an-email", "message": "hi"}, timeout=30)
        assert r.status_code == 422, r.text
        assert "detail" in r.json()

    def test_contact_missing_fields_422(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={"email": "a@b.com"}, timeout=30)
        assert r.status_code == 422, r.text

    def test_contact_empty_message_422(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_E", "email": "a@b.com", "message": ""}, timeout=30)
        assert r.status_code == 422, r.text


# ---------- Module: newsletter ----------
class TestNewsletter:
    def test_subscribe_and_duplicate(self, api_client):
        email = f"TEST_news_{uuid.uuid4().hex[:8]}@example.com"
        r1 = api_client.post(f"{BASE_URL}/api/newsletter", json={"email": email}, timeout=30)
        assert r1.status_code == 200, r1.text
        d1 = r1.json()
        assert d1["ok"] is True
        assert "Subscribed" in d1["message"]

        r2 = api_client.post(f"{BASE_URL}/api/newsletter", json={"email": email}, timeout=30)
        assert r2.status_code == 200, r2.text
        d2 = r2.json()
        assert d2["ok"] is True
        assert "already on the list" in d2["message"]

    def test_subscribe_invalid_email(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/newsletter", json={"email": "bad@"}, timeout=30)
        assert r.status_code == 422, r.text


# ---------- Module: enroll ----------
class TestEnroll:
    @pytest.mark.parametrize("course_id", ["adv-web", "ai-python", "llm-apps"])
    def test_enroll_ok(self, api_client, course_id):
        r = api_client.post(f"{BASE_URL}/api/enroll", json={
            "course_id": course_id,
            "email": f"TEST_enr_{uuid.uuid4().hex[:8]}@example.com",
            "name": "TEST_Learner"}, timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["ok"] is True
        assert isinstance(d["id"], str) and len(d["id"]) > 0
        assert "Enrolment confirmed" in d["message"]

    def test_enroll_invalid_email(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/enroll", json={
            "course_id": "adv-web", "email": "nope"}, timeout=30)
        assert r.status_code == 422, r.text

    def test_enroll_missing_course_id(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/enroll", json={"email": "a@b.com"}, timeout=30)
        assert r.status_code == 422, r.text


# ---------- Module: persistence in PostgreSQL + cleanup ----------
class TestPersistence:
    def test_contact_persisted_in_postgres(self, api_client):
        email = f"TEST_persist_{uuid.uuid4().hex[:8]}@example.com"
        r = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Persist", "email": email, "message": "TEST_persist"}, timeout=30)
        assert r.status_code == 200, r.text

        contact_obj = Contact.objects.filter(email=email).first()
        assert contact_obj is not None, "contact not persisted in PostgreSQL"
        assert contact_obj.name == "TEST_Persist"
        assert contact_obj.message == "TEST_persist"
        assert contact_obj.created_at is not None


@pytest.fixture(scope="session", autouse=True)
def cleanup():
    yield
    # Purge test records starting with TEST_
    Contact.objects.filter(email__startswith="TEST_").delete()
    Newsletter.objects.filter(email__startswith="TEST_").delete()
    Enrollment.objects.filter(email__startswith="TEST_").delete()
