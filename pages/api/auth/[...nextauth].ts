import NextAuth, { NextAuthOptions } from "next-auth";
import BoxyHQSAMLProvider from "next-auth/providers/boxyhq-saml";
import { env } from "@/lib/env";
import type { Role } from "nextauth";

const { jackson } = env;

export const authOptions: NextAuthOptions = {
  providers: [
    BoxyHQSAMLProvider({
      issuer: jackson.url,
      clientId: "dummy",
      clientSecret: "dummy",
      authorization: { params: { scope: "" } },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, profile }) {
      const defaultRole = "user";

      // Add roles to the token if they exist
      // If there is no role in the profile, use the default role
      if (profile) {
        let roles: Role[] = [];

        if (profile.raw.roles) {
          roles = profile.raw.roles;
        } else if (profile.raw.groups) {
          roles = profile.raw.groups;
        } else {
          roles = [defaultRole];
        }

        token.roles = roles;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
        session.user.roles = token.roles;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
