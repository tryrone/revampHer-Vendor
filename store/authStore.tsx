import { getAccessToken, removeAllLocalItems, setAccessToken } from "@/storage";
import { create } from "zustand";

interface AuthStoreState {
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  setToken: (token: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  initializeAuth: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isInitialized: false,

  setToken: (token) => set({ token }),

  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await getAccessToken();
      const isLoggedIn = !!token;
      set({
        token,
        isLoggedIn,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      set({
        token: null,
        isLoggedIn: false,
        isLoading: false,
        isInitialized: true,
      });
    }
  },

  login: async (token: string) => {
    set({ isLoading: true });
    try {
      await setAccessToken(token);
      set({
        token,
        isLoggedIn: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to login:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await removeAllLocalItems();
      set({
        token: null,
        isLoggedIn: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to logout:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  clearAuth: () => {
    set({
      token: null,
      isLoggedIn: false,
      isLoading: false,
    });
  },
}));
