import axiosInstance from "../libs";

export interface Dossier {
  id: string;
  owner_id: string;
  face_type: string;
  skin_tone: string;
  body_type: string;
  gender: string;
  preferred_colors: string[];
  disliked_colors: string[];
  height?: string;
  weight?: string;
}

export default async function handleGetMyDossier(): Promise<Dossier> {
  const response = await axiosInstance.get(`/profile/dossier`);
  const raw = response.data.dossier;

  return {
    id: raw.Id,
    owner_id: raw.OwnerID,
    face_type: raw.FaceType,
    skin_tone: raw.SkinTone,
    body_type: raw.BodyType,
    gender: raw.Gender,
    preferred_colors: raw.PreferredColors ?? [],
    disliked_colors: raw.DislikedColors ?? [],
    height: raw.Height ?? undefined,
    weight: raw.Weight ?? undefined,
  };
}


