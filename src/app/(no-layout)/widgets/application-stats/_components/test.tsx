"use client";

import useJobApplications from "@/hooks/useJobApplications";

export default function Test() {
  const { stats } = useJobApplications();

  return (
    <div className="flex w-full flex-col items-end gap-2 p-8">
      {JSON.stringify(stats.data)}
    </div>
  );
}
