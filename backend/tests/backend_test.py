"""Backend API tests for 3CAPSTECH site (root, contact, newsletter, enroll, stats)."""
import os
import uuid

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing")
BASE_URL = base_url.rstrip("/")


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


# ---------- Module: persistence + cleanup ----------
class TestPersistence:
    def test_contact_persisted_in_mongo(self, api_client):
        import asyncio
        from motor.motor_asyncio import AsyncIOMotorClient
        env = dotenv_values("/app/backend/.env")
        email = f"TEST_persist_{uuid.uuid4().hex[:8]}@example.com"
        r = api_client.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Persist", "email": email, "message": "TEST_persist"}, timeout=30)
        assert r.status_code == 200, r.text

        async def check():
            c = AsyncIOMotorClient(env["MONGO_URL"])
            doc = await c[env["DB_NAME"]].contacts.find_one({"email": email})
            c.close()
            return doc

        doc = asyncio.run(check())
        assert doc is not None, "contact not persisted"
        assert doc["name"] == "TEST_Persist"
        assert doc["message"] == "TEST_persist"
        assert "created_at" in doc


@pytest.fixture(scope="session", autouse=True)
def cleanup():
    yield
    import asyncio
    from motor.motor_asyncio import AsyncIOMotorClient
    env = dotenv_values("/app/backend/.env")

    async def purge():
        c = AsyncIOMotorClient(env["MONGO_URL"])
        db = c[env["DB_NAME"]]
        for coll in ["contacts", "newsletter", "enrollments"]:
            await db[coll].delete_many({"email": {"$regex": "^TEST_"}})
        c.close()

    asyncio.run(purge())
