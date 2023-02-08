import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Container from "../components/Container";

const Me: NextPage = () => {
  const [metadata, setMetadata] = useState<string>("");
  const [connection, setConnection] = useState({});

  // Create SAML connection
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/saml/connections", {
      method: "POST",
      body: JSON.stringify({
        encodedRawMetadata: Buffer.from(metadata).toString("base64"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("SAML connection created successfully");
    }

    setMetadata("");
    fetchSAMLConnection();
  };

  // Fetch SAML connection
  const fetchSAMLConnection = async () => {
    const response = await fetch("/api/saml/connections", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const connection = await response.json();

      setConnection(connection.data);
    }
  };

  useEffect(() => {
    fetchSAMLConnection();
  }, []);

  return (
    <Container title="SAML Connection">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div className="mb-5">
            {connection ? (
              <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                SAML SSO Enabled
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                SAML SSO Not Enabled
              </span>
            )}
          </div>
          <p className="mb-5 text-gray-600">
            In real world applications, the SAML connection is typically
            configured by the IT team and this page should be accessible only by
            the users with the appropriate access in the organization.
          </p>
          <div className="p-4 border-gray-200 border bg-white rounded">
            <form className="space-y-3" method="POST" onSubmit={onSubmit}>
              <label htmlFor="metadata" className="block text-sm">
                Paste the XML Metadata to create a new SAML connection
              </label>
              <textarea
                name="metadata"
                placeholder="XML Metadata"
                className="appearance-none text-sm block w-full border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-indigo-500"
                required
                rows={10}
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 w-full border border-transparent rounded text-sm font-medium text-white bg-indigo-600 focus:outline-none"
              >
                Create SAML Connection
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Me;
