

import type { NextAuthOptions, RequestInternal } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/prisma/prisma";

export const auth: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      
      

      async authorize(credentials : Record<>) {

        const password = credentials.password as string;
        const email = credentials.email;

        const ctx = await db.user.findFirst({
          where: {
            password,
            email,
          },
        });

        const user = ctx;

        if (ctx !== null) {
          return {user};
        } else {
          return false;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      user.email = credentials?.email as string;
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
    async session({ session, user, token }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url;
    },
  },
};