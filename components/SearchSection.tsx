import { Search, MapPin, Star, Filter } from "lucide-react";

export function SearchSection() {
  return (
    <section className="glass-card mt-6 rounded-[2rem] border border-white/10 bg-black/60 p-5 shadow-glow backdrop-blur-xl">
      <div className="flex justify-end">
        <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-text transition hover:bg-white/10">
          <Filter className="h-4 w-4" />
          Filtros
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1.5fr_auto]">
        <div className="flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-black/50 p-4 text-sm text-white/80">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/80">
            <MapPin className="h-4 w-4 text-premium" />
            Monterrey, NL
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/80">
            <Star className="h-4 w-4 text-premium" />
            Todas las categorías
          </div>
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-premium px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110">
          <Search className="h-4 w-4" />
          Buscar perfiles
        </button>
      </div>
    </section>
  );
}
