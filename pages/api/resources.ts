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
  // Read session from NextAuth session

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      error: { message: "Unauthorized" },
    });
  }

  console.log(session);

  const response = await cerbos.isAllowed({
    principal: {
      id: "user@example.com",
      roles: ["USER"],
      attributes: { tier: "PREMIUM" },
    },
    resource: {
      kind: "document",
      id: "1",
      attributes: { owner: "user@example.com" },
    },
    action: "view",
  });

  return res.status(200).json({
    data: { allowed: response, session },
  });
};
