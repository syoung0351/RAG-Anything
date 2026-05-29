"use client";
import { useCallback, useState } from "react";
import { getIngestStatus, ingestFile } from "@/lib/api";
import type { Domain, IngestStatus } from "@/lib/types";

export function useUpload(domain: Domain) {
  const [status, setStatus] = useState<IngestStatus | null>(null);
  const [uploading, setUploading] = useState(false);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setStatus(null);
      try {
        const { job_id } = await ingestFile(domain, file);
        setStatus({ job_id, status: "queued", progress: 0 });
        const poll = async () => {
          const s = await getIngestStatus(job_id);
          setStatus(s);
          if (s.status === "complete" || s.status === "failed") {
            setUploading(false);
          } else {
            setTimeout(poll, 2000);
          }
        };
        setTimeout(poll, 1000);
      } catch (err) {
        setStatus({
          job_id: "",
          status: "failed",
          progress: 0,
          error: err instanceof Error ? err.message : "Upload failed",
        });
        setUploading(false);
      }
    },
    [domain]
  );

  return { upload, uploading, status };
}
