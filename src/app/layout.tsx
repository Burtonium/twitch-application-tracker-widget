import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";

import { type Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";

export const metadata: Metadata = {
  title: "Job Application Tracker",
  description: "Track your job applications",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const primaryFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: "400",
});

const secondaryFont = Raleway({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: "800",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${primaryFont.variable} ${secondaryFont.variable}`}
      lang="en"
    >
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
