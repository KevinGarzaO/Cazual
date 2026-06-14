import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Cazual",
  description:
    "El espacio donde todo ocurre: conexiones, experiencias y comunidad.",
  metadataBase: new URL("https://www.cazual.com"),
  manifest: "/manifest.webmanifest",
  icons: [
    {
      rel: "icon",
      url: "/icon.svg",
    },
    {
      rel: "apple-touch-icon",
      url: "/icon.svg",
    },
  ],
  openGraph: {
    title: "Cazual",
    description:
      "Plataforma premium de descubrimiento, reputación y comunidad para adultos.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
};

import { BottomNav } from "@/components/BottomNav";
import { TopBar } from "@/components/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background">
        <Providers>
          <Suspense fallback={null}>
            <TopBar />
          </Suspense>
          <div className="pt-14 pb-24 sm:pb-28">{children}</div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
