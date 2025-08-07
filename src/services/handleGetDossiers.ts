import { AxiosError } from "axios";
import axiosInstance from "../libs";

export interface Profiles {
  id: string;
  email?: string;
  full_name: string;
  created_at: string;
  updated_at: string;
  profile_picture_url: string;
  has_access?: boolean;
}

export default async function handleGetDossiers(): Promise<Profiles[]> {
  try {
    const response = await axiosInstance.get<Profiles[]>("/analysis/user/profiles/");
    return response.data;
  } catch (error) {
    const err = error as AxiosError
    console.error("Failed to fetch dossiers:", err.response?.data || err.message);
    throw error;
  }
}
