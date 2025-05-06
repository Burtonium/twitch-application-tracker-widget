import { api, HydrateClient } from "@/trpc/server";
import JobApplicationList from "./_components/job-application-list";
import { CreateJobApplication } from "./_components/job-application-form";

export default async function Home() {
  const jobApplications = await api.jobApplications.list();
  return (
    <HydrateClient>
      <main className="p-3 sm:p-5 md:p-8">
        <CreateJobApplication />
        <JobApplicationList initialData={jobApplications} />
      </main>
    </HydrateClient>
  );
}
