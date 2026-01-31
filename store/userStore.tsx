import { User } from "@/types/gqlReactTypings.generated";
import { create } from "zustand";

interface UserStoreState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
}));
