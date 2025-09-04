from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Dict, Any, List, Optional
import logging
from datetime import datetime
from models import ContactSubmission, WaitlistSubmission

logger = logging.getLogger(__name__)

class DatabaseService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.contact_collection = db.contact_submissions
        self.waitlist_collection = db.waitlist_submissions

    async def save_contact_submission(self, submission: ContactSubmission) -> str:
        """
        Save contact form submission to database
        """
        try:
            submission_dict = submission.dict()
            result = await self.contact_collection.insert_one(submission_dict)
            logger.info(f"Contact submission saved with ID: {submission.id}")
            return submission.id
        except Exception as e:
            logger.error(f"Error saving contact submission: {str(e)}")
            raise

    async def save_waitlist_submission(self, submission: WaitlistSubmission) -> str:
        """
        Save waitlist form submission to database
        """
        try:
            submission_dict = submission.dict()
            result = await self.waitlist_collection.insert_one(submission_dict)
            logger.info(f"Waitlist submission saved with ID: {submission.id}")
            return submission.id
        except Exception as e:
            logger.error(f"Error saving waitlist submission: {str(e)}")
            raise

    async def update_contact_formspree_status(self, submission_id: str, status: str) -> bool:
        """
        Update the Formspree status for a contact submission
        """
        try:
            result = await self.contact_collection.update_one(
                {"id": submission_id},
                {"$set": {"formspree_status": status}}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error updating contact formspree status: {str(e)}")
            return False

    async def update_waitlist_formspree_status(self, submission_id: str, status: str) -> bool:
        """
        Update the Formspree status for a waitlist submission
        """
        try:
            result = await self.waitlist_collection.update_one(
                {"id": submission_id},
                {"$set": {"formspree_status": status}}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error updating waitlist formspree status: {str(e)}")
            return False

    async def get_contact_submissions(self, limit: int = 100) -> List[Dict[str, Any]]:
        """
        Get recent contact submissions (for admin purposes)
        """
        try:
            cursor = self.contact_collection.find().sort("submitted_at", -1).limit(limit)
            submissions = await cursor.to_list(length=limit)
            return submissions
        except Exception as e:
            logger.error(f"Error fetching contact submissions: {str(e)}")
            return []

    async def get_waitlist_submissions(self, limit: int = 100) -> List[Dict[str, Any]]:
        """
        Get recent waitlist submissions (for admin purposes)
        """
        try:
            cursor = self.waitlist_collection.find().sort("submitted_at", -1).limit(limit)
            submissions = await cursor.to_list(length=limit)
            return submissions
        except Exception as e:
            logger.error(f"Error fetching waitlist submissions: {str(e)}")
            return []

    async def check_email_exists(self, email: str, collection_name: str) -> bool:
        """
        Check if email already exists in the specified collection
        """
        try:
            collection = getattr(self, f"{collection_name}_collection")
            count = await collection.count_documents({"email": email})
            return count > 0
        except Exception as e:
            logger.error(f"Error checking email existence: {str(e)}")
            return False