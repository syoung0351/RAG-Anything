export type Domain = "technical" | "recall" | "negotiation" | "financial";

export interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface SourceCitation {
  title: string;
  excerpt: string;
  source_type: "document" | "web" | "seed";
  url?: string;
}

export interface ChatChunk {
  type: "token" | "sources" | "done" | "error";
  content?: string;
  sources?: SourceCitation[];
}

export interface IngestResponse {
  job_id: string;
}

export interface IngestStatus {
  job_id: string;
  status: "queued" | "processing" | "complete" | "failed";
  progress: number;
  error?: string;
}

export const DOMAINS: { id: Domain; label: string; subtitle: string }[] = [
  { id: "technical", label: "Technical Mentorship", subtitle: "Architecture · Engineering Leadership" },
  { id: "recall", label: "Information Recall", subtitle: "Documents · Meeting Notes · History" },
  { id: "negotiation", label: "Negotiation Advice", subtitle: "BATNA · Stakeholders · Contracts" },
  { id: "financial", label: "Financial Planning", subtitle: "Budgets · ROI · Resource Estimation" },
];
