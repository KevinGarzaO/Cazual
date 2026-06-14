import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import ProfileGallery from "@/components/ProfileGallery";
import PhysicalAndPersonality from "@/components/PhysicalAndPersonality";
import ReviewCard from "@/components/ReviewCard";
import Star from "@/components/StarFilled";
import FavoriteButton from "@/components/FavoriteButton";
import { getProfileBySlug, profiles } from "@/lib/profiles";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const profile = getProfileBySlug(params.slug);
  if (!profile) return notFound();

  const extraReviews = [
    "Muy profesional, estuvo atenta a cada detalle.",
    "Ambiente muy seguro y discreto, exactamente lo que buscaba.",
    "Servicio de primera, la ciudad se sintió mejor con ella.",
    "Volvería sin pensarlo, discreta y siempre elegante.",
  ];

  const reviews = [
    {
      id: "r0",
      title: "Review destacada",
      rating: profile.rating,
      text: "Exactamente como en las fotos, muy amable y atenta. Sin duda volveré a verla.",
      date: "20 May 2024 · 10:30",
    },
    ...extraReviews.map((t, i) => ({
      id: `r${i + 1}`,
      title: "Review destacada",
      rating: profile.rating,
      text: t,
      date: `20 May 2024 · 10:${30 + i}`,
    })),
  ];

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
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              className="object-cover"
            />
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

                  <div className="flex flex-col items-end gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-premium text-black">
                        <Star className="h-4 w-4" />
                      </span>
                      <span>{profile.rating.toFixed(1)}</span>
                      <span className="text-textSecondary">
                        {profile.reviews} reseñas
                      </span>
                    </div>
                    <FavoriteButton slug={profile.slug} compact={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div>
              <p className="text-base uppercase tracking-[0.5em] text-premium">
                Sobre {profile.name}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-textSecondary sm:text-base">
                {profile.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white transition hover:border-premium hover:bg-premium/10"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-base uppercase tracking-[0.5em] text-premium">
                  Servicios
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {profile.services.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-black/20 transition hover:border-premium hover:bg-premium/10"
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-premium text-black">
                        <Star className="h-4 w-4" />
                      </span>
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-base uppercase tracking-[0.5em] text-premium">
                  Lo que ofrece
                </p>
                <div className="mt-4 space-y-3 text-sm text-white">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-3 shadow-black/10 transition hover:bg-white/10">
                    Experiencias de alto nivel
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-3 shadow-black/10 transition hover:bg-white/10">
                    Acompañamiento discreto
                  </div>
                </div>
              </div>
            </div>

            <PhysicalAndPersonality
              measurements={profile.measurements}
              body={profile.body}
              personality={profile.personality}
              personalityDetails={profile.personalityDetails}
            />

            <ProfileGallery images={profile.gallery} name={profile.name} />

            <div>
              <p className="text-base uppercase tracking-[0.5em] text-premium">
                Resumen de reviews
              </p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <div>
                  <p className="text-xs text-textSecondary uppercase tracking-[0.15em]">
                    Resumen general
                  </p>
                  <p className="mt-2 text-sm text-white">
                    {(() => {
                      const combined = [
                        reviews[0]?.text,
                        ...extraReviews,
                      ].filter(Boolean);
                      return (
                        combined.join(" ").slice(0, 220) +
                        (combined.join(" ").length > 220 ? "…" : "")
                      );
                    })()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-textSecondary uppercase tracking-[0.15em]">
                    Lo destacado
                  </p>
                  <p className="mt-2 text-sm text-white">
                    {(() => {
                      const combined = [
                        reviews[0]?.text,
                        ...extraReviews,
                      ].filter(Boolean);
                      // Mostrar las oraciones iniciales más llamativas
                      const samples = combined
                        .map((t) => t.split(/\.|!|\?/)[0])
                        .filter(Boolean)
                        .slice(0, 2);
                      return samples.join(" — ") || "-";
                    })()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-textSecondary uppercase tracking-[0.15em]">
                    Lo positivo
                  </p>
                  <p className="mt-2 text-sm text-white">
                    {(() => {
                      const combined = [
                        reviews[0]?.text,
                        ...extraReviews,
                      ].filter(Boolean);
                      const positiveWords = [
                        "amable",
                        "discreta",
                        "profesional",
                        "excelente",
                        "atenta",
                        "primera",
                        "buena",
                        "mejor",
                        "volvería",
                        "volver",
                      ];
                      const positives = combined
                        .filter((t) =>
                          positiveWords.some((w) =>
                            t.toLowerCase().includes(w),
                          ),
                        )
                        .slice(0, 3);
                      return positives.length
                        ? positives.join(" — ")
                        : combined.slice(0, 2).join(" — ") || "-";
                    })()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-textSecondary uppercase tracking-[0.15em]">
                    Lo negativo
                  </p>
                  <p className="mt-2 text-sm text-white">
                    {(() => {
                      const combined = [
                        reviews[0]?.text,
                        ...extraReviews,
                      ].filter(Boolean);
                      const negativeWords = [
                        "tarde",
                        "mala",
                        "malo",
                        "incómodo",
                        "problema",
                        "nada",
                        "no volvería",
                        "no volver",
                      ];
                      const negatives = combined
                        .filter((t) =>
                          negativeWords.some((w) =>
                            t.toLowerCase().includes(w),
                          ),
                        )
                        .slice(0, 3);
                      return negatives.length
                        ? negatives.join(" — ")
                        : "No se reportan problemas relevantes.";
                    })()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-textSecondary uppercase tracking-[0.15em]">
                    Es recontratada
                  </p>
                  <p className="mt-2 text-sm text-white">
                    {(() => {
                      const combined = [reviews[0]?.text, ...extraReviews].join(
                        " ",
                      );
                      return /volver|recontrat|recontrar|volvería|recontratar/i.test(
                        combined,
                      )
                        ? "Sí — clientes mencionan que vuelven a contratarla."
                        : "No hay datos concluyentes.";
                    })()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base uppercase tracking-[0.5em] text-premium">
                    Reviews
                  </p>
                  <p className="mt-2 text-sm text-textSecondary">
                    Review destacada y opiniones recientes
                  </p>
                </div>
                <span className="inline-flex items-center h-8 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-semibold text-white mt-1">
                  {profile.reviews + 4} reviews
                </span>
              </div>

              <div className="space-y-4">
                {reviews.map((r) => (
                  <ReviewCard
                    key={r.id}
                    title={r.title}
                    rating={r.rating}
                    text={r.text}
                    date={r.date}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-textSecondary">
                <span>Última actualización: 20 May 2024</span>
                <span className="inline-flex items-center h-8 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-semibold text-white">
                  {profile.reviews + 4} reviews
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky bottom-4 left-0 right-0 z-20 mx-auto mt-6 flex w-full max-w-3xl justify-center px-4 sm:px-6">
          <button className="w-full rounded-full bg-premium px-6 py-4 text-sm font-semibold text-black shadow-xl shadow-premium/30 transition hover:brightness-105 sm:max-w-[420px]">
            Contactar
          </button>
        </div>
      </div>
    </main>
  );
}
