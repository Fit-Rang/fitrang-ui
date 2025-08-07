import axiosInstance from "../libs";
import { AxiosError } from "axios";

export interface DossierPayload {
  face_type: string;
  body_type: string;
  skin_tone: string;
  gender: string;
  preferred_colors?: string[];
  disliked_colors?: string[];
  height?: string;
  weight?: string;
}

export interface Dossier {
  id: string;
  face_type: string;
  body_type: string;
  skin_tone: string;
  gender: string;
  preferred_colors: string[];
  disliked_colors: string[];
  height?: string;
  weight?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface DossierResponse {
  message: string;
  dossier: Dossier;
}

export default async function handleDossierSubmit(payload: DossierPayload): Promise<DossierResponse> {
  try {
    const response = await axiosInstance.post("/profile/create-dossier", payload);
    return response.data as DossierResponse;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Failed to submit dossier:", err.response?.data || err.message);
    throw error;
  }
}


