import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333",
});

api.interceptors.request.use(async (config) => {
  const session = await getSession(); // Obtém a sessão do NextAuth
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response, // Retorna a resposta normalmente se não houver erro
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      console.warn("Token expirado. Redirecionando para login...");
      await signOut({ callbackUrl: "/auth/sign-in" }); // Faz logout e redireciona
    }
    return Promise.reject(error); // Propaga o erro para ser tratado onde necessário
  }
);
