"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateAccount } from "../actions";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "O nome deve ter pelo menos 3 caracteres.",
    })
    .max(30, {
      message: "Nome não pode ser maior que 30 caracteres.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const { data: session } = useSession();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
    },
  });

  console.log("session", session);

  const { mutateAsync: update } = useMutation({
    mutationKey: ["updateAccount"],
    mutationFn: updateAccount,
    onSuccess: () => {
      signIn("credentials", { redirect: false });
    },
  });

  async function onSubmit(data: AccountFormValues) {
    try {
      await update(data.name);
      toast.success("Você atualizou seu nome para: " + data.name);
    } catch (error) {
      toast.error("Erro ao atualizar seu nome.");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={session?.user?.name ?? "Seu nome"}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} type="submit">
          Atualizar
        </Button>
      </form>
    </Form>
  );
}
