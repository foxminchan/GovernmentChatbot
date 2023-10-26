from beanie import init_beanie

from core.Enviroment import get_environment_variables
from motor.motor_asyncio import AsyncIOMotorClient

from models.ChatHistoryModel import ChatHistory
from models.TopicModel import Topic
from models.UserModel import User

env = get_environment_variables()


async def init():
    client = AsyncIOMotorClient(env.DATABASE_URL)
    await init_beanie(database=client.db_name, document_models=[
      User,
      Topic,
      ChatHistory,
    ])
