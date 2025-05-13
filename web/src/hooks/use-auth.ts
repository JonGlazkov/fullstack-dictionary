"use client";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export async function useAxiosAuth() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      api.defaults.headers.common["Authorization"] =
        `Bearer ${session.accessToken}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [session]);
}
