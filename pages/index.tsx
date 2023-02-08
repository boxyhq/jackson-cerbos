import type { NextPage } from "next";
import Container from "../components/Container";

const Home: NextPage = () => {
  return (
    <Container title="Home">
      <div className="space-y-4">
        <h2 className="text-2xl">
          Next.js + Enterprise SSO + Cerbos Example App
        </h2>
        <p>
          This example app shows how to use BoxyHQ SAML Jackson with Cerbos to
          authorize access.
        </p>
        <ul className="flex flex-row space-x-6">
          <li>
            <a
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
              href="https://boxyhq.com/docs/jackson/overview"
            >
              SAML Jackson Documentation
            </a>
          </li>
          <li>
            <a
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
              href="https://docs.cerbos.dev/"
            >
              Cerbos Documentation
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Home;
