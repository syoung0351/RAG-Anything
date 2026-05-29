import os
from typing import Optional

from lightrag.utils import EmbeddingFunc
from openai import AsyncOpenAI
from raganything import RAGAnything, RAGAnythingConfig

_rag_instance: Optional[RAGAnything] = None


async def _llm_model_func(
    prompt: str,
    system_prompt: Optional[str] = None,
    history_messages: list = [],
    keyword_extraction: bool = False,
    **kwargs,
) -> str:
    client = AsyncOpenAI(
        api_key=os.environ["ANTHROPIC_API_KEY"],
        base_url="https://api.anthropic.com/v1",
    )
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    for msg in history_messages:
        messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})
    messages.append({"role": "user", "content": prompt})

    valid_kwargs = {k: v for k, v in kwargs.items() if k not in ("hashing_kv", "stream")}

    response = await client.chat.completions.create(
        model=os.environ.get("LLM_MODEL", "claude-sonnet-4-6"),
        messages=messages,
        max_tokens=int(os.environ.get("MAX_TOKENS", "8192")),
        temperature=float(os.environ.get("TEMPERATURE", "0")),
        **valid_kwargs,
    )
    return response.choices[0].message.content


async def _embedding_func(texts: list[str]) -> list[list[float]]:
    client = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
    response = await client.embeddings.create(
        input=texts,
        model=os.environ.get("EMBEDDING_MODEL", "text-embedding-3-small"),
    )
    return [item.embedding for item in response.data]


async def get_rag_instance() -> RAGAnything:
    global _rag_instance
    if _rag_instance is not None:
        return _rag_instance

    working_dir = os.environ.get("WORKING_DIR", "/app/rag_storage")
    os.makedirs(working_dir, exist_ok=True)

    config = RAGAnythingConfig(
        working_dir=working_dir,
        parser="docling",
        enable_image_processing=False,
        enable_table_processing=True,
        enable_equation_processing=False,
    )

    embedding_func = EmbeddingFunc(
        embedding_dim=int(os.environ.get("EMBEDDING_DIM", "1536")),
        max_token_size=8192,
        func=_embedding_func,
    )

    _rag_instance = RAGAnything(
        config=config,
        llm_model_func=_llm_model_func,
        embedding_func=embedding_func,
        lightrag_kwargs={
            "kv_storage": os.environ.get("LIGHTRAG_KV_STORAGE", "JsonKVStorage"),
            "vector_storage": os.environ.get("LIGHTRAG_VECTOR_STORAGE", "NanoVectorDBStorage"),
            "doc_status_storage": os.environ.get("LIGHTRAG_DOC_STATUS_STORAGE", "JsonDocStatusStorage"),
            "enable_llm_cache": os.environ.get("ENABLE_LLM_CACHE", "true").lower() == "true",
            "max_async": int(os.environ.get("MAX_ASYNC", "4")),
        },
    )

    await _rag_instance._ensure_lightrag_initialized()
    return _rag_instance
