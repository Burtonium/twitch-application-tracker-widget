import { HydrateClient } from "@/trpc/server";
import ApplicationStats from "./_components/application-stats";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <ApplicationStats />
      </main>
    </HydrateClient>
  );
}
