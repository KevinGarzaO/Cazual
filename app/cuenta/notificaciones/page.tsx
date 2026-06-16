"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, MessageCircle, Heart, Sparkles } from "lucide-react";
import { useToast } from "@/components/Toast";

interface NotificationSettings {
  messages: boolean;
  matches: boolean;
  promotions: boolean;
  favorites: boolean;
}

const defaultSettings: NotificationSettings = {
  messages: true,
  matches: true,
  promotions: false,
  favorites: true,
};

export default function NotificacionesPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("cazual_notification_settings");
    if (raw) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(raw) });
      } catch {}
    }
  }, []);

  const toggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("cazual_notification_settings", JSON.stringify(settings));
    setSaved(true);
    toast("Configuración guardada", "success");
    setTimeout(() => setSaved(false), 2000);
  };

  const toggles: { key: keyof NotificationSettings; label: string; description: string; icon: typeof Bell }[] = [
    { key: "messages", label: "Nuevos mensajes", description: "Recibe una alerta cuando te envíen un mensaje", icon: MessageCircle },
    { key: "matches", label: "Coincidencias", description: "Notifícame cuando alguien coincida con mi perfil", icon: Sparkles },
    { key: "favorites", label: "Favoritos", description: "Alerta cuando alguien agregue tu perfil a favoritos", icon: Heart },
    { key: "promotions", label: "Promociones", description: "Recibe ofertas especiales y novedades de la plataforma", icon: Bell },
  ];

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
            Notificaciones
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Configuración de notificaciones
          </h1>
          <p className="max-w-2xl text-sm text-textSecondary sm:text-base">
            Activa o desactiva las alertas que quieres recibir.
          </p>
        </div>

        <div className="space-y-4">
          {toggles.map(({ key, label, description, icon: Icon }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className="flex w-full items-center justify-between rounded-[2rem] border border-white/10 bg-card/80 p-5 text-left shadow-glow transition hover:border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-premium/15">
                  <Icon className="h-5 w-5 text-premium" />
                </div>
                <div>
                  <p className="font-semibold text-white">{label}</p>
                  <p className="mt-1 text-sm text-textSecondary">{description}</p>
                </div>
              </div>
              <div
                className={`relative h-7 w-12 rounded-full transition ${
                  settings[key] ? "bg-premium" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition ${
                    settings[key] ? "right-0.5" : "left-0.5"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full rounded-full bg-premium px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
          >
            {saved ? "Guardado ✓" : "Guardar configuración"}
          </button>
        </div>
      </div>
    </main>
  );
}
