import { HydrateClient } from "@/trpc/server";
import ApplicationStats from "./_components/application-stats";
import Test from "./_components/test";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Test />
      </main>
    </HydrateClient>
  );
}
