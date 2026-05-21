"use client";

import Image from "next/image";
import { Character } from "@/lib/types";
import { useApp } from "@/context/AppContext";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.some((f) => f.id === character.id);

  const statusColor =
    character.status === "Alive"
      ? "bg-green-500"
      : character.status === "Dead"
      ? "bg-red-500"
      : "bg-yellow-500";

  const statusText =
    character.status === "Alive"
      ? "Vivo"
      : character.status === "Dead"
      ? "Muerto"
      : "Desconocido";

  return (
    <div className="group relative bg-gray-900/60 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-green-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Status badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gray-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-gray-700/30">
          <span
            className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`}
          />
          <span className="text-xs font-medium text-gray-200">
            {statusText}
          </span>
        </div>

        {/* ID badge */}
        <div className="absolute bottom-3 left-3 bg-gray-950/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-gray-700/30">
          <span className="text-xs font-mono text-gray-400">
            #{character.id}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(character)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-950/80 backdrop-blur-md border border-gray-700/30 hover:bg-gray-950 hover:scale-110 transition-all duration-200 cursor-pointer"
        >
          {isFavorite ? (
            <svg
              className="w-4.5 h-4.5 text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2.5">
        <h3 className="text-base font-bold text-white truncate leading-tight">
          {character.name}
        </h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 text-xs uppercase tracking-wider w-16 shrink-0">
              Especie
            </span>
            <span className="text-gray-300 truncate">{character.species}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 text-xs uppercase tracking-wider w-16 shrink-0">
              Genero
            </span>
            <span className="text-gray-300">{character.gender}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 text-xs uppercase tracking-wider w-16 shrink-0">
              Origen
            </span>
            <span className="text-gray-300 truncate">
              {character.origin.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
