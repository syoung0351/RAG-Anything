"use client";
import { useState } from "react";
import { Header } from "./Header";
import { DomainNav } from "./DomainNav";
import { ChatPane } from "@/components/chat/ChatPane";
import { SourcePanel } from "@/components/chat/SourcePanel";
import { UploadModal } from "@/components/upload/UploadModal";
import { useChat } from "@/hooks/useChat";
import type { Domain } from "@/lib/types";

interface Props { activeDomain: Domain; }

export function AppShell({ activeDomain }: Props) {
  const [domain, setDomain] = useState<Domain>(activeDomain);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const { messages, streaming, sources, sendMessage, clearMessages } = useChat(domain);

  const handleDomainChange = (d: Domain) => {
    setDomain(d);
    clearMessages();
    setSourcesOpen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header onUpload={() => setUploadOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <DomainNav active={domain} onChange={handleDomainChange} />
        <main className="flex-1 flex overflow-hidden">
          <ChatPane
            messages={messages}
            streaming={streaming}
            domain={domain}
            onSend={sendMessage}
            onSourcesClick={() => { if (sources.length > 0) setSourcesOpen(true); }}
            hasSources={sources.length > 0}
          />
          {sourcesOpen && (
            <SourcePanel sources={sources} onClose={() => setSourcesOpen(false)} />
          )}
        </main>
      </div>
      {uploadOpen && (
        <UploadModal domain={domain} onClose={() => setUploadOpen(false)} />
      )}
    </div>
  );
}
