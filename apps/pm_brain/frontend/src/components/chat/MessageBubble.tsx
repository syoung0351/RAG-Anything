import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { HistoryMessage } from "@/lib/types";

interface Props { message: HistoryMessage; isStreaming?: boolean; }

export function MessageBubble({ message, isStreaming = false }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div
          className="max-w-[70%] px-4 py-3 border"
          style={{
            background: "var(--color-paper)",
            borderColor: "var(--color-mist)",
            borderRadius: "8px",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: "var(--color-ink)",
            fontFamily: "var(--font-body)",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6">
      <div
        className="max-w-[85%] prose"
        style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--color-ink)", fontFamily: "var(--font-body)" }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content + (isStreaming ? "▌" : "")}
        </ReactMarkdown>
      </div>
    </div>
  );
}
