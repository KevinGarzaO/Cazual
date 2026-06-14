"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLocalStorageProfiles, type Profile } from "@/lib/profiles";
import FavoriteButton from "@/components/FavoriteButton";
import ContactButton from "@/components/ContactButton";

interface Props {
  slug: string;
}

export default function UserProfileFallback({ slug }: Props) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const all = getLocalStorageProfiles();
    const found = all.find((p) => p.slug === slug);
    if (found) setProfile(found);
  }, [slug]);

  if (!profile) {
    return (
      <main className="min-h-screen bg-background text-text">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:px-6">
          <p className="text-xl text-textSecondary">Perfil no encontrado</p>
          <Link href="/" className="mt-4 inline-flex text-premium underline">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-textSecondary transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>

        <section className="mt-4 overflow-hidden rounded-[3rem] border border-white/10 bg-card/70 shadow-glow">
          <div className="relative h-[520px] sm:h-[620px]">
            {profile.image ? (
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-800 text-textSecondary">
                Sin foto
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

            <div className="absolute inset-x-6 bottom-6">
              <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-black/80 p-4 shadow-2xl shadow-black/40">
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-3xl font-semibold text-white sm:text-4xl">
                      {profile.name}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.35em] text-textSecondary sm:text-sm">
                      {profile.location}
                    </p>
                  </div>
                  <FavoriteButton slug={profile.slug} compact={false} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div>
              <p className="text-base uppercase tracking-[0.35em] text-premium">
                Sobre {profile.name}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-textSecondary sm:text-base">
                {profile.description || "Sin descripción"}
              </p>

              {profile.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {profile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {profile.services.length > 0 && (
              <div>
                <p className="text-base uppercase tracking-[0.35em] text-premium">
                  Servicios
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {profile.services.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-black/20"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="sticky bottom-20 left-0 right-0 z-20 mx-auto mt-6 flex w-full max-w-3xl justify-center px-4 sm:bottom-24 sm:px-6">
          <ContactButton slug={profile.slug} />
        </div>
      </div>
    </main>
  );
}
