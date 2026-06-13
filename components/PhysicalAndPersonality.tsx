import React from "react";

interface Measurements {
  height?: string;
  bust?: string;
  cupSize?: string; // e.g. "32C" or "30B"
  waist?: string;
  hips?: string;
  pantSize?: string;
  dressSize?: string;
  weight?: string;
}

interface Body {
  skinTone?: string;
  skinType?: string;
  hairColor?: string;
  eyeColor?: string;
  build?: string;
  voluptuous?: boolean;
}

interface Props {
  measurements?: Measurements;
  body?: Body;
  personality?: string[];
  personalityDetails?: PersonalityDetails;
}

interface PersonalityDetails {
  hobbies?: string[];
  values?: string[];
  dealbreakers?: string[];
  languages?: string[];
}

export default function PhysicalAndPersonality({
  measurements,
  body,
  personality,
  personalityDetails,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-base uppercase tracking-[0.5em] text-premium">
          Físico y personalidad
        </p>
        <p className="mt-2 text-sm text-textSecondary">
          Medidas y rasgos esenciales
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-white">Medidas</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {measurements?.height && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>📏</span>
                Altura: {measurements.height}
              </span>
            )}
            {measurements?.bust && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>🎀</span>
                Busto: {measurements.bust}
              </span>
            )}
            {measurements?.cupSize && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>🩲</span>
                Talla copa: {measurements.cupSize}
              </span>
            )}
            {measurements?.waist && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>🪢</span>
                Cintura: {measurements.waist}
              </span>
            )}
            {measurements?.hips && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>🍑</span>
                Caderas: {measurements.hips}
              </span>
            )}
            {measurements?.pantSize && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>👖</span>
                Talla pantalón: {measurements.pantSize}
              </span>
            )}
            {measurements?.dressSize && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>👗</span>
                Talla vestido: {measurements.dressSize}
              </span>
            )}
            {measurements?.weight && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>⚖️</span>
                Peso: {measurements.weight}
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Rasgos</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {body?.skinTone && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>🟤</span>
                Piel: {body.skinTone}
              </span>
            )}
            {body?.skinType && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>💧</span>
                Tipo: {body.skinType}
              </span>
            )}
            {body?.hairColor && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>💇‍♀️</span>
                Cabello: {body.hairColor}
              </span>
            )}
            {body?.eyeColor && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>👁️</span>
                Ojos: {body.eyeColor}
              </span>
            )}
            {body?.build && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>🧍‍♀️</span>
                {body.build}
              </span>
            )}
            {body?.voluptuous && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                <span>💃</span>
                Voluptuosa
              </span>
            )}
          </div>
        </div>
      </div>
      {personality && personality.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-white">Personalidad</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {personality.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <span>💛</span>
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Personality details: hobbies, values, dealbreakers, languages */}
      {personalityDetails && (
        <div>
          <p className="text-sm font-semibold text-white">Más sobre ella</p>
          <div className="mt-3 flex flex-col gap-3">
            {personalityDetails.hobbies && (
              <div>
                <p className="text-xs text-textSecondary">Hobbies</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {personalityDetails.hobbies.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                    >
                      <span>🎯</span>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {personalityDetails.values && (
              <div>
                <p className="text-xs text-textSecondary">Valores</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {personalityDetails.values.map((v) => (
                    <span
                      key={v}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                    >
                      <span>🛡️</span>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {personalityDetails.dealbreakers && (
              <div>
                <p className="text-xs text-textSecondary">
                  Límites / No acepto
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {personalityDetails.dealbreakers.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                    >
                      <span>⛔</span>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {personalityDetails.languages && (
              <div>
                <p className="text-xs text-textSecondary">Idiomas</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {personalityDetails.languages.map((l) => (
                    <span
                      key={l}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                    >
                      <span>🗣️</span>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
