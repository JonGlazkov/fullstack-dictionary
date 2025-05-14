import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />

      <main className="flex-1 flex flex-col gap-4 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
