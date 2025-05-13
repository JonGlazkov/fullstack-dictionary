import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


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
        console.log(credentials)
        const user = await response.json();

        if (user && response.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        //@ts-expect-error Expires not found in type User
        session = token.user;
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