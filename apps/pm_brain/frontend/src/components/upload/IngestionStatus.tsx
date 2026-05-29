import type { IngestStatus } from "@/lib/types";

const colors: Record<string, string> = {
  queued: "var(--color-ash)",
  processing: "var(--color-accent)",
  complete: "oklch(50% 0.15 145)",
  failed: "oklch(50% 0.2 25)",
};

const labels: Record<string, string> = {
  queued: "Queued",
  processing: "Processing...",
  complete: "Complete",
  failed: "Failed",
};

export function IngestionStatus({ status }: { status: IngestStatus }) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="h-1 flex-1 rounded-sm overflow-hidden" style={{ background: "var(--color-mist)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${status.progress}%`, background: colors[status.status] ?? "var(--color-accent)" }}
        />
      </div>
      <span style={{ fontSize: "0.75rem", fontWeight: 500, color: colors[status.status] ?? "var(--color-ash)", fontFamily: "var(--font-body)", letterSpacing: "0.05em", textTransform: "uppercase", minWidth: "80px" }}>
        {labels[status.status] ?? status.status}
      </span>
      {status.error && <p style={{ fontSize: "0.75rem", color: "oklch(50% 0.2 25)" }}>{status.error}</p>}
    </div>
  );
}
