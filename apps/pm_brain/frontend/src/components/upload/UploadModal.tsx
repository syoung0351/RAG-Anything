"use client";
import { useCallback, useState } from "react";
import { useUpload } from "@/hooks/useUpload";
import { IngestionStatus } from "./IngestionStatus";
import type { Domain } from "@/lib/types";

const ACCEPTED = ".pdf,.docx,.pptx,.xlsx,.md,.txt,.csv";
const TYPE_LABELS = "PDF, DOCX, PPTX, XLSX, MD, TXT, CSV";

export function UploadModal({ domain, onClose }: { domain: Domain; onClose: () => void }) {
  const { upload, uploading, status } = useUpload(domain);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => { upload(file); }, [upload]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "oklch(10% 0 0 / 0.4)" }}
      onClick={onClose}
    >
      <div
        className="flex flex-col p-8 border"
        style={{ background: "var(--color-bg)", borderColor: "var(--color-mist)", width: "480px", maxWidth: "90vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display italic" style={{ fontSize: "1.5rem", fontWeight: 300 }}>Upload Documents</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "var(--color-ash)" }} aria-label="Close">×</button>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--color-charcoal)", marginBottom: "24px" }}>
          Documents are ingested into your knowledge graph and immediately available for recall queries.
        </p>
        <label
          className="flex flex-col items-center justify-center gap-3 cursor-pointer"
          style={{
            border: dragOver ? "1px dashed var(--color-accent)" : "1px dashed var(--color-mist)",
            background: dragOver ? "var(--color-accent-dim)" : "transparent",
            padding: "40px 24px",
            borderRadius: 0,
          }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input type="file" accept={ACCEPTED} className="sr-only" disabled={uploading}
            onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); }}
          />
          <span style={{ fontSize: "0.875rem", color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}>
            {uploading ? "Uploading..." : "Drop a file here or click to browse"}
          </span>
          <span style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-ash)", fontFamily: "var(--font-body)" }}>
            {TYPE_LABELS}
          </span>
        </label>
        {status && <IngestionStatus status={status} />}
        {status?.status === "complete" && (
          <p className="mt-4" style={{ fontSize: "0.875rem", color: "var(--color-charcoal)" }}>
            Document ingested. Switch to <strong>Information Recall</strong> to query it.
          </p>
        )}
      </div>
    </div>
  );
}
