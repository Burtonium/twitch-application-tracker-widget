"use client";

import React, { useState } from "react";
import { JobApplicationStatus, type JobApplication } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  cn,
  Input,
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
} from "@/lib/ui";
import dayjs from "@/dayjs";
import { ExternalLink, Loader2, SearchIcon, X } from "lucide-react";
import useJobApplications from "@/hooks/useJobApplications";
import { DAY_THRESHOLD } from "@/consts";
import JobApplicationView from "./job-application-view";

interface JobApplicationListProps {
  initialData: JobApplication[];
}

const JobApplicationList: React.FC<JobApplicationListProps> = ({
  initialData,
}) => {
  const [search, setSearch] = useState("");
  const {
    query,
    sorted: applications,
    remove,
    updateStatus,
    invalidating,
    stats,
  } = useJobApplications({ initialData, search });

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="decoration-tertiary mb-5 text-2xl underline underline-offset-4">
          <span>
            Job Applications ({applications.length}/{stats.data?.total})
          </span>
          {query.isLoading ||
            (invalidating && (
              <span>
                <Loader2 className="ml-2 inline-block h-6 w-6 animate-spin" />
              </span>
            ))}
        </h2>
        <Input
          placeholder="Search..."
          endAdornment={
            search.length > 0 ? (
              <button
                className="text-destructive cursor-pointer"
                onClick={() => setSearch("")}
              >
                <X />
              </button>
            ) : (
              <SearchIcon className="text-primary h-4 w-4" />
            )
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul className="flex flex-col gap-3">
        {applications?.map((application) => (
          <li key={application.id}>
            <JobApplicationView
              data={application}
              onDelete={() => remove.mutateAsync({ id: application.id })}
              onUpdate={(status) =>
                updateStatus.mutateAsync({
                  id: application.id,
                  status,
                })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobApplicationList;
