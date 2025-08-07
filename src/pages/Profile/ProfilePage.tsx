import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "@routes/hooks";
import type { Profiles } from "../../services/handleGetDossiers";
import { handleGetMyProfile } from "../../services";
import handleViewProfile from "../../services/handleViewProfile";
import handleUpdateMyProfile from "../../services/handleUpdateProfile";
import handleSendAccessRequest from "../../services/handleSendAccessRequest";
import { useAuthStore } from "../../store/authStore";

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { logout } = useAuthStore();

  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [user, setUser] = useState<Profiles>();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = id
          ? await handleViewProfile(id)
          : await handleGetMyProfile();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) =>
        prev ? { ...prev, profile_picture_url: imageUrl } : prev
      );
      setNewPhotoFile(file);
    }
  };

  const handleClickChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleSavePhoto = async () => {
    if (!newPhotoFile) return;
    const fixedFile = new File([newPhotoFile], newPhotoFile.name, {
      type: newPhotoFile.type,
    });

    const formData = new FormData();
    formData.append("photo", fixedFile);

    try {
      console.log("Uploading profile picture:", newPhotoFile.name);

      const updatedUser = await handleUpdateMyProfile(formData);
      setUser(updatedUser);
      setNewPhotoFile(null);
    } catch (error) {
      console.error("Failed to upload profile picture", error);
    }
  };

  const handleNavigate = () => {
    router.push(`/dossier`);
  };

  const handleRequestAccess = async () => {
    try {
      const status = await handleSendAccessRequest(id);
      if (status === 200) {
        setUser({ ...user, has_access: true });
      }
    } catch (error) {
      console.error("Error sending access request", error);
    }
  };

  return (
    <main className="h-3/4 w-full p-5 flex flex-col items-center justify-center overflow-y-auto mt-7">
      <article className="bg-white/10 relative backdrop-blur-md rounded-2xl px-10 py-8 w-full max-w-3xl text-white shadow-lg flex flex-col items-center gap-8">
        {!id && (
          <footer
            className="absolute bottom-5 right-2 bg-gold text-black p-2 rounded cursor-pointer hover:bg-white/90"
            onClick={handleNavigate}
          >
            <p>My Dossier</p>
          </footer>
        )}

        <section className="flex flex-col items-center relative">
          <figure className="flex flex-col items-center">
            <img
              src={user?.profile_picture_url || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
              alt={`${user?.full_name}'s Profile`}
              className="w-40 h-40 rounded-full border-4 border-white/30 shadow-md object-cover object-top"
            />
          </figure>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {!id ? (
            <>
              {newPhotoFile ? (
                <button
                  onClick={handleSavePhoto}
                  className="mt-2 px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Save Photo
                </button>
              ) : (
                <button
                  onClick={handleClickChangePhoto}
                  className="mt-3 px-4 py-1 text-sm bg-gold text-black rounded hover:bg-white/80 transition"
                >
                  Change Profile Picture
                </button>
              )}
            </>
          ) : (
            !user?.has_access && (
              <footer
                className="bg-gold mt-5 rounded text-black p-2 cursor-pointer hover:border-black hover:border w-fit h-fit"
                onClick={handleRequestAccess}
              >
                <p>Request Access</p>
              </footer>
            )
          )}
        </section>

        <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-lg sm:ml-10">
          <article>
            <header className="text-base font-semibold text-gold mb-1">
              User ID
            </header>
            <p className="break-all">{user?.id}</p>
          </article>
          <article>
            <header className="text-base font-semibold text-gold mb-1">
              Name
            </header>
            <p>{user?.full_name}</p>
          </article>
          {user?.email && (
            <article>
              <header className="text-base font-semibold text-gold mb-1">
                Email
              </header>
              <p>{user.email}</p>
            </article>
          )}
          <article>
            <header className="text-base font-semibold text-gold mb-1">
              Joined On
            </header>
            <p>
              {user?.created_at &&
                new Date(user.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
            </p>
          </article>
        </section>

        {!id && (
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors absolute top-5 right-5"
          >
            Logout
          </button>
        )}
      </article>
    </main>
  );
}

