import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80";

const searchChips = ["Monterrey, NL", "Todas las categorías"];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-card/70 shadow-glow">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/95" />
      </div>

      <div className="relative px-6 py-10 sm:px-10 sm:py-14">
        <div className="max-w-3xl space-y-6 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80">
            <Sparkles className="h-4 w-4 text-premium" />
            Encuentros reales
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Perfiles verificados. Experiencias premium.
            </h1>
            <p className="max-w-2xl text-base text-textSecondary sm:text-lg">
              Encuentra mujeres con fotos verificadas, reputación de confianza y
              contacto seguro.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/explorar"
              className="inline-flex items-center justify-center rounded-full bg-premium px-7 py-3 text-sm font-semibold text-black shadow-xl shadow-premium/20 transition hover:brightness-110"
            >
              Explorar perfiles
            </Link>
            <Link
              href="/registro"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Crear perfil
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {searchChips.map((chip) => (
              <button
                key={chip}
                className="rounded-full border border-white/10 bg-black/40 px-5 py-3 text-left text-sm font-semibold text-white shadow-inner shadow-black/20 transition hover:bg-white/5"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
