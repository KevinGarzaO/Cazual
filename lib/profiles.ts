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
    height?: string; // e.g. "170 cm"
    bust?: string;
    cupSize?: string; // e.g. "B", "C"
    waist?: string;
    hips?: string;
    pantSize?: string; // talla de pantalón / jeans
    dressSize?: string; // talla de vestido
    weight?: string;
  };
  body?: {
    skinTone?: string;
    skinType?: string;
    hairColor?: string;
    eyeColor?: string;
    build?: string; // e.g. "Delgada", "Rellenita", "Voluptuosa"
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
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
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

export function getProfileBySlug(slug: string) {
  return profiles.find((profile) => profile.slug === slug);
}
