#!/usr/bin/env python3
"""Idempotently seeds curated PM knowledge into the RAG knowledge graph."""
import asyncio
import os
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "api"))

from dotenv import load_dotenv
load_dotenv(override=False)

KNOWLEDGE_ROOT = Path(os.environ.get("KNOWLEDGE_DIR", "/app/knowledge"))
SENTINEL_KEY = "pm_brain_seed_v1_complete"


async def main() -> None:
    from rag_factory import get_rag_instance

    print("Initializing RAG instance...")
    rag = await get_rag_instance()

    try:
        sentinel = await rag.lightrag.key_string_value_json_storage_cls(
            namespace="pm_brain_meta",
            global_config=rag.lightrag.__dict__,
            embedding_func=rag.lightrag.embedding_func,
        ).get_by_id(SENTINEL_KEY)
        if sentinel:
            print(f"Knowledge already seeded ({sentinel.get('seeded_at', 'unknown')}). Exiting.")
            return
    except Exception:
        pass

    seed_files = sorted(KNOWLEDGE_ROOT.rglob("*.md"))
    if not seed_files:
        print(f"No markdown files found under {KNOWLEDGE_ROOT}. Exiting.")
        return

    print(f"Seeding {len(seed_files)} knowledge files...")
    output_dir = Path(os.environ.get("WORKING_DIR", "/app/rag_storage")) / "seed_output"
    output_dir.mkdir(parents=True, exist_ok=True)

    for md_file in seed_files:
        print(f"  → {md_file.relative_to(KNOWLEDGE_ROOT)}")
        try:
            await rag.process_document_complete(
                file_path=str(md_file),
                output_dir=str(output_dir),
                parse_method="txt",
            )
        except Exception as exc:
            print(f"    WARNING: failed to ingest {md_file.name}: {exc}")

    try:
        storage = rag.lightrag.key_string_value_json_storage_cls(
            namespace="pm_brain_meta",
            global_config=rag.lightrag.__dict__,
            embedding_func=rag.lightrag.embedding_func,
        )
        await storage.upsert({SENTINEL_KEY: {"seeded_at": datetime.utcnow().isoformat()}})
        await storage.index_done_callback()
    except Exception as exc:
        print(f"WARNING: Could not write sentinel: {exc}")

    await rag.finalize_storages()
    print("Seed complete.")


if __name__ == "__main__":
    asyncio.run(main())
