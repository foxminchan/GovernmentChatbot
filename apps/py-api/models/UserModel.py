from typing import Optional

from beanie import Document


class User(Document):
    name: str
    email: Optional[str] = None
    phone: str
    address: str
    id_card: str
