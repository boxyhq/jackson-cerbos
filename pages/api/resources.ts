import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { cerbos } from "@/lib/cerbos";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      return await handlePOST(req, res);
    default:
      res.setHeader("Allow", "POST");
      res.status(405).json({
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

// Call Cerbos API to check if the user has access to the resource
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).json({
      error: { message: "Unauthorized" },
    });
  }

  const { id, email, roles } = session.user;

  if (!id || !email || !roles) {
    throw new Error("User is missing required fields");
  }

  const cerbosPayload = {
    principal: {
      id,
      roles, // Roles from Okta or other SAML provider
      attributes: {
        email,
      },
    },
    resources: [
      {
        resource: {
          kind: "contact",
          id: "1",
          attributes: {
            author: id, // This resource is owned by current user
          },
        },
        actions: ["read", "create", "update", "delete"],
      },

      {
        resource: {
          kind: "contact",
          id: "2",
          attributes: {
            author: "some-id", // This resource is owned by a different user
          },
        },
        actions: ["read", "create", "update", "delete"],
      },
    ],
  };

  const response = await cerbos.checkResources(cerbosPayload);

  return res.status(200).json({
    data: response.results,
  });
};
