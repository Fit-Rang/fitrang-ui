import { AxiosError } from "axios";
import axiosInstance from "../libs";
import type { Profiles } from "./handleGetProfile";

export default async function handleUpdateMyProfile(formData: FormData): Promise<Profiles> {
  try {
    const response = await axiosInstance.post("/profile/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
    console.error("Failed to update profile:", err.response?.data || err.message);
    throw error;
  }
}

