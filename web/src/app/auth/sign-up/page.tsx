"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const signUpFormSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Senhas não coincidem",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const router = useRouter();

  const { mutateAsync: createAccount } = useMutation({
    mutationFn: async (data: SignUpFormSchema) => {
      await api.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: (_, data) => {
      params.set("email", data.email);
      toast.success("Conta criada com sucesso");
      router.push("/auth/sign-in" + "?" + params.toString());
    },
    onError: (e) => {
      toast.error("Erro ao criar conta");
    },
  });

  const handleSignUp = async (data: SignUpFormSchema) => {
    await createAccount(data);
  };

  return (
    <>
      <div className="p-8">
        <Button asChild variant="outline" className="absolute right-8 top-8">
          <Link href="/auth/sign-in">Login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crie sua conta gratuitamente
            </h1>
            <p className="text-sm text-muted-foreground">
              Acesse o dicionário com varias definições e exemplos de uso!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" type="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full rounded-full cursor-pointer"
              type="submit"
            >
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
