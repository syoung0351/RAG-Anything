import asyncio
import os
import uuid
from pathlib import Path

import aiofiles
from fastapi import UploadFile

from raganything import RAGAnything

_JOB_STATUS: dict[str, dict] = {}
UPLOAD_DIR = Path(os.environ.get("UPLOAD_DIR", "/tmp/uploads"))


async def ingest_upload(file: UploadFile, rag: RAGAnything) -> str:
    job_id = str(uuid.uuid4())
    _JOB_STATUS[job_id] = {"status": "queued", "progress": 0}

    upload_path = UPLOAD_DIR / job_id
    upload_path.mkdir(parents=True, exist_ok=True)
    dest = upload_path / (file.filename or "upload.bin")

    async with aiofiles.open(dest, "wb") as f:
        content = await file.read()
        await f.write(content)

    asyncio.create_task(_run_ingestion(job_id, str(dest), rag))
    return job_id


async def _run_ingestion(job_id: str, file_path: str, rag: RAGAnything) -> None:
    _JOB_STATUS[job_id] = {"status": "processing", "progress": 10}
    output_dir = str(UPLOAD_DIR / job_id / "output")
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    try:
        await rag.process_document_complete(
            file_path=file_path,
            output_dir=output_dir,
            parse_method="auto",
        )
        _JOB_STATUS[job_id] = {"status": "complete", "progress": 100}
    except Exception as exc:
        _JOB_STATUS[job_id] = {"status": "failed", "progress": 0, "error": str(exc)}


def get_job_status(job_id: str) -> dict | None:
    return _JOB_STATUS.get(job_id)
