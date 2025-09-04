from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
import logging
from typing import Dict, Any
import os

from models import (
    ContactSubmissionCreate, 
    ContactSubmission, 
    WaitlistSubmissionCreate, 
    WaitlistSubmission,
    SubmissionResponse
)
from services.formspree_service import FormspreeService
from services.database_service import DatabaseService

# Get database from main server
from server import db

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["forms"])

# Initialize services
FORMSPREE_ENDPOINT = "https://formspree.io/f/mvgrekqd"
formspree_service = FormspreeService(FORMSPREE_ENDPOINT)
database_service = DatabaseService(db)

def get_client_ip(request: Request) -> str:
    """Extract client IP address from request"""
    if "x-forwarded-for" in request.headers:
        return request.headers["x-forwarded-for"].split(",")[0].strip()
    elif "x-real-ip" in request.headers:
        return request.headers["x-real-ip"]
    else:
        return request.client.host if request.client else "unknown"

@router.post("/contact", response_model=SubmissionResponse)
async def submit_contact_form(
    contact_data: ContactSubmissionCreate, 
    request: Request
):
    """
    Handle contact form submission:
    1. Save to database
    2. Forward to Formspree
    3. Update status in database
    """
    try:
        # Get client IP
        client_ip = get_client_ip(request)
        
        # Create submission object
        submission = ContactSubmission(
            name=contact_data.name,
            email=contact_data.email,
            company=contact_data.company,
            project_type=contact_data.project_type,
            budget=contact_data.budget,
            message=contact_data.message,
            ip_address=client_ip
        )
        
        # Save to database first
        try:
            submission_id = await database_service.save_contact_submission(submission)
            logger.info(f"Contact submission saved to database: {submission_id}")
        except Exception as db_error:
            logger.error(f"Database save failed: {str(db_error)}")
            raise HTTPException(
                status_code=500, 
                detail="Failed to save submission. Please try again."
            )
        
        # Submit to Formspree
        formspree_result = await formspree_service.submit_contact_form(
            contact_data.dict(by_alias=True)
        )
        
        # Update Formspree status in database
        formspree_status = "sent" if formspree_result["success"] else "failed"
        await database_service.update_contact_formspree_status(submission_id, formspree_status)
        
        if formspree_result["success"]:
            logger.info(f"Contact form submitted successfully: {submission_id}")
            return SubmissionResponse(
                success=True,
                message="Thank you for your message! We will get back to you within 24 hours.",
                submission_id=submission_id
            )
        else:
            # Even if Formspree fails, we have the data saved
            logger.warning(f"Formspree submission failed but data saved: {submission_id}")
            return SubmissionResponse(
                success=True,
                message="Thank you for your message! We have received it and will get back to you within 24 hours.",
                submission_id=submission_id
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in contact form submission: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again."
        )

@router.post("/ai-waitlist", response_model=SubmissionResponse)
async def submit_waitlist_form(
    waitlist_data: WaitlistSubmissionCreate, 
    request: Request
):
    """
    Handle AI waitlist form submission:
    1. Check for duplicate email
    2. Save to database
    3. Forward to Formspree
    4. Update status in database
    """
    try:
        # Get client IP
        client_ip = get_client_ip(request)
        
        # Check if email already exists in waitlist
        email_exists = await database_service.check_email_exists(
            waitlist_data.email, 
            "waitlist"
        )
        
        if email_exists:
            return SubmissionResponse(
                success=True,
                message="You're already on our waitlist! We'll notify you when CashCue AI launches."
            )
        
        # Create submission object
        submission = WaitlistSubmission(
            name=waitlist_data.name,
            email=waitlist_data.email,
            interests=waitlist_data.interests,
            ip_address=client_ip
        )
        
        # Save to database first
        try:
            submission_id = await database_service.save_waitlist_submission(submission)
            logger.info(f"Waitlist submission saved to database: {submission_id}")
        except Exception as db_error:
            logger.error(f"Database save failed: {str(db_error)}")
            raise HTTPException(
                status_code=500, 
                detail="Failed to save submission. Please try again."
            )
        
        # Submit to Formspree
        formspree_result = await formspree_service.submit_waitlist_form(
            waitlist_data.dict()
        )
        
        # Update Formspree status in database
        formspree_status = "sent" if formspree_result["success"] else "failed"
        await database_service.update_waitlist_formspree_status(submission_id, formspree_status)
        
        if formspree_result["success"]:
            logger.info(f"Waitlist form submitted successfully: {submission_id}")
        else:
            logger.warning(f"Formspree submission failed but data saved: {submission_id}")
        
        return SubmissionResponse(
            success=True,
            message="Welcome to the waitlist! You'll be the first to know when CashCue AI launches.",
            submission_id=submission_id
        )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in waitlist form submission: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again."
        )

# Admin endpoints (optional - for viewing submissions)
@router.get("/admin/contact-submissions")
async def get_contact_submissions():
    """Get recent contact submissions (admin only - add auth later)"""
    try:
        submissions = await database_service.get_contact_submissions(limit=50)
        return {"success": True, "submissions": submissions}
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")

@router.get("/admin/waitlist-submissions")
async def get_waitlist_submissions():
    """Get recent waitlist submissions (admin only - add auth later)"""
    try:
        submissions = await database_service.get_waitlist_submissions(limit=50)
        return {"success": True, "submissions": submissions}
    except Exception as e:
        logger.error(f"Error fetching waitlist submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")