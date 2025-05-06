import CounterDisplay from "./_components/counter-display";

async function Page({ params }: { params: Promise<{ uri: string }> }) {
  const { uri } = await params;

  return <CounterDisplay uri={uri} />;
}

export default Page;
