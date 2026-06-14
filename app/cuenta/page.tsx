import Link from "next/link";
import { ShieldCheck, Settings, CreditCard, Bell, User } from "lucide-react";

export default function AccountPage() {
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
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-premium text-black">
                <User className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xl font-semibold text-white">
                  Perfil personal
                </p>
                <p className="mt-1 text-sm text-textSecondary">
                  Administra tu info y visibilidad
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-textSecondary">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/40 px-4 py-3">
                Nombre de usuario:{" "}
                <span className="font-semibold text-white">Invitado</span>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/40 px-4 py-3">
                Estado: <span className="font-semibold text-white">Activo</span>
              </div>
            </div>
            <Link
              href="#"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <Settings className="h-4 w-4" />
              Editar perfil
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow xl:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3 text-white">
                  <Bell className="h-5 w-5 text-premium" />
                  <p className="font-semibold">Notificaciones</p>
                </div>
                <p className="mt-3 text-sm text-textSecondary">
                  Activa alertas para nuevos mensajes, coincidencias y
                  promociones.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3 text-white">
                  <ShieldCheck className="h-5 w-5 text-premium" />
                  <p className="font-semibold">Seguridad</p>
                </div>
                <p className="mt-3 text-sm text-textSecondary">
                  Ajusta tu privacidad y controla quién puede ver tu perfil.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3 text-white">
                  <CreditCard className="h-5 w-5 text-premium" />
                  <p className="font-semibold">Método de pago</p>
                </div>
                <p className="mt-3 text-sm text-textSecondary">
                  Añade o actualiza tu método de pago para reservar servicios
                  con facilidad.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/40 p-5">
                <div className="flex items-center gap-3 text-white">
                  <User className="h-5 w-5 text-premium" />
                  <p className="font-semibold">Preferencias</p>
                </div>
                <p className="mt-3 text-sm text-textSecondary">
                  Configura tus gustos, ubicación y tipo de experiencias
                  preferidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
