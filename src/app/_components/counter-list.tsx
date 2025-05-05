"use client";

import type { Counter } from "@prisma/client";
import CounterControls from "./counter-control";
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
      <h1 className="heading text-3xl font-bold">Counters</h1>
      {data.length === 0 && <p>No counters found</p>}
      {data.map((counter) => (
        <CounterControls key={counter.id} counter={counter} />
      ))}
    </div>
  );
};

export default CounterList;
