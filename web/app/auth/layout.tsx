import { Metadata } from "next";
import Image from "next/image";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: { default: "Entrar", template: "%s | AI Medcare" },
  description: "Bem Vindo à AI Medcare",
};

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="grid min-h-screen grid-cols-2 antialiased">
        <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted text-muted-foreground">
          <div className="relative flex size-full items-center gap-3 bg-background-secondary text-lg font-medium text-foreground">
            <Image
              src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc"
              alt="Dictionary"
              width={1000}
              height={1000}
              className="min-h-full w-full bg-transparent object-cover"
            />
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
}
