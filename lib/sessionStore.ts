import { create } from "zustand";

interface SessionState {
  hasAccount: boolean;
  login: () => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  hasAccount: false,
  login: () => set({ hasAccount: true }),
  logout: () => set({ hasAccount: false }),
}));
