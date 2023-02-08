import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Container from "../components/Container";
import Prism from "../components/Prism";

const Contacts: NextPage = () => {
  const { data: session } = useSession();
  const [cerbosResponse, setCerbosResponse] = useState(null);

  const getResource = async () => {
    try {
      const response = await fetch("/api/resources", {
        method: "POST",
      });

      const jsonResponse = await response.json();

      setCerbosResponse(jsonResponse);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getResource();
  }, []);

  console.log(cerbosResponse);

  // User has authenticated
  if (true) {
    return (
      <Container title="Contacts">
        <div className="space-y-4">
          <h2 className="text-2xl">Contacts</h2>
          <p>
            Now that you are authenticated as <b>Kiran</b> the following makes a
            request to the API endpoint of a sample CRM application. This will
            call <b>Cerbos</b> to check that you are authorized based on the
            resources being requested.
          </p>
          <p>
            The result will be returned below demonstrating the authorization
            decision from Cerbos.
          </p>
          <div className="text-sm">
            <Prism source={JSON.stringify(session, null, 2)} language="json" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container title="Contacts">
      <div className="space-y-4">
        <h2 className="text-2xl">Contacts</h2>
        <p>
          <Link href="/login" className="underline underline-offset-4">
            wew
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Contacts;
