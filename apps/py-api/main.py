import asyncio

from Secweb.ContentSecurityPolicy import ContentSecurityPolicy
from Secweb.StrictTransportSecurity import HSTS
from Secweb.xXSSProtection import xXSSProtection
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from core.Database import init
from core.Enviroment import get_environment_variables

env = get_environment_variables()

app = FastAPI(
  title=env.APP_NAME,
  version="1.0.0"
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

app.add_middleware(
  ContentSecurityPolicy,
  Option={
    'default-src': ["'self'"],
    'base-uri': ["'self'"],
    'block-all-mixed-content': []
  },
  script_nonce=False,
  style_nonce=False
)

app.add_middleware(
  HSTS,
  Option={
    'max-age': 4,
    'preload': True
  }
)

app.add_middleware(
  xXSSProtection,
  Option={
    'X-XSS-Protection': '0'
  }
)


@app.on_event("startup")
def startup_event():
    asyncio.create_task(init())


@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")
