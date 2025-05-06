import { api, HydrateClient } from "@/trpc/server";
import CreateCounterForm from "./_components/create-counter-form";
import CounterList from "./_components/counter-list";

export default async function Home() {
  const counters = await api.counter.list();

  return (
    <HydrateClient>
      <main className="container mx-auto space-y-5 px-5 py-16">
        <CounterList counters={counters} />
        <CreateCounterForm />
      </main>
    </HydrateClient>
  );
}
