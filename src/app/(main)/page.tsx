import { api, HydrateClient } from "@/trpc/server";
import JobApplicationList from "./_components/job-application-list";
import { CreateJobApplication } from "./_components/job-application-form";
import JobApplicationStats from "./_components/job-application-stats";
import QuickLinks from "./_components/quick-links";

export default async function Home() {
  const jobApplications = await api.jobApplications.list();
  return (
    <HydrateClient>
      <main className="p-3 sm:p-5 md:p-8">
        <QuickLinks />
        <CreateJobApplication />
        <JobApplicationStats />
        <JobApplicationList initialData={jobApplications} />
      </main>
    </HydrateClient>
  );
}
