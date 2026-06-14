"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Explorar",
  "/explorar": "Explorar",
  "/favoritos": "Favoritos",
  "/mensajes": "Mensajes",
  "/cuenta": "Cuenta",
  "/registro": "Registro",
  "/completar-perfil": "Completar Perfil",
};

export function TopBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inChat = pathname === "/mensajes" && searchParams?.has("chat");
  const inProfile = pathname.startsWith("/profile/");
  const inLegalDoc =
    pathname.startsWith("/cuenta/legal/") && pathname !== "/cuenta/legal";
  const inSubSettings =
    pathname.startsWith("/cuenta/notificaciones") ||
    pathname.startsWith("/cuenta/seguridad") ||
    pathname.startsWith("/cuenta/legal");

  if (inChat || inProfile) return null;

  let backHref = "/";
  let title = "";

  if (pathname === "/explorar") {
    backHref = "/";
    title = "Explorar";
  } else if (pathname === "/favoritos") {
    backHref = "/";
    title = "Favoritos";
  } else if (pathname === "/mensajes") {
    title = "Mensajes";
  } else if (pathname === "/cuenta") {
    title = "Cuenta";
  } else if (pathname === "/registro") {
    backHref = "/";
    title = "Registro";
  } else if (pathname === "/completar-perfil") {
    backHref = "/registro";
    title = "Completar Perfil";
  } else if (pathname === "/cuenta/notificaciones") {
    backHref = "/cuenta";
    title = "Notificaciones";
  } else if (pathname === "/cuenta/seguridad") {
    backHref = "/cuenta";
    title = "Seguridad";
  } else if (pathname === "/cuenta/legal") {
    backHref = "/cuenta";
    title = "Legal";
  } else if (inLegalDoc) {
    backHref = "/cuenta/legal";
    title = "";
  } else {
    title = pageTitles[pathname] || "";
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {backHref && title && (
            <Link
              href={backHref}
              className="rounded-full p-1.5 text-textSecondary transition hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-premium" />
            <span className="text-lg font-bold tracking-tight text-white">
              Cazual
            </span>
          </Link>
        </div>

        {title && (
          <span className="text-sm font-semibold text-textSecondary">
            {title}
          </span>
        )}
      </div>
    </header>
  );
}
