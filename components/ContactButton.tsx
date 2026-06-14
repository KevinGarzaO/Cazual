"use client";

import { useRouter } from "next/navigation";

interface Props {
  slug: string;
}

export default function ContactButton({ slug }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/mensajes?chat=${slug}`)}
      className="w-full rounded-full bg-premium px-6 py-4 text-sm font-semibold text-black shadow-xl shadow-premium/30 transition hover:brightness-105 sm:max-w-[420px]"
    >
      Contactar
    </button>
  );
}
