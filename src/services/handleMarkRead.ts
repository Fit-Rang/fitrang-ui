import axiosInstance from "../libs/axiosInstance";

export default async function handleMarkRead(id: string): Promise<any> {
  try {
    const response = await axiosInstance.patch(`notification/store/messages/${id}/read/`);
    return response.data;
  } catch (error) {
    console.error("Failed to grant dossier access:", error);
    throw error;
  }
}

