"use client";

import { useMemo } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { useAllProfiles } from "@/lib/profiles";
import { useFavoritesStore } from "@/lib/useFavoritesStore";
import Link from "next/link";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  const allProfiles = useAllProfiles();
  const favoriteProfiles = useMemo(
    () => allProfiles.filter((profile) => favorites.includes(profile.slug)),
    [allProfiles, favorites],
  );

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-premium">
            Favoritos
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Perfiles guardados
          </h1>
          <p className="max-w-2xl text-sm text-textSecondary sm:text-base">
            Revisa tus perfiles favoritos y accede rápidamente a sus páginas.
          </p>
        </div>

        {favoriteProfiles.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-8 text-center text-textSecondary shadow-glow">
            <p className="mb-4 text-xl text-white">Aún no tienes favoritos</p>
            <Link
              href="/explorar"
              className="inline-flex rounded-full bg-premium px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Explorar perfiles
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {favoriteProfiles.map((profile) => (
              <ProfileCard key={profile.slug} {...profile} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
