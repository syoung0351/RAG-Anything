import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import type { Domain } from "@/lib/types";
import { DOMAINS } from "@/lib/types";

interface Props {
  params: Promise<{ domain: string }>;
}

export default async function ChatPage({ params }: Props) {
  const { domain } = await params;
  const valid = DOMAINS.map((d) => d.id as string);
  if (!valid.includes(domain)) notFound();
  return <AppShell activeDomain={domain as Domain} />;
}

export function generateStaticParams() {
  return DOMAINS.map((d) => ({ domain: d.id }));
}
