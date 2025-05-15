import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Dicionário",
};

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />

      <main className="w-screen flex-1 flex flex-col gap-4 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
