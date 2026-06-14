import { ProfileCarousel } from "@/components/ProfileCarousel";
import { profiles } from "@/lib/profiles";

export function ExploreContent() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-premium">
            Explorar
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Perfiles premium a tu alcance
          </h1>
          <p className="max-w-2xl text-sm text-textSecondary sm:text-base">
            Descubre perfiles verificados, guarda tus favoritos y chatea con la
            persona que más te interese.
          </p>
        </div>

        <ProfileCarousel profiles={profiles} />
      </div>
    </main>
  );
}
