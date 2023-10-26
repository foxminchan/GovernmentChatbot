from datetime import datetime

from beanie import Document
from pydantic.v1 import validator

from core.Exceptions import ValidationError
from models.TopicModel import Topic
from models.UserModel import User


class ChatHistory(Document):
    message: str
    date: datetime = datetime.now()
    user: User
    topics: Topic

    @validator("message")
    def message_validation(self, v):
        if not v or v.isspace():
            raise ValidationError(detail="Message must not be empty or whitespace")
        if len(v) > 100:
            raise ValidationError(detail="Message must not be longer than 100 characters")
        return v
