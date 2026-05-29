from typing import Literal, Optional
from pydantic import BaseModel


class IngestResponse(BaseModel):
    job_id: str


class IngestStatus(BaseModel):
    job_id: str
    status: Literal["queued", "processing", "complete", "failed"]
    progress: int = 0
    error: Optional[str] = None
