"use client";

import type { Counter } from "@prisma/client";
import CounterControls from "./counter-controls";
import { api } from "@/trpc/react";

interface ClientPageProps {
  counters: Counter[];
}

const CounterList = ({ counters }: ClientPageProps) => {
  const { data = [] } = api.counter.list.useQuery(undefined, {
    initialData: counters,
  });

  return (
    <div>
      <h1 className="heading mb-3 text-3xl font-bold">Counters</h1>
      {data.length === 0 && <p>No counters found</p>}
      <div className="grid w-full grid-cols-4 gap-4">
        {data.map((counter) => (
          <CounterControls key={counter.uri} counter={counter} />
        ))}
      </div>
    </div>
  );
};

export default CounterList;
