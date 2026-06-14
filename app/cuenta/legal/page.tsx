"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, Cookie, FileSignature } from "lucide-react";
import { legalDocs } from "@/lib/legal-docs";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  FileText,
  Cookie,
  FileSignature,
};

export default function LegalPage() {
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
            Legal
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Documentos legales
          </h1>
          <p className="max-w-2xl text-sm text-textSecondary sm:text-base">
            Consulta nuestras políticas, términos y condiciones de la plataforma.
          </p>
        </div>

        <div className="space-y-4">
          {legalDocs.map((doc) => {
            const Icon = iconMap[doc.icon] || FileText;
            return (
              <Link
                key={doc.slug}
                href={`/cuenta/legal/${doc.slug}`}
                className="flex items-center gap-4 rounded-[2rem] border border-white/10 bg-card/80 p-5 shadow-glow transition hover:border-premium/30 hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-premium/15">
                  <Icon className="h-5 w-5 text-premium" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{doc.title}</p>
                  <p className="mt-1 text-sm text-textSecondary">{doc.description}</p>
                  <p className="mt-1 text-xs text-textSecondary/60">Actualizado: {doc.updatedAt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
