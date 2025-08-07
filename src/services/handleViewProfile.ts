import { AxiosError } from "axios";
import axiosInstance from "../libs";

export interface PublicProfile {
  id: string;
  full_name: string;
  email?: string;
  created_at: string;
  updated_at: string;
  has_access: boolean;
  profile_picture_url: string;
}

interface ProfileResponse {
  profile: {
    id: string;
    full_name: string;
    email?: string;
    created_at: string;
    updated_at: string;
    has_access: boolean;
    profile_url: string;
  };
}

export default async function handleViewProfile(id: string): Promise<PublicProfile> {
  try {
    const response = await axiosInstance.get<ProfileResponse>(`profile/profile/${id}`);
    const profile = response.data.profile;

    return {
      id: profile.id,
      full_name: profile.full_name,
      email: profile.email,
      has_access: profile.has_access === true || profile.has_access === "true",
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

