import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (slug: string) =>
        set((state) => {
          const exists = state.favorites.includes(slug);
          return {
            favorites: exists
              ? state.favorites.filter((value) => value !== slug)
              : [...state.favorites, slug],
          };
        }),
      isFavorite: (slug: string) => get().favorites.includes(slug),
    }),
    {
      name: "cazual-favorites",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : (undefined as unknown as Storage),
      ),
    },
  ),
);
