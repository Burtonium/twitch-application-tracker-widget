import CounterDisplay from "./_components/counter-display";

export default async function Page({
  params,
}: {
  params: Promise<{ uri: string }>;
}) {
  const { uri } = await params;

  return <CounterDisplay uri={uri} />;
}
