from datetime import datetime

from beanie import Document

from models.TopicModel import Topic
from models.UserModel import User


class ChatHistory(Document):
    message: str
    date: datetime
    user: User
    topics: Topic
