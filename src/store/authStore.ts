import { create } from 'zustand';

interface AuthState {
  socketID: string;
  isAuthenticated: boolean;
  setAuthenticated: () => void;
  setSocketID: (id: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  socketID: '',

  isAuthenticated: false,

  setAuthenticated: () => {
    set({ isAuthenticated: true });
  },

  setSocketID: (id: string) => {
    set({ socketID: id });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token_expiry');
    localStorage.removeItem('refresh_token_expiry');
    localStorage.removeItem('token_type');
    set({ isAuthenticated: false, socketID: '' });
  },
}));

