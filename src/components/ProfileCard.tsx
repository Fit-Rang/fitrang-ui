import { useRouter } from "@routes/hooks";
import Pro from "@assets/default.jpg"
import type { Profiles } from "../services/handleGetDossiers";

interface ProfileCardProps {
  profile: Profiles;
  url: string
}

export default function ProfileCard({ profile, url }: ProfileCardProps) {
  const router = useRouter();

  const goToDossier = (id: string) => {
    router.push(`/${url}/${id}`);
  };

  return (
    <article
      className="bg-gold p-4 rounded shadow w-auto m-2 hover:shadow-lg transition-shadow hover:bg-grey hover:border hover:border-white cursor-pointer flex items-center gap-4"
      onClick={() => goToDossier(profile.id)}
      role="button"
      aria-label={`Open dossier for ${profile.full_name}`}
    >
      <figure className="w-16 h-16 rounded-full overflow-hidden border-2 border-white bg-white shrink-0">
        {profile ? (
          <img
            src={profile.profile_picture_url || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
            alt={`profile picture`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <img
            src={Pro}
            alt={`profile picture`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </figure>

      <section aria-labelledby={`profile-${profile.id}`}>
        <h2
          id={`profile-${profile.id}`}
          className="text-2xl font-semibold text-black font-dancing"
        >
          {profile.full_name}
        </h2>
        <p className="text-sm text-black">{profile.id}</p>
      </section>
    </article>
  );
}


