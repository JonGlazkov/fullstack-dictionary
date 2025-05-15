import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the User type to include 'token'
declare module "next-auth" {
  interface User {
    token?: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const host = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },

      async authorize(credentials) {
        const response = await fetch(`${host}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await response.json();

        if (user?.token && response.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token?.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/app",
    signOut: "/auth/sign-in",
    error: "/",
    newUser: "/app",
  },
});
