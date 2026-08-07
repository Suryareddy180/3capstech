import os
from datetime import datetime, timezone
from typing import Optional, List

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field

ROOT = os.path.dirname(__file__)
load_dotenv(os.path.join(ROOT, ".env"))

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="3CAPSTECH API")
api = APIRouter(prefix="/api")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class ContactIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    interest: Optional[str] = Field(default=None, max_length=80)
    message: str = Field(..., min_length=1, max_length=4000)


class NewsletterIn(BaseModel):
    email: EmailStr


class EnrollIn(BaseModel):
    course_id: str
    email: EmailStr
    name: Optional[str] = Field(default=None, max_length=120)


@api.get("/")
async def root():
    return {"service": "3CAPSTECH API", "status": "ok", "time": now_iso()}


@api.get("/stats")
async def stats():
    return {
        "projects": 240,
        "learners": 18500,
        "instructors": 65,
        "countries": 23,
        "satisfaction": 98,
    }


@api.post("/contact")
async def create_contact(payload: ContactIn):
    doc = payload.model_dump()
    doc["created_at"] = now_iso()
    res = await db.contacts.insert_one(doc)
    return {"ok": True, "id": str(res.inserted_id), "message": "Thanks! Our team will reach out within 24 hours."}


@api.post("/newsletter")
async def subscribe(payload: NewsletterIn):
    existing = await db.newsletter.find_one({"email": payload.email})
    if existing:
        return {"ok": True, "message": "You're already on the list."}
    await db.newsletter.insert_one({"email": payload.email, "created_at": now_iso()})
    return {"ok": True, "message": "Subscribed! Welcome to the 3CAPSTECH inner circle."}


@api.post("/enroll")
async def enroll(payload: EnrollIn):
    doc = payload.model_dump()
    doc["created_at"] = now_iso()
    res = await db.enrollments.insert_one(doc)
    return {"ok": True, "id": str(res.inserted_id), "message": "Enrolment confirmed. Check your inbox for next steps."}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
