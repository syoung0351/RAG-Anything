import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(override=False)

from auth import BearerAuthMiddleware
from rag_factory import get_rag_instance
from routers import financial, negotiation, recall, technical
from schemas.ingest import IngestStatus
from services import ingest_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    await get_rag_instance()
    yield


app = FastAPI(title="PM Second Brain API", lifespan=lifespan)

app.add_middleware(BearerAuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(technical.router)
app.include_router(recall.router)
app.include_router(negotiation.router)
app.include_router(financial.router)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/ingest/{job_id}", response_model=IngestStatus)
async def ingest_status(job_id: str):
    status = ingest_service.get_job_status(job_id)
    if status is None:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Job not found")
    return IngestStatus(job_id=job_id, **status)
