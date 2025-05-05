"use client";

import React, { useMemo } from "react";
import { api } from "@/trpc/react";
import type { Counter } from "@prisma/client";
import { debounce } from "lodash";
import { ArrowRight, Copy, Eye, X } from "lucide-react";
import Link from "next/link";

interface CounterProps {
  counter: Counter;
}

const CounterControls: React.FC<CounterProps> = ({ counter }) => {
  const utils = api.useUtils();

  const debouncedRefetch = useMemo(
    () =>
      debounce(() => {
        utils.counter.list.refetch();
      }, 1500),
    [utils],
  );

  const resetCounter = api.counter.reset.useMutation({
    onMutate: () => {
      utils.counter.list.setData(undefined, (data) => {
        const updatedData =
          data?.map((c) =>
            c.uri === counter.uri ? { ...counter, value: 0 } : c,
          ) ?? [];
        return updatedData;
      });
    },
    onSuccess: () => debouncedRefetch(),
  });

  const deleteCounter = api.counter.delete.useMutation({
    onMutate: () => {
      utils.counter.list.setData(undefined, (data) => {
        const updatedData = data?.filter((c) => c.uri !== counter.uri) ?? [];
        return updatedData;
      });
    },
    onSuccess: () => {
      debouncedRefetch();
    },
  });

  const incrementCounter = api.counter.increment.useMutation({
    onMutate: () => {
      utils.counter.list.setData(undefined, (data) => {
        const updatedData =
          data?.map((c) =>
            c.uri === counter.uri
              ? { ...counter, value: counter.value + 1 }
              : c,
          ) ?? [];
        return updatedData;
      });
    },
    onSuccess: () => debouncedRefetch(),
  });

  const increment = () => incrementCounter.mutate({ uri: counter.uri });

  return (
    <div
      key={counter.uri}
      className="relative flex flex-col items-center gap-3 rounded border bg-white px-5 py-8 shadow-md"
    >
      <button
        onClick={() => deleteCounter.mutateAsync({ uri: counter.uri })}
        className="absolute top-2 right-2 cursor-pointer hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
      >
        <X />
      </button>
      <div className="mb-2 text-lg font-bold">{counter.name}</div>

      <input
        readOnly
        type="text"
        className="w-full rounded-md border p-2 text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        value={counter.value.toString()}
      />
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => increment()}
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Increment
        </button>
        <button
          onClick={() => resetCounter.mutateAsync({ uri: counter.uri })}
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href={`/counter/${counter.uri}`}>
          <button className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
            <Eye />
          </button>
        </Link>
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/counter/${counter.uri}`,
            );
          }}
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          <Copy />
        </button>
      </div>
    </div>
  );
};

export default CounterControls;
