import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@routes/hooks";
import { Riple } from "react-loading-indicators";
import handleViewDossier from "../../services/handleViewDossier";
import handleGetMyDossier from "../../services/handleGetMyDossier";
import type { Dossier } from "../../services/handleGetMyDossier";

export default function DossierDetailPage() {
  const [dossier, setDossier] = useState<Dossier>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const goToCreate = () => {
    router.push("/create-dossier");
  };

  useEffect(() => {
    const fetchDossier = async () => {
      try {
        const dossierData = id
          ? await handleViewDossier(id)
          : await handleGetMyDossier();

        setDossier(dossierData);
      } catch (error) {
        console.error("Failed to fetch dossier:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDossier();
  }, [id]);

  if (!id && !dossier && !loading) {
    return (
      <main className="p-8 text-white text-center">
        <h1 className="text-4xl font-dancing mb-3">You don't have a Dossier yet...</h1>
        <button
          onClick={goToCreate}
          className="bg-gold p-2 font-bold text-black rounded"
        >
          Create a Dossier
        </button>
      </main>
    );
  }

  if (loading || !dossier) {
    return (
      <main className="p-8 text-white text-center">
        <Riple color="#ECCB9A" size="large" text="" textColor="" />
      </main>
    );
  }

  return (
    <main className="h-full w-full flex flex-col items-center justify-center overflow-y-auto text-white">
      <header className="text-center rounded-2xl p-6 mb-8">
        <h1 className="text-5xl font-bold font-dancing text-white">
          Style Dossier
        </h1>
      </header>

      <section className="bg-grey rounded-2xl p-8 shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 text-lg items-start border border-white">
        <section>
          <h2 className="text-gold font-semibold mb-1">Gender</h2>
          <p>{dossier.gender}</p>
        </section>

        <section>
          <h2 className="text-gold font-semibold mb-1">Face Type</h2>
          <p>{dossier.face_type}</p>
        </section>

        <section>
          <h2 className="text-gold font-semibold mb-1">Body Type</h2>
          <p>{dossier.body_type}</p>
        </section>

        <section>
          <h2 className="text-gold font-semibold mb-1">Skin Tone</h2>
          <p>{dossier.skin_tone}</p>
        </section>

        <section className="col-span-full">
          <h2 className="text-gold font-semibold mb-1">Preferred Colors</h2>
          <p>{dossier.preferred_colors?.join(", ") || null}</p>
        </section>

        <section className="col-span-full">
          <h2 className="text-gold font-semibold mb-1">Disliked Colors</h2>
          <p>{dossier.disliked_colors?.join(", ") || null}</p>
        </section>

        {dossier.height && (
          <section>
            <h2 className="text-gold font-semibold mb-1">Height</h2>
            <p>{dossier.height}</p>
          </section>
        )}

        {dossier.weight && (
          <section>
            <h2 className="text-gold font-semibold mb-1">Weight</h2>
            <p>{dossier.weight}</p>
          </section>
        )}
      </section>
    </main>
  );
}





