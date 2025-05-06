import { HydrateClient } from "@/trpc/server";
import Navbar from "./_components/navbar";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar />
      <main className="space-y-5 px-5 py-16"></main>
    </HydrateClient>
  );
}
