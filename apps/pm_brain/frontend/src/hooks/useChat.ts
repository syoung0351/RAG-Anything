"use client";
import { useCallback, useRef, useState } from "react";
import { chatStream } from "@/lib/api";
import type { Domain, HistoryMessage, SourceCitation } from "@/lib/types";

export function useChat(domain: Domain) {
  const [messages, setMessages] = useState<HistoryMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [sources, setSources] = useState<SourceCitation[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string, useWebSearch: boolean) => {
      if (streaming) return;

      const userMsg: HistoryMessage = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setSources([]);
      setStreaming(true);

      const assistantMsg: HistoryMessage = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      abortRef.current = new AbortController();

      try {
        const resp = await chatStream(domain, text, messages.concat(userMsg), useWebSearch);
        if (!resp.body) throw new Error("No response body");
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const chunk = JSON.parse(line.slice(6));
              if (chunk.type === "token" && chunk.content) {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: updated[updated.length - 1].content + chunk.content,
                  };
                  return updated;
                });
              } else if (chunk.type === "sources" && chunk.sources) {
                setSources(chunk.sources);
              }
            } catch { /* skip malformed frame */ }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: "Sorry, something went wrong. Please try again.",
            };
            return updated;
          });
        }
      } finally {
        setStreaming(false);
      }
    },
    [domain, messages, streaming]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setSources([]);
  }, []);

  return { messages, streaming, sources, sendMessage, clearMessages };
}
