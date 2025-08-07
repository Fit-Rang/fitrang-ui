import { AxiosError } from "axios";
import axiosInstance from "../libs";

export interface Profiles {
  id: string;
  full_name: string;
  email?: string;
  created_at: string;
  updated_at: string;
  profile_picture_url: string;
}

interface ProfileResponse {
  profile: {
    id: string;
    full_name: string;
    email?: string;
    created_at: string;
    updated_at: string;
    profile_url: string;
  };
}

export default async function handleGetMyProfile(): Promise<Profiles> {
  try {
    const response = await axiosInstance.get<ProfileResponse>(`profile/profile`);
    const profile = response.data.profile;

    return {
      id: profile.id,
      full_name: profile.full_name,
      email: profile.email,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      profile_picture_url: profile.profile_url,
    };
  } catch (error) {
    const err = error as AxiosError;
    console.error("Failed to fetch profile:", err.response?.data || err.message);
    throw error;
  }
}


