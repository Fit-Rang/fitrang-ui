import axiosInstance from "../libs";

export async function handleGetSessionId(): Promise<string | null> {
  try {
    const response = await axiosInstance.get('/notification/conn/ws-session/');
    return response.data.session_id ?? null;
  } catch (error) {
    console.error("Failed to fetch session ID:", error);
    return null;
  }
}

