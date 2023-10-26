from beanie import init_beanie

from core.Enviroment import get_environment_variables
from motor.motor_asyncio import AsyncIOMotorClient

env = get_environment_variables()


async def init():
    client = AsyncIOMotorClient(env.DATABASE_URL)
    await init_beanie(database=client)
