import { useSession } from "next-auth/react";
import Prism from "../components/Prism";
import Link from "next/link";

export const UserProfile = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return (
      <div className="space-y-2">
        <Link href="/login" className="underline underline-offset-2">
          Sign in to see your profile.
        </Link>
        <p>
          Cerbos will use your identity to make authorization requests and
          display the results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl">{`Hello ${session.user.name}`}</h2>
      <p className="text-gray-500">
        This is the user profile of the currently authenticated user fetched
        from the Identity Provider.
      </p>
      <div className="text-sm">
        <Prism source={JSON.stringify(session, null, 2)} language="json" />
      </div>
    </div>
  );
};
