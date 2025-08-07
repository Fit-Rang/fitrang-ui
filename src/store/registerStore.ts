import { create } from "zustand";

interface RegisterUser {
  email: string;
  password: string;
  otp: string;
  firstName: string;
  lastName: string;
  setEmailAndPassword: (email: string, password: string, firstName: string, lastName: string) => void;
}

export const RegisterStore = create<RegisterUser>((set) => ({
  email: "",
  password: "",
  otp: "",
  firstName: "",
  lastName: "",
  setEmailAndPassword: (email, password, firstName, lastName) =>
    set({ email, password, firstName, lastName }),
}));

