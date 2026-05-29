"use client";
import { DOMAINS, type Domain } from "@/lib/types";

interface Props { active: Domain; onChange: (d: Domain) => void; }

export function DomainNav({ active, onChange }: Props) {
  return (
    <nav
      className="flex flex-col py-8 px-4 gap-1 border-r shrink-0"
      style={{ borderColor: "var(--color-mist)", width: "220px" }}
    >
      {DOMAINS.map((d) => {
        const isActive = d.id === active;
        return (
          <button
            key={d.id}
            onClick={() => onChange(d.id)}
            className="text-left px-4 py-3"
            style={{
              background: "transparent",
              border: "none",
              borderLeft: isActive ? "2px solid var(--color-accent)" : "2px solid transparent",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            <div
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: isActive ? "var(--color-accent)" : "var(--color-charcoal)",
                fontFamily: "var(--font-body)",
              }}
            >
              {d.label}
            </div>
            <div style={{ fontSize: "0.6875rem", color: "var(--color-ash)", marginTop: "2px", fontFamily: "var(--font-body)" }}>
              {d.subtitle}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
