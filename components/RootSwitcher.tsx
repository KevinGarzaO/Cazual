"use client";

import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { ExploreContent } from "@/components/ExploreContent";
import { ProfileCarousel } from "@/components/ProfileCarousel";
import { profiles } from "@/lib/profiles";
import { useSessionStore } from "@/lib/sessionStore";

export default function RootSwitcher() {
  const { hasAccount, login, logout } = useSessionStore();

  if (hasAccount) {
    return <ExploreContent />;
  }

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <HomeHero />

        <section className="mt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Mejor calificadas</h2>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-text transition hover:bg-white/10">
              Ver todas
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 pt-2">
            {profiles.slice(0, 4).map((profile) => (
              <Link
                key={profile.slug}
                href={`/profile/${profile.slug}`}
                className="min-w-[160px] flex-shrink-0 text-center"
              >
                <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-yellow-400/80 p-1 shadow-[0_0_0_2px_rgba(255,255,255,0.08)]">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-sm font-bold text-black shadow-lg">
                    ★
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-white">
                  {profile.name}
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-textSecondary">
                  {profile.city}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-14">
          <ProfileCarousel
            title="Perfiles destacados"
            profiles={profiles.slice(0, 4)}
          />
        </div>
      </div>
    </main>
  );
}
