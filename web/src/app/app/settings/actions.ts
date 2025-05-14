import { api } from "@/lib/axios";

export async function updateAccount(name: string) {
  const { data } = await api.patch("/users/", {
    name,
  });

  return data;
}
