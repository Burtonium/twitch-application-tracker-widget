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
    <div>
      <h1>
        {" "}
        {counter.data?.data?.name}: {counter.data?.data?.value}
      </h1>
    </div>
  );
};

export default CounterDisplay;
