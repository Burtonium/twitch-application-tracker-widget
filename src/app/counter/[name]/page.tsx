import { api } from "@/trpc/server";
import CounterDisplay from "./_components/counter-display";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CounterDisplay uri={slug} />;
}
