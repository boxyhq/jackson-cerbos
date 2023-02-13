import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { cerbos } from "@/lib/cerbos";
import { authOptions } from "./auth/[...nextauth]";
import { getContacts } from "db";

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

  const contacts = await getContacts();

  // Cerbos resource attributes mapping
  const resourceAttributes = contacts.map((contact) => ({
    resource: {
      kind: "contact",
      id: contact.id,
      attributes: {
        // Fake the ownership of the contact for the purposes of this demo
        author: contact.author === "current-user" ? id : contact.author,
      },
    },
    actions: ["read", "create", "update", "delete"],
  }));

  const cerbosPayload = {
    principal: {
      id,
      roles,
    },
    resources: resourceAttributes,
  };

  const response = await cerbos.checkResources(cerbosPayload);

  return res.status(200).json({
    data: response.results,
  });
};
