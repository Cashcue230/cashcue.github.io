from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Contact Form Models
class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    project_type: Optional[str] = Field(None, max_length=50, alias="projectType")
    budget: Optional[str] = Field(None, max_length=50)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    project_type: Optional[str] = None
    budget: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    formspree_status: str = "pending"  # 'sent', 'failed', 'pending'
    ip_address: Optional[str] = None

    class Config:
        allow_population_by_field_name = True

# AI Waitlist Models
class WaitlistSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    interests: Optional[str] = Field(None, max_length=500)

class WaitlistSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    interests: Optional[str] = None
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    formspree_status: str = "pending"  # 'sent', 'failed', 'pending'
    ip_address: Optional[str] = None

# Service Model (for future CMS)
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    features: List[str]
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Project Model (for future CMS)
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image: str  # URL
    category: str
    tech: List[str]
    is_active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Response Models
class SubmissionResponse(BaseModel):
    success: bool
    message: str
    submission_id: Optional[str] = None