"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSessionStore } from "@/lib/sessionStore";
import { ShieldCheck, Bell, User, FileText } from "lucide-react";

function calcAge(birthDate: string): number {
  if (!birthDate) return 0;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export default function AccountPage() {
  const router = useRouter();
  const { hasAccount, userId, userType, hydrated, hydrate, logout } = useSessionStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  const userData = useMemo(() => {
    if (!userId) return null;
    const raw = localStorage.getItem(`cazual_user_${userId}`);
    return raw ? JSON.parse(raw) : null;
  }, [userId]);

  const profileData = useMemo(() => {
    if (!userId) return null;
    const raw = localStorage.getItem(`cazual_profile_${userId}`);
    return raw ? JSON.parse(raw) : null;
  }, [userId]);

  if (!hasAccount || !userData) {
    return (
      <main className="min-h-screen bg-background text-text">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-premium">
              Mi cuenta
            </p>
            <h1 className="text-4xl font-semibold text-white">
              Inicia sesión
            </h1>
            <p className="max-w-2xl text-sm text-textSecondary sm:text-base">
              Crea una cuenta o inicia sesión para acceder a tu perfil.
            </p>
          </div>
          <button
            onClick={() => router.push("/registro")}
            className="inline-flex rounded-full bg-premium px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Crear cuenta
          </button>
        </div>
      </main>
    );
  }

  const profileComplete = !!profileData?.city;

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-premium">
            Mi cuenta
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Configuración personal
          </h1>
          <p className="max-w-2xl text-sm text-textSecondary sm:text-base">
            Administra tu perfil, notificaciones y preferencias desde aquí.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-premium bg-black/50">
                {profileData?.image ? (
                  <img src={profileData.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-premium text-black">
                    <User className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-xl font-semibold text-white">
                  {profileData?.name || userData.name}
                </p>
                <p className="mt-1 text-sm text-textSecondary">
                  {userType === "prestador" ? "Prestador" : "Solicitante"}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-textSecondary">
              <div className="rounded-[2rem] border border-white/10 bg-black/40 px-4 py-3">
                Nombre: <span className="font-semibold text-white">{userData.name}</span>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-black/40 px-4 py-3">
                Email: <span className="font-semibold text-white">{userData.email}</span>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-black/40 px-4 py-3">
                Teléfono: <span className="font-semibold text-white">{userData.phone}</span>
              </div>
              {profileData?.city && (
                <div className="rounded-[2rem] border border-white/10 bg-black/40 px-4 py-3">
                  Ciudad: <span className="font-semibold text-white">{profileData.city}</span>
                </div>
              )}
              {profileData?.birthDate && (
                <div className="rounded-[2rem] border border-white/10 bg-black/40 px-4 py-3">
                  Edad: <span className="font-semibold text-white">{calcAge(profileData.birthDate)}</span> años
                </div>
              )}
            </div>

            {!profileComplete ? (
              <button
                onClick={() => router.push(`/completar-perfil?type=${userType}&userId=${userId}`)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-premium px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110"
              >
                Completar perfil
              </button>
            ) : (
              <button
                onClick={() => router.push(`/completar-perfil?type=${userType}&userId=${userId}`)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Editar perfil
              </button>
            )}

            <button
              onClick={() => { logout(); router.push("/"); }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-500/20 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/30"
            >
              Cerrar sesión
            </button>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow xl:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/cuenta/notificaciones" className="block rounded-[2rem] border border-white/10 bg-black/40 p-5 transition hover:bg-white/5 hover:border-premium/30">
                <div className="flex items-center gap-3 text-white">
                  <Bell className="h-5 w-5 text-premium" />
                  <p className="font-semibold">Notificaciones</p>
                </div>
                <p className="mt-3 text-sm text-textSecondary">
                  Activa alertas para nuevos mensajes, coincidencias y promociones.
                </p>
              </Link>
              <Link href="/cuenta/seguridad" className="block rounded-[2rem] border border-white/10 bg-black/40 p-5 transition hover:bg-white/5 hover:border-premium/30">
                <div className="flex items-center gap-3 text-white">
                  <ShieldCheck className="h-5 w-5 text-premium" />
                  <p className="font-semibold">Seguridad</p>
                </div>
                <p className="mt-3 text-sm text-textSecondary">
                  Ajusta tu privacidad y controla quién puede ver tu perfil.
                </p>
              </Link>
            </div>

            <Link
              href="/cuenta/legal"
              className="mt-4 flex items-center gap-4 rounded-[2rem] border border-white/10 bg-black/40 p-5 transition hover:bg-white/5 hover:border-premium/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-premium/15">
                <FileText className="h-5 w-5 text-premium" />
              </div>
              <div>
                <p className="font-semibold text-white">Legal</p>
                <p className="mt-1 text-sm text-textSecondary">
                  Políticas de privacidad, cookies, términos y condiciones
                </p>
              </div>
            </Link>

            {profileComplete && userType === "prestador" && (
              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold text-white">Vista previa de tu perfil</p>
                <div className="rounded-[2rem] border border-white/10 bg-black/40 p-5">
                  {profileData.description && (
                    <p className="text-sm text-textSecondary mb-3">{profileData.description}</p>
                  )}
                  {profileData.services?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {profileData.services.map((s: string) => (
                        <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
