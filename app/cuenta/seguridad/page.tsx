"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  userId: string;
}

export default function SeguridadPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", newPassword: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("cazual_session");
    if (raw) {
      try {
        const session = JSON.parse(raw);
        const uid = session.state?.userId;
        if (uid) {
          setUserId(uid);
          const userRaw = localStorage.getItem(`cazual_user_${uid}`);
          if (userRaw) {
            const userData: UserData = JSON.parse(userRaw);
            setForm((prev) => ({ ...prev, name: userData.name, email: userData.email, phone: userData.phone, password: userData.password }));
          }
        }
      } catch {}
    }
  }, []);

  const handleSave = () => {
    setSaving(true);
    setError("");
    setSaved(false);

    if (!userId) {
      setError("Sesión no encontrada");
      setSaving(false);
      return;
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("Las contraseñas nuevas no coinciden");
      setSaving(false);
      return;
    }

    if (form.newPassword && form.newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setSaving(false);
      return;
    }

    try {
      const existing: UserData = JSON.parse(localStorage.getItem(`cazual_user_${userId}`) || "{}");
      const updated: UserData = {
        ...existing,
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.newPassword || form.password,
      };
      localStorage.setItem(`cazual_user_${userId}`, JSON.stringify(updated));

      if (form.newPassword) {
        setForm((prev) => ({ ...prev, password: form.newPassword, newPassword: "", confirmPassword: "" }));
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Error al guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium";

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          href="/cuenta"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-textSecondary transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a Cuenta
        </Link>

        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-premium">
            Seguridad
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Datos de la cuenta
          </h1>
          <p className="max-w-2xl text-sm text-textSecondary sm:text-base">
            Actualiza tu información personal y cambia tu contraseña.
          </p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          className="space-y-6"
        >
          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-5 w-5 text-premium" />
              <p className="font-semibold text-white">Información personal</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Nombre completo</span>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="Tu nombre" />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Correo electrónico</span>
                <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} placeholder="correo@ejemplo.com" />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Teléfono</span>
                <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputClass} placeholder="+52 1 55 1234 5678" />
              </label>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-5 w-5 text-premium" />
              <p className="font-semibold text-white">Cambiar contraseña</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Contraseña actual</span>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className={inputClass + " pr-10"} placeholder="********" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-semibold text-white">Nueva contraseña</span>
                <div className="relative">
                  <input type={showNewPw ? "text" : "password"} value={form.newPassword} onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))} className={inputClass + " pr-10"} placeholder="Nueva contraseña" />
                  <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary">
                    {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
              <label className="space-y-2 text-sm sm:col-span-2">
                <span className="font-semibold text-white">Confirmar nueva contraseña</span>
                <input type="password" value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} className={inputClass} placeholder="Repite la nueva contraseña" />
              </label>
            </div>
          </div>

          {error && (
            <div className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-premium px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
          >
            {saving ? "Guardando..." : saved ? "Guardado ✓" : "Guardar cambios"}
          </button>
        </form>
      </div>
    </main>
  );
}
