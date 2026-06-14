"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProfileGalleryProps {
  images: string[];
  name: string;
}

export default function ProfileGallery({ images, name }: ProfileGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const goPrev = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    );
  };

  const goNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null,
    );
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base uppercase tracking-[0.35em] text-premium">
              Galería
            </p>
            <p className="mt-1 text-sm text-textSecondary">Fotos recientes</p>
          </div>
          <p className="text-sm font-semibold text-white">+{images.length}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => openImage(index)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/10 transition hover:border-premium/50 aspect-[3/4]"
            >
              <Image
                src={image}
                alt={`${name} ${index + 1}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-2 left-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                Ver
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="absolute inset-0" onClick={closeModal} />

          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white transition hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-3 text-white transition hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-3 text-white transition hover:bg-white/10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="relative z-10 max-h-[85vh] w-full max-w-4xl">
            <div className="relative h-[70vh] w-full">
              <Image
                src={images[selectedIndex]}
                alt={`${name} ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-textSecondary">
              {selectedIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
