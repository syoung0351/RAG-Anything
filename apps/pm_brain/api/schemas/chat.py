from typing import Literal, Optional
from pydantic import BaseModel


class HistoryMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[HistoryMessage] = []
    use_web_search: bool = False


class SourceCitation(BaseModel):
    title: str
    excerpt: str
    source_type: Literal["document", "web", "seed"]
    url: Optional[str] = None


class ChatChunk(BaseModel):
    type: Literal["token", "sources", "done", "error"]
    content: Optional[str] = None
    sources: Optional[list[SourceCitation]] = None
