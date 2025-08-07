import axiosInstance from "../libs";

export default async function handleSendAccessRequest(targetID: string) {
  try {
    const response = await axiosInstance.post("profile/dossier-access/", {
      target_id: targetID,
    });
    return response.status;
  } catch (error) {
    console.error("Failed to send access request:", error);
    throw error;
  }
}


