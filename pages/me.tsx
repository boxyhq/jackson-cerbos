import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Container from "../components/Container";
import Prism from "../components/Prism";

const Me: NextPage = () => {
  const { data: session } = useSession();

  // Session exists
  if (session && session?.user) {
    return (
      <Container title="Me">
        <div className="space-y-4">
          <h2 className="text-2xl">{`Hello ${session.user.name}`}</h2>
          <p className="text-gray-500">Session Object</p>
          <div className="text-sm">
            <Prism source={JSON.stringify(session, null, 2)} language="json" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container title="Me">
      <div className="space-y-4">
        <h2 className="text-2xl">Access Denied</h2>
        <p>
          <Link href="/login" className="underline underline-offset-4">
            You must be signed in to view this page
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Me;
