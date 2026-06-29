import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";

export interface CurrentUser {
  email: string | null;
  id: string;
  image: string | null;
  name: string | null;
}

export interface AuthProviderStatus {
  facebookConfigured: boolean;
  googleConfigured: boolean;
  hasAuthSecret: boolean;
}

export function getAuthProviderStatus(): AuthProviderStatus {
  return {
    facebookConfigured: Boolean(
      process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET,
    ),
    googleConfigured: Boolean(
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
    ),
    hasAuthSecret: Boolean(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
  };
}

export function isAuthRuntimeReady() {
  const status = getAuthProviderStatus();

  return status.hasAuthSecret && status.googleConfigured;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session({ session, user }) {
      if (session.user != null) {
        session.user.id = user.id;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
};
