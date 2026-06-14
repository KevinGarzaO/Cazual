"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/useFavoritesStore";

interface FavoriteButtonProps {
  slug: string;
  compact?: boolean;
}

export default function FavoriteButton({ slug, compact }: FavoriteButtonProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(slug);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(slug);
      }}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] transition focus:outline-none focus:ring-2 focus:ring-white/30 ${
        isFavorite
          ? "border-danger bg-danger/10 text-danger"
          : "border-white/10 bg-black/60 text-white hover:border-white/20"
      }`}
    >
      <Heart
        className={
          isFavorite ? "h-4 w-4 fill-current text-danger" : "h-4 w-4 text-white"
        }
      />
      {!compact && (isFavorite ? "Favorito" : "Guardar")}
    </button>
  );
}
