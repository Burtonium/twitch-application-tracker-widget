"use client";

import { api } from "@/trpc/react";
import React from "react";

interface CounterDisplayProps {
  uri: string;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ uri }) => {
  const counter = api.counter.getByName.useSubscription({
    uri,
  });

  return (
    <h1 className="inline text-6xl font-bold text-shadow-lg">
      {counter.data?.data?.name}: {counter.data?.data?.value}
    </h1>
  );
};

export default CounterDisplay;
