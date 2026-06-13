import { ProfileCard } from "@/components/ProfileCard";
import { profiles as defaultProfiles, Profile } from "@/lib/profiles";

interface ProfileCarouselProps {
  title?: string;
  profiles?: Profile[];
}

export function ProfileCarousel({
  title,
  profiles = defaultProfiles,
}: ProfileCarouselProps) {
  return (
    <section className="space-y-6">
      {title ? (
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-textSecondary">
            Destacadas en Monterrey
          </p>
          <h2 className="mt-1 text-3xl font-semibold">{title}</h2>
        </div>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {profiles.map((profile) => (
          <ProfileCard key={profile.slug} {...profile} />
        ))}
      </div>
    </section>
  );
}
