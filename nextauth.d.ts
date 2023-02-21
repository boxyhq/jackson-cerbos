import { DefaultSession } from "next-auth";

type Role = "app-admin" | "app-user";

declare module "next-auth" {
  interface User {
    roles?: Role[];
    id?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }

  interface Profile {
    raw: {
      roles?: Role[];
      groups?: Role[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: Role[];
  }
}
