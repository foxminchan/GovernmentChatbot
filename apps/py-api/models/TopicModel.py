from beanie import Document
from pydantic.v1 import validator

from core.Exceptions import ValidationError


class Topic(Document):
    name: str

    @validator("name")
    def name_validation(self, v):
        if not v or v.isspace():
            raise ValidationError(detail="Name must not be empty or whitespace")
        if len(v) > 50:
            raise ValidationError(detail="Name must not be longer than 50 characters")
        return v
