"use client";

import { ProfileCard } from "@/components/ProfileCard";
import { useAllProfiles } from "@/lib/useAllProfiles";

export default function ExplorePage() {
  const allProfiles = useAllProfiles();
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-premium">
            Explorar
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Todos los perfiles
          </h1>
          <p className="max-w-2xl text-sm text-textSecondary sm:text-base">
            Descubre perfiles verificados con fotos reales, reputación de
            confianza y contacto seguro.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {allProfiles.map((profile) => (
            <ProfileCard key={profile.slug} {...profile} />
          ))}
        </div>
      </div>
    </main>
  );
}
