import { AxiosError } from "axios";
import axiosInstance from "../libs";

export interface Notifications {
  id: number;
  owner: string;
  sender_name: string;
  text: string;
  type: "request" | "message";
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export default async function handleGetNotifications(): Promise<
  Notifications[]
> {
  try {
    const response = await axiosInstance.get<Notifications[]>(
      "notification/store/messages/user/"
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "Failed to fetch dossiers:",
      err.response?.data || err.message
    );
    throw error;
  }
}
