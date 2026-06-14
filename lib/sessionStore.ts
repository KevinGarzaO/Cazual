import { create } from "zustand";

interface SessionState {
  hasAccount: boolean;
  userId: string | null;
  userType: "solicitante" | "prestador" | null;
  hydrated: boolean;
  hydrate: () => void;
  login: (id: string, type: "solicitante" | "prestador") => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  hasAccount: false,
  userId: null,
  userType: null,
  hydrated: false,
  hydrate: () => {
    const stored = JSON.parse(localStorage.getItem("cazual_session") || "null");
    set({
      hasAccount: stored?.hasAccount ?? false,
      userId: stored?.userId ?? null,
      userType: stored?.userType ?? null,
      hydrated: true,
    });
  },
  login: (id, type) => {
    const session = { hasAccount: true, userId: id, userType: type };
    localStorage.setItem("cazual_session", JSON.stringify(session));
    set(session);
  },
  logout: () => {
    localStorage.removeItem("cazual_session");
    set({ hasAccount: false, userId: null, userType: null });
  },
}));
