import "@/styles/globals.css";

import React from "react";
import Navbar from "./_components/navbar";

export default function NavbarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-background text-text min-h-screen">
      <Navbar />
      <div className="pt-16">{children}</div>
    </main>
  );
}
