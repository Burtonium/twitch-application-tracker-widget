import { type JobApplication } from "@prisma/client";
import { api } from "@/trpc/react";
import { useMemo } from "react";
import { debounce, sortBy, uniqueId } from "lodash";

const statusOrder = ["Success", "Interviewing", "Pending", "Rejected"];

const useJobApplications = (initialData?: JobApplication[]) => {
  const utils = api.useUtils();
  const list = api.jobApplications.list.useQuery(undefined, {
    initialData,
  });

  const invalidateList = useMemo(
    () => debounce(utils.jobApplications.list.invalidate, 1500),
    [utils],
  );

  const remove = api.jobApplications.delete.useMutation({
    onMutate: (vars) => {
      utils.jobApplications.list.setData(undefined, (data) => {
        return data?.filter((app) => app.id !== vars.id);
      });
    },
    onSuccess: () => invalidateList(),
  });

  const create = api.jobApplications.create.useMutation({
    onMutate: (vars) => {
      utils.jobApplications.list.setData(undefined, (data) => {
        return [
          ...(data ?? []),
          {
            id: uniqueId(),
            ...vars,
            status: "Pending",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      });
    },
    onSuccess: () => invalidateList(),
  });

  const sortedApplications = useMemo(
    () =>
      sortBy(list.data, [
        (app) => statusOrder.indexOf(app.status),
        (app) => -new Date(app.updatedAt).getTime(),
      ]),
    [list.data],
  );

  return {
    query: list,
    sorted: sortedApplications,
    remove,
    create,
  };
};

export default useJobApplications;
