"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const providerServices = [
  "Acompañante",
  "Cenas",
  "Viajes",
  "Eventos",
  "Bienestar",
];

export default function CompletarPerfilPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = (searchParams.get("type") || "solicitante") as
    | "solicitante"
    | "prestador";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    city: "",
    age: "",
    preferences: "",
    description: "",
    services: [] as string[],
    languages: "",
  });

  const selectedServices = useMemo(
    () => new Set(formData.services),
    [formData.services],
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((value) => value !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Usuario no autenticado");
        return;
      }

      // Guardar información adicional del perfil
      const profileData = {
        user_id: user.id,
        user_type: userType,
        city: formData.city,
        age: formData.age || null,
        ...(userType === "solicitante"
          ? { preferences: formData.preferences }
          : {
              description: formData.description,
              services: formData.services,
              languages: formData.languages,
            }),
      };

      // Aquí insertarías en una tabla de perfiles en Supabase
      // Por ahora, simularemos guardando en localStorage
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData));

      // Redirigir al home
      router.push("/");
    } catch (err) {
      setError("Error al guardar el perfil. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-text pb-24 sm:pb-28">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-card/80 p-4 shadow-glow">
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-premium">
                Completar Perfil
              </p>
              <h1 className="mt-1 text-3xl font-semibold leading-tight text-white">
                {userType === "solicitante"
                  ? "¿Qué buscas?"
                  : "Tu Perfil Profesional"}
              </h1>
              <p className="mt-2 max-w-lg text-sm text-textSecondary">
                {userType === "solicitante"
                  ? "Cuéntanos qué tipo de servicios buscas y dónde estás ubicado."
                  : "Presenta tu estilo, experiencia y los servicios que ofreces."}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Campos comunes */}
          <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Ciudad</span>
                <input
                  value={formData.city}
                  onChange={(event) => handleChange("city", event.target.value)}
                  required
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="Monterrey"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Edad</span>
                <input
                  type="number"
                  min={18}
                  value={formData.age}
                  onChange={(event) => handleChange("age", event.target.value)}
                  required
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="28"
                />
              </label>
            </div>
          </div>

          {/* Campos específicos por tipo de usuario */}
          {userType === "solicitante" ? (
            <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-white">¿Qué buscas?</p>
                <textarea
                  value={formData.preferences}
                  onChange={(event) =>
                    handleChange("preferences", event.target.value)
                  }
                  rows={5}
                  required
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="Describe tus preferencias, tipo de servicio y ambiente deseado"
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-white">
                  Descripción profesional
                </p>
                <textarea
                  value={formData.description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                  rows={5}
                  required
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="Presenta tu estilo, experiencia y lo que ofreces"
                />
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-semibold text-white">
                  Servicios disponibles
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {providerServices.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedServices.has(service)
                          ? "border-premium bg-premium/15 text-white"
                          : "border-white/10 bg-black/50 text-textSecondary hover:border-white/20"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-semibold text-white">Idiomas</p>
                <input
                  value={formData.languages}
                  onChange={(event) =>
                    handleChange("languages", event.target.value)
                  }
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="Ej. Español, Inglés"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-premium">
                  Finalizar
                </p>
                <p className="mt-2 text-sm text-textSecondary">
                  Completa tu perfil para comenzar a usar la plataforma.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-premium px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Guardando..." : "Completar Perfil"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
