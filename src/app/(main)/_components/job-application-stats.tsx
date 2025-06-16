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

export default function JobApplicationStats() {
  const { stats } = useJobApplications();

  const sorted = useMemo(
    () =>
      sortBy(
        uniqBy(
          stats.data?.stats.concat(
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
    <div>
      <div className="flex flex-wrap gap-3 pb-5">
        <strong>Total Applications {stats.data?.total}</strong>
        {sorted?.map((stat) => (
          <h2
            style={{ color: colors[stat.status as keyof typeof colors] }}
            key={stat.status}
          >
            {stat.status}: {stat.count}
          </h2>
        ))}
      </div>
    </div>
  );
}
