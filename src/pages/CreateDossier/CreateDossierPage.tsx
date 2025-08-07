import { useState } from "react";
import { useRouter } from "@routes/hooks";
import handleDossierSubmit from "../../services/handleDossierSubmit";
import { AxiosError } from "axios";

const faceTypes: Record<string, string[]> = {
  female: ["oval", "heart", "diamond", "square", "round", "oblong"],
  male: ["rectangular", "round", "oblong", "triangular", "heart"],
};

const bodyTypes: Record<string, string[]> = {
  female: ["apple", "pear", "rectangular", "hourglass"],
  male: ["rectangular", "triangle", "trapezoid", "oval", "invert-triangle"],
};

const skinTones = ["pale", "light", "olive", "dark"];
const genders = ["male", "female"];

export default function CreateDossierPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    face_type: "",
    skin_tone: "light",
    body_type: "",
    gender: "female",
    preferred_colors: "",
    disliked_colors: "",
    height: "",
    weight: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      face_type: form.face_type,
      skin_tone: form.skin_tone,
      body_type: form.body_type,
      gender: form.gender,
      preferred_colors: form.preferred_colors.split(",").map(c => c.trim()).filter(Boolean),
      disliked_colors: form.disliked_colors.split(",").map(c => c.trim()).filter(Boolean),
      height: form.height || undefined,
      weight: form.weight || undefined,
    };

    try {
      await handleDossierSubmit(payload);
      setSuccess(true);
      router.push("/dossier");
    } catch (error) {
      const err = error as AxiosError;
      setError(err.response?.data?.message || "Failed to create dossier.");
    }
  };

  return (
    <main className="p-8 max-w-5xl mx-auto text-white h-full overflow-y-scroll sm:overflow-y-hidden">
      <section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-black"
        >
          <header className="text-center mb-2">
            <h1 className="text-5xl font-bold font-dancing text-white">Style Dossier</h1>
          </header>

          <fieldset className="border-0">
            <legend className="sr-only">Dossier Preferences</legend>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <article className="flex flex-col gap-1">
                <label htmlFor="gender" className="font-semibold text-white">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="bg-gold p-2 rounded"
                >
                  {genders.map(g => (
                    <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                  ))}
                </select>
              </article>

              <article className="flex flex-col gap-1">
                <label htmlFor="face_type" className="font-semibold text-white">Face Type</label>
                <select
                  id="face_type"
                  name="face_type"
                  value={form.face_type}
                  onChange={handleChange}
                  required
                  className="bg-gold p-2 rounded"
                >
                  <option value="">Select Face Type</option>
                  {faceTypes[form.gender].map(ft => (
                    <option key={ft} value={ft}>{ft.charAt(0).toUpperCase() + ft.slice(1)}</option>
                  ))}
                </select>
              </article>

              <article className="flex flex-col gap-1">
                <label htmlFor="body_type" className="font-semibold text-white">Body Type</label>
                <select
                  id="body_type"
                  name="body_type"
                  value={form.body_type}
                  onChange={handleChange}
                  required
                  className="bg-gold p-2 rounded"
                >
                  <option value="">Select Body Type</option>
                  {bodyTypes[form.gender].map(bt => (
                    <option key={bt} value={bt}>{bt.charAt(0).toUpperCase() + bt.slice(1)}</option>
                  ))}
                </select>
              </article>

              <article className="flex flex-col gap-1">
                <label htmlFor="skin_tone" className="font-semibold text-white">Skin Tone</label>
                <select
                  id="skin_tone"
                  name="skin_tone"
                  value={form.skin_tone}
                  onChange={handleChange}
                  required
                  className="bg-gold p-2 rounded"
                >
                  {skinTones.map(st => (
                    <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>
                  ))}
                </select>
              </article>

              <article className="flex flex-col gap-1 col-span-full">
                <label htmlFor="preferred_colors" className="font-semibold text-white">Preferred Colors</label>
                <input
                  id="preferred_colors"
                  name="preferred_colors"
                  value={form.preferred_colors}
                  onChange={handleChange}
                  placeholder="Preferred Colors (comma-separated)"
                  className="bg-gold p-2 rounded placeholder-black"
                />
              </article>

              <article className="flex flex-col gap-1 col-span-full">
                <label htmlFor="disliked_colors" className="font-semibold text-white">Disliked Colors</label>
                <input
                  id="disliked_colors"
                  name="disliked_colors"
                  value={form.disliked_colors}
                  onChange={handleChange}
                  placeholder="Disliked Colors (comma-separated)"
                  className="bg-gold p-2 rounded placeholder-black"
                />
              </article>

              <article className="flex flex-col gap-1">
                <label htmlFor="height" className="font-semibold text-white">Height</label>
                <input
                  id="height"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  placeholder="Height (optional)"
                  className="bg-gold p-2 rounded placeholder-black"
                />
              </article>

              <article className="flex flex-col gap-1">
                <label htmlFor="weight" className="font-semibold text-white">Weight</label>
                <input
                  id="weight"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="Weight (optional)"
                  className="bg-gold p-2 rounded placeholder-black"
                />
              </article>
            </section>

            <footer className="mt-6">
              <button
                type="submit"
                className="bg-grey text-white font-bold py-2 px-4 rounded hover:bg-opacity-90"
              >
                Submit Dossier
              </button>
              {error && <p className="text-red-400 font-medium mt-2">{error}</p>}
              {success && <p className="text-green-400 font-medium mt-2">Dossier created successfully!</p>}
            </footer>
          </fieldset>
        </form>
      </section>
    </main>
  );
}


