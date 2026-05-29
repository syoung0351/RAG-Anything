import type { SourceCitation } from "@/lib/types";

interface Props { sources: SourceCitation[]; onClose: () => void; }

export function SourcePanel({ sources, onClose }: Props) {
  return (
    <aside
      className="flex flex-col border-l overflow-y-auto shrink-0"
      style={{ width: "280px", borderColor: "var(--color-mist)", background: "var(--color-paper)" }}
    >
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "var(--color-mist)" }}
      >
        <span style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-ash)", fontFamily: "var(--font-body)" }}>
          Sources
        </span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-ash)", fontSize: "1rem" }} aria-label="Close sources">
          ×
        </button>
      </div>
      <div className="flex flex-col gap-4 p-5">
        {sources.map((src, i) => (
          <div key={i}>
            <p className="font-display italic mb-1" style={{ fontSize: "0.9375rem", fontWeight: 400, color: "var(--color-ink)" }}>
              {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{src.title}</a> : src.title}
            </p>
            {src.excerpt && (
              <p style={{ fontSize: "0.8125rem", color: "var(--color-charcoal)", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
                {src.excerpt}
              </p>
            )}
            <span style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-ash)", fontFamily: "var(--font-body)" }}>
              {src.source_type === "seed" ? "Knowledge Base" : src.source_type === "web" ? "Web" : "Your Document"}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
