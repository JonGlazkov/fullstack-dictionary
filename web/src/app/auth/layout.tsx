import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";
import LeftSide from "./_components/left-side";

export const metadata: Metadata = {
  title: { default: "Entrar", template: "%s | AI Medcare" },
  description: "Bem Vindo à AI Medcare",
};

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="md:grid not-md:flex min-h-screen not-md:min-w-full not-md:justify-center md:grid-cols-2 antialiased">
        <LeftSide />

        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={<div className="h-full w-full animate-pulse bg-muted" />}
          >
            {children}
          </Suspense>
        </div>
      </div>
    </>
  );
}
