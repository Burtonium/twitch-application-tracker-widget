"use client";

import useJobApplications from "@/hooks/useJobApplications";
import React, { useMemo } from "react";
import { sortBy, uniqBy } from "lodash";

const statusOrder = [
  "Success",
  "Interviewing",
  "Pending",
  "Rejected",
  "No answer",
];

const colors = {
  Success: "#32CD32",
  Interviewing: "#FFA500",
  Pending: "#FFA500",
  Rejected: "#FF0000",
  "No answer": "#FF0000",
};

export default function ApplicationStats() {
  const { stats } = useJobApplications();

  const sorted = useMemo(
    () =>
      sortBy(
        uniqBy(
          stats.data?.concat(
            statusOrder.map((status) => ({
              status,
              count: 0,
            })),
          ),
          (stat) => stat.status,
        ),
        (stat) => statusOrder.indexOf(stat.status),
      ),
    [stats.data],
  );

  return (
    <div className="flex w-full flex-col items-end gap-2 p-8">
      {sorted?.map((stat) => (
        <h2
          className="text-5xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
          style={{ color: colors[stat.status as keyof typeof colors] }}
          key={stat.status}
        >
          {stat.status}: {stat.count}
        </h2>
      ))}
    </div>
  );
}
