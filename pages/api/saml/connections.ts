import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/lib/env";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      return await handlePOST(req, res);
    case "GET":
      return await handleGET(req, res);
    default:
      res.setHeader("Allow", "GET, POST");
      res.status(405).json({
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

// Create a SAML connection for the team.
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { encodedRawMetadata } = req.body;

  const { defaultRedirectUrl, redirectUrl, product, apiKey, url } = env.jackson;

  // Should be dynamic based on the user's team/organization/tenant
  const tenant = "acme.com";

  // Call SAML JSON API to create a connection
  const response = await fetch(`${url}/api/v1/connections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      product,
      tenant,
      defaultRedirectUrl,
      redirectUrl,
      encodedRawMetadata,
    }),
  });

  const data = await response.json();

  if (response.status === 200) {
    return res.status(200).json({ data });
  }

  return res.status(400).json(data);
};

// Get SAML connection for the team.
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  // Should be dynamic based on the user's team/organization/tenant
  const tenant = "acme.com";

  const { url, apiKey, product } = env.jackson;

  // Call SAML JSON API to get the connection
  const response = await fetch(
    `${url}/api/v1/connections?product=${product}&tenant=${tenant}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const data = await response.json();

  if (response.status === 200) {
    // If there is no connection, return no data
    if (data.length === 0) {
      return res.status(200).json({ data: null });
    }

    // If there are multiple connections, return the first connection
    return res.status(200).json({ data: data[0] });
  }

  return res.status(400).json(data);
};
