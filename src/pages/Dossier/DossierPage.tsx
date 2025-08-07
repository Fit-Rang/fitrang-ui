import { useEffect, useState } from "react";
import ProfileCard from "@components/ProfileCard";
import handleGetDossiers from "../../services/handleGetDossiers";
import type { Profiles } from "../../services/handleGetDossiers";
import { Riple } from "react-loading-indicators";

export default function DossierPage() {
  const [sharedProfiles, setSharedProfiles] = useState<Profiles[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const data = await handleGetDossiers();
        setSharedProfiles(data);
      } catch (error) {
        console.error("Error loading profiles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  return (
    <main className="h-3/4 w-full p-10">
      <h1 className="font-bold font-dancing text-white text-5xl mt-5 mb-5">
        Shared With You
      </h1>
      {loading ? (
        <article className="text-center">
          <Riple color="#ECCB9A" size="large" text="" textColor="" />
        </article>
      ) : sharedProfiles.length === 0 ? (
        <p className="text-white text-center text-lg mt-10">
          No dossiers have been shared with you yet.
        </p>
      ) : (
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sharedProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              url="dossier"
            />
          ))}
        </article>
      )}
    </main>
  );
}



