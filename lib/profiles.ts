import { useState, useEffect } from "react";

export interface Profile {
  slug: string;
  name: string;
  age: number;
  city: string;
  location: string;
  score: number;
  tags: string[];
  description: string;
  services: string[];
  image: string;
  gallery: string[];
  reviews: number;
  rating: number;
  measurements?: {
    height?: string;
    bust?: string;
    cupSize?: string;
    waist?: string;
    hips?: string;
    pantSize?: string;
    dressSize?: string;
    weight?: string;
  };
  body?: {
    skinTone?: string;
    skinType?: string;
    hairColor?: string;
    eyeColor?: string;
    build?: string;
    voluptuous?: boolean;
  };
  personality?: string[];
  personalityDetails?: {
    hobbies?: string[];
    values?: string[];
    dealbreakers?: string[];
    languages?: string[];
  };
  reviewSummary?: string;
}

export const profiles: Profile[] = [
  {
    slug: "valeria",
    name: "Valeria",
    age: 26,
    city: "Monterrey",
    location: "Monterrey, Nuevo León",
    score: 98,
    tags: ["Verificada", "Fotos revisadas", "Premium"],
    description:
      "Me encanta conocer personas educadas, disfrutar buenas conversaciones y vivir experiencias únicas. Discreción y respeto ante todo.",
    services: ["Acompañante", "Cenas", "Viajes", "Eventos"],
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: 128,
    rating: 5,
    measurements: {
      height: "170 cm",
      bust: "90 cm",
      cupSize: "32C",
      waist: "60 cm",
      hips: "92 cm",
      pantSize: "28",
      dressSize: "S",
      weight: "58 kg",
    },
    body: {
      skinTone: "Oliva",
      skinType: "Mixta",
      hairColor: "Castaño",
      eyeColor: "Marrones",
      build: "Voluptuosa",
      voluptuous: true,
    },
    personality: ["Cariñosa", "Elegante", "Conversadora"],
    personalityDetails: {
      hobbies: ["Viajar", "Cocina", "Arte"],
      values: ["Discreción", "Respeto", "Puntualidad"],
      dealbreakers: ["Falta de higiene", "Falta de respeto"],
      languages: ["Español", "Inglés"],
    },
    reviewSummary:
      "Muy atenta, fotos muy acordes a la realidad y ambiente discreto. Recontratada con frecuencia por su elegancia y buena conversación. Lo único a mejorar es tener disponibilidad más temprana en fines de semana.",
  },
  {
    slug: "camila",
    name: "Camila",
    age: 24,
    city: "Guadalajara",
    location: "Guadalajara, Jalisco",
    score: 94,
    tags: ["Verificada", "Respuesta rápida", "Top"],
    description:
      "Perfil elegante con estilo femenino. Disfruto de experiencias selectas, buena platica y viajes con compañía premium.",
    services: ["Acompañante", "Cenas", "Eventos"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: 89,
    rating: 4.8,
    measurements: {
      height: "168 cm",
      bust: "88 cm",
      cupSize: "30B",
      waist: "62 cm",
      hips: "90 cm",
      pantSize: "27",
      dressSize: "S",
      weight: "55 kg",
    },
    body: {
      skinTone: "Clara",
      skinType: "Normal",
      hairColor: "Rubio",
      eyeColor: "Verdes",
      build: "Delgada",
      voluptuous: false,
    },
    personality: ["Sociable", "Atenta", "Reservada"],
    personalityDetails: {
      hobbies: ["Café", "Teatro", "Fitness"],
      values: ["Profesionalismo", "Discreción"],
      dealbreakers: ["Impuntualidad"],
      languages: ["Español"],
    },
    reviewSummary:
      "Muy profesional y puntual. Clientes la recontratan por su trato fino y discreción. En ocasiones la agenda se llena rápido, así que conviene reservar con anticipación.",
  },
  {
    slug: "sofia",
    name: "Sofía",
    age: 23,
    city: "Monterrey",
    location: "Monterrey, Nuevo León",
    score: 92,
    tags: ["Premium", "Perfil revisado", "Fotos verificadas"],
    description:
      "Amante de la vida nocturna y los planes exclusivos. Busco conexiones reales con estilo y discreción.",
    services: ["Acompañante", "Cenas", "Viajes"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: 74,
    rating: 4.7,
    measurements: {
      height: "165 cm",
      bust: "85 cm",
      cupSize: "34A",
      waist: "60 cm",
      hips: "88 cm",
      pantSize: "26",
      dressSize: "S",
      weight: "54 kg",
    },
    body: {
      skinTone: "Trigueña",
      skinType: "Seca",
      hairColor: "Negro",
      eyeColor: "Cafés",
      build: "Curvy",
      voluptuous: false,
    },
    personality: ["Extrovertida", "Divertida", "Apasionada"],
    personalityDetails: {
      hobbies: ["Nocturna", "Música", "Viajes"],
      values: ["Autenticidad", "Pasión"],
      dealbreakers: ["Falta de respeto"],
      languages: ["Español", "Inglés"],
    },
    reviewSummary:
      "Muy energética y apasionada. Le gusta crear planes exclusivos y deja buena impresión, aunque prefiere encuentros más selectos y con poco margen de improvisación.",
  },
];

function calcAge(birthDate: string): number {
  if (!birthDate) return 0;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function localStorageProfileToProfile(data: any, userId: string): Profile {
  const slug = `user-${userId}`;
  const age = data.birthDate ? calcAge(data.birthDate) : 0;
  return {
    slug,
    name: data.name || "Usuario",
    age,
    city: data.city || "Ciudad no especificada",
    location: data.city || "Ubicación no especificada",
    score: 50,
    tags: ["Nuevo"],
    description: data.description || "",
    services: data.services || [],
    image: data.image || "",
    gallery: data.gallery || [],
    reviews: 0,
    rating: 0,
    measurements: data.height || data.bust || data.waist ? {
      height: data.height,
      bust: data.bust,
      cupSize: data.cupSize,
      waist: data.waist,
      hips: data.hips,
      pantSize: data.pantSize,
      dressSize: data.dressSize,
      weight: data.weight,
    } : undefined,
    body: data.skinTone || data.hairColor ? {
      skinTone: data.skinTone,
      skinType: data.skinType,
      hairColor: data.hairColor,
      eyeColor: data.eyeColor,
      build: data.build,
    } : undefined,
    personality: data.personality || [],
    personalityDetails: {
      hobbies: data.hobbies || [],
      values: data.values || [],
      dealbreakers: data.dealbreakers || [],
      languages: data.languages || [],
    },
  };
}

export function getLocalStorageProfiles(): Profile[] {
  if (typeof window === "undefined") return [];
  const result: Profile[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("cazual_profile_")) {
      const userId = key.replace("cazual_profile_", "");
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const data = JSON.parse(raw);
          result.push(localStorageProfileToProfile(data, userId));
        } catch {}
      }
    }
  }
  return result;
}

export function getAllProfiles(): Profile[] {
  return [...profiles, ...getLocalStorageProfiles()];
}

export function useAllProfiles(): Profile[] {
  const [all, setAll] = useState<Profile[]>(() => [...profiles]);
  useEffect(() => {
    setAll(getAllProfiles());
  }, []);
  return all;
}

export function getProfileBySlug(slug: string) {
  const all = getAllProfiles();
  return all.find((profile) => profile.slug === slug) || null;
}
