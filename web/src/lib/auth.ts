import NextAuth, { Session } from "next-auth";
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },

      async authorize(credentials) {
        const response = await fetch(`http://localhost:3333/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        console.log(credentials);
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
