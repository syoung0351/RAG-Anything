import type { Domain, IngestResponse, IngestStatus } from "./types";

const API_URL =
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://api:8000";

function getToken(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("pm_brain_token") || process.env.NEXT_PUBLIC_API_TOKEN || "";
  }
  return process.env.NEXT_PUBLIC_API_TOKEN || "";
}

export function authHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
}

export async function chatStream(
  domain: Domain,
  message: string,
  history: { role: string; content: string }[],
  useWebSearch: boolean
): Promise<Response> {
  return fetch(`${API_URL}/api/${domain}/chat`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ message, history, use_web_search: useWebSearch }),
  });
}

export async function ingestFile(domain: Domain, file: File): Promise<IngestResponse> {
  const form = new FormData();
  form.append("file", file);
  const resp = await fetch(`${API_URL}/api/${domain}/ingest`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: form,
  });
  if (!resp.ok) throw new Error(`Ingest failed: ${resp.statusText}`);
  return resp.json();
}

export async function getIngestStatus(jobId: string): Promise<IngestStatus> {
  const resp = await fetch(`${API_URL}/api/ingest/${jobId}`, {
    headers: authHeaders(),
  });
  if (!resp.ok) throw new Error(`Status check failed: ${resp.statusText}`);
  return resp.json();
}
