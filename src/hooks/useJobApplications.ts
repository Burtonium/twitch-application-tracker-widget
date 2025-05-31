import { type JobApplication } from "@prisma/client";
import { api } from "@/trpc/react";
import { useEffect, useMemo } from "react";
import { debounce, sortBy, uniqueId } from "lodash";

const orderedStatuses = [
  "Success",
  "Interviewing",
  "Pending",
  "Rejected",
] as const satisfies readonly JobApplication["status"][];
import { useState } from "react";

const useJobApplications = ({
  initialData,
  search,
}: { initialData?: JobApplication[]; search?: string } = {}) => {
  const utils = api.useUtils();
  const [invalidating, setInvalidating] = useState(false);

  const list = api.jobApplications.list.useQuery(
    { search },
    {
      initialData,
    },
  );

  const invalidateList = useMemo(() => {
    const debounced = debounce(async () => {
      try {
        return await utils.jobApplications.list.invalidate();
      } finally {
        return setInvalidating(false);
      }
    }, 1000);

    return () => {
      setInvalidating(true);
      debounced();
    };
  }, [utils]);

  useEffect(() => {
    utils.jobApplications.list.setData({ search }, (data) => {
      return data?.filter(
        (app) =>
          !search ||
          app.company.toLowerCase().includes(search.toLowerCase()) ||
          app.title.toLowerCase().includes(search.toLowerCase()) ||
          app.url.toLowerCase().includes(search.toLowerCase()),
      );
    });
    invalidateList();
  }, [search]);

  const remove = api.jobApplications.delete.useMutation({
    onMutate: (vars) => {
      utils.jobApplications.list.setData({ search }, (data) => {
        return data?.filter((app) => app.id !== vars.id);
      });
    },
    onSuccess: () => invalidateList(),
  });

  const create = api.jobApplications.create.useMutation({
    onMutate: (vars) => {
      utils.jobApplications.list.setData({ search }, (data) => {
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

  const updateStatus = api.jobApplications.updateStatus.useMutation({
    onMutate: (vars) => {
      utils.jobApplications.list.setData({ search }, (data) => {
        return data?.map((app) => {
          if (app.id === vars.id) {
            return {
              ...app,
              status: vars.status,
              updatedAt: new Date(),
            };
          }
          return app;
        });
      });
    },
    onSuccess: () => invalidateList(),
  });

  const count = api.jobApplications.count.useQuery();

  const stats = api.jobApplications.getStats.useSubscription();

  const sortedApplications = useMemo(
    () =>
      sortBy(list.data, [
        (app) => orderedStatuses.indexOf(app.status),
        (app) => -new Date(app.createdAt).getTime(),
      ]),
    [list.data],
  );

  return {
    query: list,
    sorted: sortedApplications,
    invalidating,
    remove,
    create,
    count,
    updateStatus,
    stats,
    isInvalidated: invalidating,
  };
};

export default useJobApplications;
