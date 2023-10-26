from functools import lru_cache
import os

from pydantic.v1 import BaseSettings


@lru_cache
def get_env_filename():
    runtime_env = os.getenv("ENV")
    return f".env.{runtime_env}" if runtime_env else ".env"


class EnvironmentSettings(BaseSettings):
    APP_NAME: str
    DATABASE_URL: str

    class Config:
        env_file = get_env_filename()
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache
def get_environment_variables():
    return EnvironmentSettings()
