import { api, HydrateClient } from "@/trpc/server";
import CreateCounterForm from "./_components/create-counter-form";
import CounterControls from "./_components/counter-control";
import CounterList from "./_components/counter-list";

export default async function Home() {
  const counters = await api.counter.list();

  return (
    <HydrateClient>
      <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <CounterList counters={counters} />
        <CreateCounterForm />
      </main>
    </HydrateClient>
  );
}
