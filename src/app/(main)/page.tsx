import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const counters = await api.counter.list();

  return (
    <HydrateClient>
      <main className="container mx-auto space-y-5 px-5 py-16"></main>
    </HydrateClient>
  );
}
