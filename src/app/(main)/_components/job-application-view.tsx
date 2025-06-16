import { DAY_THRESHOLD } from "@/consts";
import useJobApplications from "@/hooks/useJobApplications";
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from "@/lib/ui";
import { type JobApplication, JobApplicationStatus } from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { ExternalLink, X } from "lucide-react";
import { useMemo, useState } from "react";

const deriveJobApplication = (jobApp: JobApplication) => {
  const derivedStatus =
    jobApp.status === "Pending" &&
    dayjs.duration(dayjs().diff(dayjs(jobApp.createdAt))).asDays() >=
      DAY_THRESHOLD
      ? "No answer"
      : "";

  return {
    ...jobApp,
    derivedStatus,
  };
};

const JobApplicationView = ({
  data,
  onDelete,
  onUpdate,
}: {
  data: JobApplication;
  onDelete: () => void;
  onUpdate: (status: JobApplicationStatus) => void;
}) => {
  const [open, setOpen] = useState(false);
  const application = useMemo(() => deriveJobApplication(data), [data]);

  return (
    <div
      className={cn(
        {
          "border-destructive":
            application.status === "Rejected" ||
            application.derivedStatus === "No answer",
          "border-tertiary": application.status === "Interviewing",
          "border-primary": application.status === "Success",
        },
        "relative col-span-1 flex flex-col gap-2 rounded-md border px-3 py-2 pr-12 md:col-span-2 lg:col-span-3",
      )}
    >
      <h3>
        <a href={application.url} target="_blank" rel="noreferrer">
          <span className="text-tertiary text-xl font-bold">
            {application.title}
          </span>{" "}
          at{" "}
          <span className="text-secondary text-xl font-bold">
            {application.company}
          </span>
          {application.derivedStatus && (
            <span className="text-destructive text-lg font-bold uppercase empty:hidden">
              &nbsp;**{application.derivedStatus}**
            </span>
          )}
          <ExternalLink className="text-primary mb-2 ml-2 inline text-sm" />
        </a>
      </h3>
      <p>Last Modified: {dayjs(application.updatedAt).fromNow()}</p>
      <p className="flex items-center gap-3">
        Status:{" "}
        <Select
          value={application.status}
          onValueChange={(status) => onUpdate(status as JobApplicationStatus)}
        >
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="text-destructive absolute top-3 right-2 cursor-pointer">
            <X />
          </button>
        </DialogTrigger>
        <DialogContent className="border-destructive rounded-2xl border">
          <DialogTitle className="text-text text-2xl font-bold">
            Confirm Deletion
          </DialogTitle>
          <p className="text-text">
            Are you sure you want to delete{" "}
            <span className="text-tertiary">{application.title}</span> from{" "}
            <span className="text-secondary">{application.company}</span>?
          </p>
          <div className="mt-4 flex justify-end gap-4">
            <Button variant="destructive" onClick={() => onDelete()}>
              Yes
            </Button>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobApplicationView;
