from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.responses import StreamingResponse

from rag_factory import get_rag_instance
from raganything import RAGAnything
from schemas.chat import ChatRequest
from schemas.ingest import IngestResponse
from services import ingest_service, query_service

router = APIRouter(prefix="/api/recall", tags=["recall"])


@router.post("/chat")
async def recall_chat(
    request: ChatRequest,
    rag: RAGAnything = Depends(get_rag_instance),
) -> StreamingResponse:
    return StreamingResponse(
        query_service.stream_query(
            rag=rag,
            query=request.message,
            domain="recall",
            history=request.history,
            use_web_search=request.use_web_search,
        ),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@router.post("/ingest", response_model=IngestResponse)
async def recall_ingest(
    file: UploadFile = File(...),
    rag: RAGAnything = Depends(get_rag_instance),
) -> IngestResponse:
    job_id = await ingest_service.ingest_upload(file, rag)
    return IngestResponse(job_id=job_id)
