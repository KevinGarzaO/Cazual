import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Star } from "lucide-react";

interface ProfileCardProps {
  slug: string;
  name: string;
  age: number;
  city: string;
  score: number;
  tags: string[];
  image: string;
}

export function ProfileCard({
  slug,
  name,
  age,
  city,
  score,
  tags,
  image,
}: ProfileCardProps) {
  return (
    <Link
      href={`/profile/${slug}`}
      className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-card/80 shadow-glow transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative h-72 overflow-hidden rounded-t-[2rem]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-xs uppercase tracking-[0.25em] text-white">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          Verificado
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {name}, {age}
            </h3>
            <p className="text-sm text-textSecondary">{city}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-premium px-3 py-1 text-sm font-semibold text-black">
            <Star className="h-4 w-4" /> {score}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-textSecondary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm text-textSecondary">
          <Heart className="h-4 w-4 text-danger" />
          <span>Contacto premium</span>
        </div>
      </div>
    </Link>
  );
}
