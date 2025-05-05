"use client";

import React from "react";
import { api } from "@/trpc/react";

interface CounterProps {
  counter: {
    id: number;
    name: string;
    value: number;
  };
  onSuccess?: () => void;
}

const CounterControls: React.FC<CounterProps> = ({ counter, onSuccess }) => {
  const utils = api.useUtils();

  const incrementCounter = api.counter.increment.useMutation({
    onMutate: () => {
      utils.counter.list.setData(undefined, (data) => [
        ...(data?.filter((c) => c.id !== counter.id) ?? []),
        { ...counter, value: counter.value + 1 },
      ]);
    },
    onSuccess: () => {
      utils.counter.list.invalidate();
    },
  });

  const increment = () => incrementCounter.mutate({ id: counter.id });

  return (
    <div
      key={counter.id}
      className="flex flex-col items-center gap-3 rounded border bg-white p-4 shadow-md"
    >
      <div className="mb-2 text-lg font-bold">{counter.name}</div>
      <input
        readOnly
        type="text"
        className="w-full rounded-md border p-2 text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        value={counter.value.toString()}
      />
      <button
        onClick={() => increment()}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Increment
      </button>
    </div>
  );
};

export default CounterControls;
