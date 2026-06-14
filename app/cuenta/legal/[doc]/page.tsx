"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLegalDoc, legalDocs } from "@/lib/legal-docs";
import { ShieldCheck, FileText, Cookie, FileSignature } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  FileText,
  Cookie,
  FileSignature,
};

export default function LegalDocPage() {
  const params = useParams();
  const slug = params.doc as string;
  const doc = getLegalDoc(slug);

  if (!doc) {
    return (
      <main className="min-h-screen bg-background text-text">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:px-6">
          <p className="text-xl text-textSecondary">Documento no encontrado</p>
          <Link href="/cuenta/legal" className="mt-4 inline-flex text-premium underline">
            Volver a documentos legales
          </Link>
        </div>
      </main>
    );
  }

  const Icon = iconMap[doc.icon] || FileText;

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          href="/cuenta/legal"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-textSecondary transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a documentos legales
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow sm:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-premium/15">
              <Icon className="h-5 w-5 text-premium" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">{doc.title}</h1>
              <p className="mt-1 text-sm text-textSecondary">
                Actualizado: {doc.updatedAt}
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            {doc.content.split("\n\n").map((block, i) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.match(/^\d+\./)) {
                const [title, ...body] = trimmed.split("\n");
                return (
                  <div key={i} className="mb-6">
                    <h2 className="mb-3 text-base font-semibold text-white">{title}</h2>
                    <div className="space-y-2">
                      {body.filter(Boolean).map((line, j) => {
                        const clean = line.replace(/^•\s*/, "").trim();
                        if (!clean) return null;
                        if (clean.startsWith("•")) {
                          return (
                            <p key={j} className="ml-4 text-sm leading-7 text-textSecondary">
                              • {clean.replace(/^•\s*/, "")}
                            </p>
                          );
                        }
                        return (
                          <p key={j} className="text-sm leading-7 text-textSecondary">
                            {clean}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
                return (
                  <ul key={i} className="mb-4 list-disc space-y-1 pl-5 text-sm text-textSecondary">
                    {trimmed.split("\n").filter(Boolean).map((line, j) => (
                      <li key={j}>{line.replace(/^[•-]\s*/, "")}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={i} className="mb-4 text-sm leading-7 text-textSecondary">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
