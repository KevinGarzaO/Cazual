"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSessionStore } from "@/lib/sessionStore";

type UserType = "solicitante" | "prestador";

function calcAge(birthDate: string): number {
  if (!birthDate) return 0;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

interface FormData {
  name: string;
  city: string;
  birthDate: string;
  description: string;
  image: string;
  // Solicitante
  preferences: string;
  // Prestador
  services: string[];
  languages: string[];
  gallery: string[];
  height: string;
  bust: string;
  cupSize: string;
  waist: string;
  hips: string;
  pantSize: string;
  dressSize: string;
  weight: string;
  skinTone: string;
  skinType: string;
  hairColor: string;
  eyeColor: string;
  build: string;
  personality: string[];
  hobbies: string[];
  values: string[];
  dealbreakers: string[];
}

const providerServices = [
  "Acompañante", "Cenas", "Viajes", "Eventos", "Bienestar",
];

const buildOptions = [
  "Delgada", "Atlética", "Curvy", "Voluptuosa", "Rellenita",
];

const skinToneOptions = [
  "Clara", "Oliva", "Trigueña", "Morena", "Oscura",
];

const skinTypeOptions = [
  "Normal", "Mixta", "Seca", "Grasa",
];

const personalityTags = [
  "Cariñosa", "Elegante", "Conversadora", "Sociable",
  "Atenta", "Reservada", "Extrovertida", "Divertida",
  "Apasionada", "Romántica",
];

const languageOptions = ["Español", "Inglés", "Portugués", "Francés", "Alemán", "Italiano", "Chino", "Japonés"];

const hairColorOptions = ["Castaño", "Rubio", "Negro", "Pelirrojo", "Teñido"];

const eyeColorOptions = ["Marrones", "Verdes", "Azules", "Cafés", "Negros", "Grises"];

const hobbyOptions = ["Viajar", "Cocina", "Arte", "Música", "Teatro", "Fitness", "Café", "Lectura", "Cine", "Baile", "Yoga", "Fotografía", "Moda", "Deportes"];

const valueOptions = ["Discreción", "Respeto", "Puntualidad", "Profesionalismo", "Autenticidad", "Pasión", "Honestidad", "Lealtad"];

const dealbreakerOptions = ["Falta de respeto", "Impuntualidad", "Falta de higiene", "Mala educación"];

export default function CompletarPerfilPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CompletarPerfilForm />
    </Suspense>
  );
}

function CompletarPerfilForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasAccount, login } = useSessionStore();
  const userId = searchParams.get("userId");
  const userType = (searchParams.get("type") || "solicitante") as UserType;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    city: "",
    birthDate: "",
    description: "",
    image: "",
    preferences: "",
    services: [],
    languages: [],
    gallery: [],
    height: "",
    bust: "",
    cupSize: "",
    waist: "",
    hips: "",
    pantSize: "",
    dressSize: "",
    weight: "",
    skinTone: "",
    skinType: "",
    hairColor: "",
    eyeColor: "",
    build: "",
    personality: [],
    hobbies: [],
    values: [],
    dealbreakers: [],
  });

  useEffect(() => {
    if (!userId) return;
    const raw = localStorage.getItem(`cazual_profile_${userId}`);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.age && !data.birthDate) {
        data.birthDate = "";
      }
      setFormData((prev) => ({ ...prev, ...data }));
    }
    const userRaw = localStorage.getItem(`cazual_user_${userId}`);
    if (userRaw) {
      const userData = JSON.parse(userRaw);
      setFormData((prev) => ({ ...prev, name: userData.name || "" }));
    }
  }, [userId]);

  const selectedServices = useMemo(
    () => new Set(formData.services),
    [formData.services],
  );
  const selectedPersonality = useMemo(
    () => new Set(formData.personality),
    [formData.personality],
  );
  const selectedLanguages = useMemo(
    () => new Set(formData.languages),
    [formData.languages],
  );
  const selectedHobbies = useMemo(
    () => new Set(formData.hobbies),
    [formData.hobbies],
  );
  const selectedValues = useMemo(
    () => new Set(formData.values),
    [formData.values],
  );
  const selectedDealbreakers = useMemo(
    () => new Set(formData.dealbreakers),
    [formData.dealbreakers],
  );

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleArrayItem = (field: "services" | "personality" | "languages" | "hobbies" | "values" | "dealbreakers", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setFormData((prev) => ({ ...prev, image: ev.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setFormData((prev) => ({
              ...prev,
              gallery: [...prev.gallery, ev.target!.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!userId) {
        setError("Usuario no autenticado");
        return;
      }

      localStorage.setItem(`cazual_profile_${userId}`, JSON.stringify(formData));

      if (!hasAccount) {
        login(userId, userType);
      }

      router.push("/");
    } catch {
      setError("Error al guardar el perfil. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-3xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-premium";
  const labelClass = "space-y-2 text-sm";
  const sectionClass = "grid gap-5 rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-glow";

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-card/80 p-4 shadow-glow">
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-premium">
                Completar Perfil
              </p>
              <h1 className="mt-1 text-3xl font-semibold leading-tight text-white">
                {userType === "solicitante"
                  ? "¿Qué buscas?"
                  : "Tu Perfil Profesional"}
              </h1>
              <p className="mt-2 max-w-lg text-sm text-textSecondary">
                {userType === "solicitante"
                  ? "Cuéntanos qué tipo de servicios buscas y dónde estás ubicado."
                  : "Presenta tu estilo, experiencia y los servicios que ofreces."}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Foto de perfil */}
          <div className={sectionClass}>
            <p className="text-sm font-semibold text-white">Foto de perfil</p>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-premium bg-black/50">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-textSecondary text-xs">Sin foto</div>
                )}
              </div>
              <label className="cursor-pointer rounded-full bg-premium px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110">
                Subir foto
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Información básica */}
          <div className={sectionClass}>
            <p className="text-sm font-semibold text-white">Información básica</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={labelClass}>
                <span className="font-semibold text-white">Nombre / Alias</span>
                <input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className={inputClass} placeholder="Ej. Ana" />
              </label>
              <label className={labelClass}>
                <span className="font-semibold text-white">Fecha de nacimiento</span>
                <input type="date" value={formData.birthDate} onChange={(e) => handleChange("birthDate", e.target.value)} required className={inputClass} />
                {formData.birthDate && (
                  <p className="text-xs text-textSecondary mt-1">
                    Edad: <span className="text-white font-semibold">{calcAge(formData.birthDate)}</span> años
                  </p>
                )}
              </label>
              <label className={labelClass}>
                <span className="font-semibold text-white">Ciudad</span>
                <input value={formData.city} onChange={(e) => handleChange("city", e.target.value)} required className={inputClass} placeholder="Monterrey" />
              </label>
              <label className={labelClass}>
                <span className="font-semibold text-white">Descripción</span>
                <textarea value={formData.description} onChange={(e) => handleChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Una breve descripción sobre ti..." />
              </label>
            </div>
          </div>

          {/* Solicitante: preferencias */}
          {userType === "solicitante" && (
            <div className={sectionClass}>
              <p className="text-sm font-semibold text-white">Preferencias</p>
              <label className={labelClass}>
                <span className="font-semibold text-white">¿Qué buscas?</span>
                <textarea
                  value={formData.preferences}
                  onChange={(e) => handleChange("preferences", e.target.value)}
                  rows={5}
                  className={inputClass}
                  placeholder="Describe tus preferencias, tipo de servicio y ambiente deseado"
                />
              </label>
            </div>
          )}

          {/* Prestador: secciones completas */}
          {userType === "prestador" && (
            <>
              {/* Servicios */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Servicios disponibles</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {providerServices.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleArrayItem("services", service)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedServices.has(service)
                          ? "border-premium bg-premium/15 text-white"
                          : "border-white/10 bg-black/50 text-textSecondary hover:border-white/20"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Idiomas */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Idiomas</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleArrayItem("languages", lang)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedLanguages.has(lang)
                          ? "border-premium bg-premium/15 text-white"
                          : "border-white/10 bg-black/50 text-textSecondary hover:border-white/20"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medidas */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Medidas</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className={labelClass}><span>Altura</span><input value={formData.height} onChange={(e) => handleChange("height", e.target.value)} className={inputClass} placeholder="Ej. 170 cm" /></label>
                  <label className={labelClass}><span>Busto</span><input value={formData.bust} onChange={(e) => handleChange("bust", e.target.value)} className={inputClass} placeholder="Ej. 90 cm" /></label>
                  <label className={labelClass}><span>Talla de copa</span><input value={formData.cupSize} onChange={(e) => handleChange("cupSize", e.target.value)} className={inputClass} placeholder="Ej. 32C" /></label>
                  <label className={labelClass}><span>Cintura</span><input value={formData.waist} onChange={(e) => handleChange("waist", e.target.value)} className={inputClass} placeholder="Ej. 60 cm" /></label>
                  <label className={labelClass}><span>Caderas</span><input value={formData.hips} onChange={(e) => handleChange("hips", e.target.value)} className={inputClass} placeholder="Ej. 92 cm" /></label>
                  <label className={labelClass}><span>Talla de pantalón</span><input value={formData.pantSize} onChange={(e) => handleChange("pantSize", e.target.value)} className={inputClass} placeholder="Ej. 28" /></label>
                  <label className={labelClass}><span>Talla de vestido</span><input value={formData.dressSize} onChange={(e) => handleChange("dressSize", e.target.value)} className={inputClass} placeholder="Ej. S" /></label>
                  <label className={labelClass}><span>Peso</span><input value={formData.weight} onChange={(e) => handleChange("weight", e.target.value)} className={inputClass} placeholder="Ej. 58 kg" /></label>
                </div>
              </div>

              {/* Rasgos físicos */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Rasgos físicos</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className={labelClass}>
                    <span>Tono de piel</span>
                    <select value={formData.skinTone} onChange={(e) => handleChange("skinTone", e.target.value)} className={inputClass}>
                      <option value="">Seleccionar...</option>
                      {skinToneOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className={labelClass}>
                    <span>Tipo de piel</span>
                    <select value={formData.skinType} onChange={(e) => handleChange("skinType", e.target.value)} className={inputClass}>
                      <option value="">Seleccionar...</option>
                      {skinTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className={labelClass}>
                    <span>Color de cabello</span>
                    <select value={formData.hairColor} onChange={(e) => handleChange("hairColor", e.target.value)} className={inputClass}>
                      <option value="">Seleccionar...</option>
                      {hairColorOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className={labelClass}>
                    <span>Color de ojos</span>
                    <select value={formData.eyeColor} onChange={(e) => handleChange("eyeColor", e.target.value)} className={inputClass}>
                      <option value="">Seleccionar...</option>
                      {eyeColorOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className={labelClass}>
                    <span>Complexión</span>
                    <select value={formData.build} onChange={(e) => handleChange("build", e.target.value)} className={inputClass}>
                      <option value="">Seleccionar...</option>
                      {buildOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                </div>
              </div>

              {/* Personalidad */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Personalidad</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {personalityTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleArrayItem("personality", tag)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedPersonality.has(tag)
                          ? "border-premium bg-premium/15 text-white"
                          : "border-white/10 bg-black/50 text-textSecondary hover:border-white/20"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hobbies */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Hobbies</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {hobbyOptions.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleArrayItem("hobbies", h)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedHobbies.has(h)
                          ? "border-premium bg-premium/15 text-white"
                          : "border-white/10 bg-black/50 text-textSecondary hover:border-white/20"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Valores */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Valores</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {valueOptions.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => toggleArrayItem("values", v)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedValues.has(v)
                          ? "border-premium bg-premium/15 text-white"
                          : "border-white/10 bg-black/50 text-textSecondary hover:border-white/20"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Límites */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Límites / No acepto</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {dealbreakerOptions.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleArrayItem("dealbreakers", d)}
                      className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedDealbreakers.has(d)
                          ? "border-premium bg-premium/15 text-white"
                          : "border-white/10 bg-black/50 text-textSecondary hover:border-white/20"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Galería de fotos */}
              <div className={sectionClass}>
                <p className="text-sm font-semibold text-white">Galería de fotos</p>
                <div className="flex flex-wrap gap-3">
                  {formData.gallery.map((img, i) => (
                    <div key={i} className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10">
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, gallery: prev.gallery.filter((_, j) => j !== i) }))}
                        className="absolute right-0 top-0 h-5 w-5 rounded-full bg-red-500 text-[10px] text-white"
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/30 text-2xl text-textSecondary transition hover:border-premium hover:text-premium">
                    +
                    <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="rounded-[2rem] border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className={sectionClass}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-premium">
                  Finalizar
                </p>
                <p className="mt-2 text-sm text-textSecondary">
                  Completa tu perfil para comenzar a usar la plataforma.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-premium px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Guardando..." : hasAccount ? "Guardar cambios" : "Completar Perfil"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
