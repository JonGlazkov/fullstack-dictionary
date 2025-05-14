"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          //@ts-ignore
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster theme="system" richColors />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
