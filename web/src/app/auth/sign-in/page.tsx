"use client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export default function SignIn() {
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormSchema>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: async (data: SignInFormSchema) => {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((response) => {
        if (response?.error) {
          throw new Error(response.error);
        }
        if (response?.ok) {
          toast("E-mail enviado com sucesso", {
            description: "Cheque seu e-mail para acessar o painel",
            action: {
              label: "Acessar painel",
              onClick: () => redirect("/dashboard"),
            },
          });
        }
      });
    },
  });

  const handleSignUp = async ({ email, password }: SignInFormSchema) => {
    try {
      await authenticate({ email, password });

      toast("Logado com sucesso");
    } catch (e) {
      toast("Erro ao autenticar", {
        action: {
          label: "Tentar novamente",
          onClick: () => handleSignUp({ email, password }),
        },
      });
    }
  };

  return (
    <>
      <div className="p-8">
        <Button asChild variant="outline" className="absolute right-8 top-8">
          <Link href="/auth/sign-up">Novo usuário</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Perfil
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe o dicionário com várias definições e exemplos de uso!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full mt-4 rounded-full"
              type="submit"
            >
              Acessar perfil
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
