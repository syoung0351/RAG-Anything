import asyncio
import json
from typing import AsyncGenerator

from raganything import RAGAnything

from prompts import DOMAIN_PROMPTS
from schemas.chat import HistoryMessage, SourceCitation
from services import web_search_service

DOMAIN_CONFIG: dict[str, dict] = {
    "technical": {
        "mode": "local",
        "web_search_enabled": True,
    },
    "recall": {
        "mode": "hybrid",
        "web_search_enabled": False,
    },
    "negotiation": {
        "mode": "global",
        "web_search_enabled": True,
    },
    "financial": {
        "mode": "global",
        "web_search_enabled": False,
    },
}

_CHUNK_SIZE = 50


def _sse(data: dict) -> str:
    return f"data: {json.dumps(data)}\n\n"


def _parse_sources(text: str, domain: str) -> list[SourceCitation]:
    sources: list[SourceCitation] = []
    lines = text.split("\n")
    for line in lines:
        if line.startswith("- ") and ("/" in line or "." in line):
            sources.append(
                SourceCitation(
                    title=line.lstrip("- ").strip(),
                    excerpt="",
                    source_type="seed",
                )
            )
    if not sources:
        sources.append(
            SourceCitation(
                title=f"{domain.title()} Knowledge Base",
                excerpt="",
                source_type="seed",
            )
        )
    return sources


async def stream_query(
    rag: RAGAnything,
    query: str,
    domain: str,
    history: list[HistoryMessage],
    use_web_search: bool,
) -> AsyncGenerator[str, None]:
    config = DOMAIN_CONFIG[domain]
    system_prompt = DOMAIN_PROMPTS[domain]

    enriched_query = query
    if use_web_search and config["web_search_enabled"]:
        try:
            web_ctx = await web_search_service.search_and_summarize(query)
            if web_ctx:
                enriched_query = f"[Current web context: {web_ctx}]\n\n{query}"
        except Exception:
            pass

    if history:
        history_text = "\n".join(
            f"{m.role.upper()}: {m.content}" for m in history[-6:]
        )
        enriched_query = f"[Conversation so far]\n{history_text}\n\n[New question]\n{enriched_query}"

    try:
        result: str = await rag.aquery(
            enriched_query,
            mode=config["mode"],
            system_prompt=system_prompt,
        )
    except Exception as exc:
        yield _sse({"type": "error", "content": str(exc)})
        return

    for i in range(0, len(result), _CHUNK_SIZE):
        chunk = result[i : i + _CHUNK_SIZE]
        yield _sse({"type": "token", "content": chunk})
        await asyncio.sleep(0)

    sources = _parse_sources(result, domain)
    yield _sse({"type": "sources", "sources": [s.model_dump() for s in sources]})
    yield _sse({"type": "done"})
