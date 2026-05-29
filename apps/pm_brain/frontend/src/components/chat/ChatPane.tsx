"use client";
import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import type { Domain, HistoryMessage } from "@/lib/types";
import { DOMAINS } from "@/lib/types";

interface Props {
  messages: HistoryMessage[];
  streaming: boolean;
  domain: Domain;
  onSend: (text: string, useWebSearch: boolean) => void;
  onSourcesClick: () => void;
  hasSources: boolean;
}

export function ChatPane({ messages, streaming, domain, onSend, onSourcesClick, hasSources }: Props) {
  const [input, setInput] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const domainMeta = DOMAINS.find((d) => d.id === domain)!;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || streaming) return;
    setInput("");
    onSend(trimmed, webSearch);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <h2 className="font-display italic" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 300, color: "var(--color-charcoal)" }}>
              {domainMeta.label}
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--color-ash)", fontFamily: "var(--font-body)" }}>
              {domainMeta.subtitle}
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            isStreaming={streaming && i === messages.length - 1 && msg.role === "assistant"}
          />
        ))}
        <div ref={endRef} />
      </div>

      <div className="px-8 pb-8 pt-4 border-t" style={{ borderColor: "var(--color-mist)" }}>
        {hasSources && (
          <button
            onClick={onSourcesClick}
            className="mb-3"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-accent)", fontFamily: "var(--font-body)", padding: 0 }}
          >
            View sources →
          </button>
        )}
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            rows={1}
            placeholder={`Ask about ${domainMeta.label.toLowerCase()}...`}
            className="flex-1 resize-none outline-none"
            style={{
              background: "transparent",
              border: "1px solid var(--color-mist)",
              borderRadius: "4px",
              padding: "12px 14px",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "var(--color-ink)",
              fontFamily: "var(--font-body)",
              maxHeight: "160px",
              overflow: "auto",
            }}
            onFocus={(e) => { e.target.style.borderColor = "var(--color-accent)"; e.target.style.boxShadow = "0 0 0 2px var(--color-accent-dim)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--color-mist)"; e.target.style.boxShadow = "none"; }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || streaming}
            style={{
              background: !input.trim() || streaming ? "var(--color-mist)" : "var(--color-ink)",
              color: !input.trim() || streaming ? "var(--color-ash)" : "var(--color-paper)",
              border: "none",
              borderRadius: 0,
              padding: "12px 24px",
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: !input.trim() || streaming ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => { if (input.trim() && !streaming) (e.target as HTMLButtonElement).style.background = "var(--color-accent)"; }}
            onMouseLeave={(e) => { if (input.trim() && !streaming) (e.target as HTMLButtonElement).style.background = "var(--color-ink)"; }}
          >
            {streaming ? "..." : "Send"}
          </button>
        </div>
        {(domain === "technical" || domain === "negotiation") && (
          <label className="flex items-center gap-2 mt-3" style={{ cursor: "pointer" }}>
            <input type="checkbox" checked={webSearch} onChange={(e) => setWebSearch(e.target.checked)} style={{ accentColor: "var(--color-accent)" }} />
            <span style={{ fontSize: "0.75rem", color: webSearch ? "var(--color-accent)" : "var(--color-ash)", fontFamily: "var(--font-body)" }}>
              Search web for current context
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
