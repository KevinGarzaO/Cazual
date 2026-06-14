"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const providerServices = [
  "Acompañante",
  "Cenas",
  "Viajes",
  "Eventos",
  "Bienestar",
];

export default function RegistrationPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"solicitante" | "prestador">(
    "solicitante",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Registrar usuario en Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone,
            user_type: userType,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        // Redirigir a completar perfil con el tipo de usuario
        router.push(`/completar-perfil?type=${userType}&user=${data.user.id}`);
      }
    } catch (err) {
      setError("Error al crear la cuenta. Intenta de nuevo.");
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
                Registro
              </p>
              <h1 className="mt-1 text-3xl font-semibold leading-tight text-white">
                Crea tu cuenta
              </h1>
              <p className="mt-2 max-w-lg text-sm text-textSecondary">
                Elige tu rol y completa los datos para comenzar: solicita
                servicios o ofrece tu perfil premium.
              </p>
            </div>
            <div className="mx-auto inline-flex rounded-full border border-white/10 bg-black/60 p-1 text-sm">
              <button
                type="button"
                onClick={() => setUserType("solicitante")}
                className={`inline-flex items-center justify-center rounded-full px-4 py-2 font-semibold transition ${
                  userType === "solicitante"
                    ? "bg-premium text-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Solicitante
              </button>
              <button
                type="button"
                onClick={() => setUserType("prestador")}
                className={`inline-flex items-center justify-center rounded-full px-4 py-2 font-semibold transition ${
                  userType === "prestador"
                    ? "bg-premium text-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Prestador
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">
                  Nombre completo
                </span>
                <input
                  value={formData.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  required
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="Ej. Ana Sánchez"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">
                  Correo electrónico
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  required
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="correo@ejemplo.com"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Teléfono</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  required
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="+52 1 55 1234 5678"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Contraseña</span>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  required
                  className="w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium"
                  placeholder="********"
                />
              </label>
            </div>
          </div>

          {userType === "solicitante" ? null : (
            <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
              <p className="text-sm text-textSecondary">
                Completa los datos adicionales después de crear tu cuenta.
              </p>
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
                  Resumen
                </p>
                <p className="mt-2 text-sm text-textSecondary">
                  Completa tu registro para acceder a la experiencia segura y
                  premium.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-premium px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
