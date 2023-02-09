import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Prism from "../components/Prism";

// Call the Cerbos API to check if the user is authorized to access the resources
export const ResourcesPermissions = () => {
  const { data: session } = useSession();
  const [cerbosResponse, setCerbosResponse] = useState<any[] | null>(null);

  const getResources = async () => {
    try {
      const response = await fetch("/api/resources", {
        method: "POST",
      });

      const jsonResponse = await response.json();

      setCerbosResponse(jsonResponse.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (session) {
      getResources();
    }
  }, [session]);

  if (!session || !session.user) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Access API authorized by Cerbos</h2>
      <p>
        Now that you are authenticated, following will call <b>Cerbos API</b> to
        check that you are authorized based on the resources being requested.
      </p>
      <p>
        The result will be returned below demonstrating the authorization
        decision from Cerbos.
      </p>
      <div className="text-sm">
        <Prism
          source={JSON.stringify(cerbosResponse, null, 2)}
          language="json"
        />
      </div>

      <div>
        <p className="py-3">
          The table below shows the authorization decision for each resource
          returned by the Cerbos API.
        </p>
        {cerbosResponse && (
          <table className="table-auto border w-[400px]">
            <thead>
              <tr className="border-b text-left">
                <th className="font-medium px-2 py-2">Resource</th>
                <th className="font-medium px-2 py-2">Read</th>
                <th className="font-medium px-2 py-2">Update</th>
                <th className="font-medium px-2 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cerbosResponse.map((r) => (
                <tr key={r.resource.id} className="border-b">
                  <td className="px-2 py-2">{r.resource.id}</td>
                  <td className="px-2 py-2">
                    {r.actions.read === "EFFECT_ALLOW" ? "✅" : "❌"}
                  </td>
                  <td className="px-2 py-2">
                    {r.actions.update === "EFFECT_ALLOW" ? "✅" : "❌"}
                  </td>
                  <td className="px-3 py-2">
                    {r.actions.delete === "EFFECT_ALLOW" ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
