import { create } from "zustand";

type SessionUiState = {
  hasHydrated: boolean;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  setHydrated: (value: boolean) => void;
};

export const useSessionStore = create<SessionUiState>((set) => ({
  hasHydrated: false,
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setHydrated: (value) => set({ hasHydrated: value }),
}));
