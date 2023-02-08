import jwt from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import BoxyHQSAMLProvider from "next-auth/providers/boxyhq-saml";
import { env } from "@/lib/env";

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
      const allowedRoles = ["admin", "user"];
      const defaultRole = "developer";

      if (profile) {
        // @ts-ignore
        token.roles = profile.raw.roles;
        // @ts-ignore
        token.groups = profile.raw.groups;
      }

      // console.log({ token, profile });

      // if (profile) {
      //   const roles = profile.roles as any;
      //   const groups = profile.groups as any;
      //   let role;
      //   if (roles && roles.length > 0) {
      //     role = roles[0];
      //   } else if (groups && groups.length > 0) {
      //     role = groups[0];
      //   }
      //   token["role"] = role ?? defaultRole;
      // }

      return token;
    },

    async session({ session, user, token }) {
      // @ts-ignore
      session.user.id = token.sub;
      // @ts-ignore
      session.user.roles = token.roles;
      // @ts-ignore
      session.user.groups = token.groups;

      return session;
    },
  },
};

export default NextAuth(authOptions);
