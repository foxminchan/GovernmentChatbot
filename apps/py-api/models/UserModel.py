from typing import Optional

from beanie import Document
from pydantic.v1 import validator

from core.Exceptions import ValidationError

import re


class User(Document):
    name: str
    email: Optional[str] = None
    phone: str
    address: str
    id_card: str

    @validator("name")
    def name_validation(self, v):
        if not v or v.isspace():
            raise ValidationError(detail="Name must not be empty or whitespace")
        if len(v) > 50:
            raise ValidationError(detail="Name must not be longer than 50 characters")
        return v

    @validator("phone")
    def phone_validation(self, v):
        if not v or v.isspace():
            raise ValidationError(detail="Phone number must not be empty or whitespace")
        if re.match(r"\d{10}", v):
            raise ValidationError(detail="Phone number must not be 10 characters")
        return v

    @validator("email")
    def email_validation(self, v):
        if v is not None and re.match(r"[^@]+@[^@]+\.[^@]+", v):
            raise ValidationError(detail="Email is not valid")
        return v

    @validator("address")
    def address_validation(self, v):
        if not v or v.isspace():
            raise ValidationError(detail="Address must not be empty or whitespace")
        if len(v) > 100:
            raise ValidationError(detail="Address must not be longer than 100 characters")
        return v

    @validator("id_card")
    def id_card_validation(self, v):
        if not v or v.isspace():
            raise ValidationError(detail="ID card must not be empty or whitespace")
        if re.match(r"\d{9}", v) or re.match(r"\d{12}", v):
            raise ValidationError(detail="ID card must not be longer than 20 characters")
        return v
