"use client";

import React from "react";
import { JobApplicationStatus, type JobApplication } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  cn,
  Button,
} from "@/lib/ui";
import dayjs from "@/dayjs";
import { X } from "lucide-react";
import useJobApplications from "@/hooks/useJobApplications";

interface JobApplicationListProps {
  initialData: JobApplication[];
}

const JobApplicationList: React.FC<JobApplicationListProps> = ({
  initialData,
}) => {
  const { sorted: applications, remove } = useJobApplications(initialData);

  return (
    <div>
      <h2 className="decoration-tertiary mb-5 text-2xl underline underline-offset-4">
        <span>Job Applications</span>
      </h2>
      <ul className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {applications?.map((application) => (
          <li
            key={application.id}
            className={cn(
              {
                "border-destructive": application.status === "Rejected",
                "border-tertiary": application.status === "Interviewing",
                "border-secondary": application.status === "Success",
              },
              "border-muted relative col-span-1 grid grid-cols-subgrid items-center gap-3 rounded-md border px-3 py-2 pr-12 md:col-span-2 lg:col-span-3",
            )}
          >
            <h3>
              <span className="text-secondary text-xl font-bold">
                {application.title}
              </span>{" "}
              at{" "}
              <span className="text-tertiary text-xl font-bold">
                {application.company}
              </span>
            </h3>
            <p>Last Modified: {dayjs(application.updatedAt).fromNow()}</p>
            <p className="flex items-center gap-3">
              Status:{" "}
              <Select value={application.status} onValueChange={console.log}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent align="end">
                  {Object.keys(JobApplicationStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </p>
            <button
              onClick={() => remove.mutateAsync({ id: application.id })}
              className="text-primary absolute right-3 cursor-pointer"
            >
              <X />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobApplicationList;
