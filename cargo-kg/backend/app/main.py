from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app import models  # import all models
from app.routers import auth, tracking, admin
from app.seed import seed_db
import logging

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title='Cargo KG API',
    version='1.0.0',
    docs_url='/api/docs',
    redoc_url='/api/redoc',
    openapi_url='/api/openapi.json'
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Routers
app.include_router(auth.router)
app.include_router(tracking.router)
app.include_router(admin.router)

@app.on_event('startup')
def on_startup():
    seed_db()

@app.get('/api/health')
def health():
    return {'status': 'ok', 'service': 'Cargo KG API'}
