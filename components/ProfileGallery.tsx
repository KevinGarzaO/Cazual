"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";

interface ProfileGalleryProps {
  images: string[];
  name: string;
}

export default function ProfileGallery({ images, name }: ProfileGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    setZoomed(false);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setZoomed(false);
  };

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base uppercase tracking-[0.5em] text-premium">
              Galería
            </p>
            <p className="mt-1 text-sm text-textSecondary">Fotos recientes</p>
          </div>
          <p className="text-sm font-semibold text-white">+{images.length}</p>
        </div>

        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => openImage(index)}
              className="group relative min-w-[45%] sm:min-w-[220px] flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black/10 transition hover:border-premium/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <Image
                src={image}
                alt={`${name} gallery ${index + 1}`}
                width={360}
                height={500}
                className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white">
                Ver
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="absolute inset-0" onClick={closeModal} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/95">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white transition hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomed((current) => !current)}
              className="absolute right-4 top-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <Maximize2 className="h-4 w-4 text-premium" />
              {zoomed ? "Reducir" : "Ampliar"}
            </button>
            <div className="relative h-[75vh] w-full">
              <Image
                src={selectedImage}
                alt={`${name} enlarged gallery image`}
                fill
                className={`object-contain transition-transform duration-300 ${zoomed ? "scale-110" : "scale-100"}`}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
