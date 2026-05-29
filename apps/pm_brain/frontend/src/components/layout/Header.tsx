interface Props { onUpload: () => void; }

export function Header({ onUpload }: Props) {
  return (
    <header
      className="flex items-center justify-between px-8 py-4 border-b"
      style={{ borderColor: "var(--color-mist)" }}
    >
      <div>
        <h1
          className="font-display italic leading-none"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 300, color: "var(--color-ink)" }}
        >
          PM Second Brain
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--color-ash)", fontFamily: "var(--font-body)", marginTop: "4px" }}>
          Technical mentorship · Negotiation · Finance · Recall
        </p>
      </div>
      <button
        onClick={onUpload}
        style={{
          background: "var(--color-ink)",
          color: "var(--color-paper)",
          padding: "10px 28px",
          fontSize: "0.8125rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          borderRadius: 0,
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
        }}
        onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = "var(--color-accent)")}
        onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = "var(--color-ink)")}
      >
        Upload Docs
      </button>
    </header>
  );
}
