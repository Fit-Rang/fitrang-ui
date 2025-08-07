import axiosInstance from "../libs";
import type { LoginCard } from "@model/profile";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  scope: string;
  [key: string]: any;
}

export default async function handleLogin(data: LoginCard): Promise<string | null> {
  try {
    const formData = new URLSearchParams();
    formData.append("username", data.email);
    formData.append("password", data.password);

    const response = await axiosInstance.post<LoginResponse>(
      "/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const {
      access_token,
      refresh_token,
      expires_in,
      refresh_expires_in,
      token_type,
    } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("access_token_expiry", (Date.now() + expires_in * 1000).toString());
    localStorage.setItem("refresh_token_expiry", (Date.now() + refresh_expires_in * 1000).toString());
    localStorage.setItem("token_type", token_type);

    return null;
  } catch (error: any) {
    if (error.response?.data?.error_description) {
      return error.response.data.error_description;
    }
    return "Login failed. Please try again.";
  }
}


