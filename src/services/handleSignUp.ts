import axiosInstance from "../libs";

export default async function handleSignUp(email: string): Promise<string | null> {
  try {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return "Invalid email format.";
    }

    const response = await axiosInstance.post("register/email", { email });

    if (response.status === 200) {
      return null;
    } else {
      return "Something went wrong. Please try again.";
    }

  } catch (error: any) {
    if (error.response && error.response.data?.message) {
      return error.response.data.message;
    }
    return "Failed to sign up. Please try again later.";
  }
}

