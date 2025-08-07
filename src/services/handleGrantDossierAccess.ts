import axiosInstance from "../libs/axiosInstance";

export default async function handleGrantDossierAccess(id: string): Promise<any> {
  try {
    const response = await axiosInstance.post("profile/grant-access", {
      target_id: id,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to grant dossier access:", error);
    throw error;
  }
}
