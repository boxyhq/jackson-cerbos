import type { NextPage } from "next";
import Container from "@/components/Container";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { cerbos } from "@/lib/cerbos";
import { getContactById } from "db";
import Prism from "@/components/Prism";
import { useRouter } from "next/router";

type Props = {
  isAllowed: boolean;
  message: string;
  roles: string[];
  contact: {
    id: string;
    name: string;
    email: string;
  } | null;
};

const Contacts: NextPage<Props> = ({ isAllowed, message, roles, contact }) => {
  const router = useRouter();

  const contactId = router.query.id as string;

  return (
    <Container title="Contacts">
      <div className="space-y-4">
        <h2 className="text-2xl">Contact Info</h2>
        <p>{message}</p>
        {isAllowed ? (
          <>
            <p>
              Here is the contact info for the contact with ID{" "}
              <b>{contactId}</b>
            </p>
            <div className="text-sm">
              <Prism
                source={JSON.stringify(contact, null, 2)}
                language="json"
              />
            </div>
          </>
        ) : null}
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getServerSession(req, res, authOptions);

  // User is not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const contactId = params?.id as string;
  const roles = session.user?.roles || [];
  const userId = session.user?.id as string;

  const contact = await getContactById(contactId);

  // Contact not found
  if (!contact) {
    return {
      notFound: true,
    };
  }

  // Fake the ownership of the contact for the purposes of this demo
  if (contact.author === "current-user") {
    contact.author = userId;
  }

  // Call Cerbos to check if the user is authorized to view the contact
  // You can pass the resource attributes to Cerbos to make the authorization decision
  const isAllowed = await cerbos.isAllowed({
    principal: { id: userId, roles },
    resource: {
      kind: "contact",
      id: contactId,
      attributes: {
        author: contact.author,
      },
    },
    action: "read",
  });

  // User is not authorized to view the contact
  if (!isAllowed) {
    return {
      props: {
        message: "Forbidden. You are not authorized to view this contact.",
        roles,
        contact: null,
        isAllowed,
      },
    };
  }

  // User is authorized to view the contact
  return {
    props: {
      message: "Contact found. You are authorized to view this contact.",
      roles,
      contact,
      isAllowed,
    },
  };
};

export default Contacts;
