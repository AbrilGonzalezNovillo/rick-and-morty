"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import CharacterCard from "@/components/CharacterCard";
import { useEffect } from "react";

export default function FavoritesPage() {
  const { isLoggedIn, favorites } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-3">
              Mis Favoritos
            </h1>
            <p className="text-gray-500 text-sm">
              Tus personajes favoritos del multiverso
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-900/60 border border-gray-800/50 mb-4">
              <svg
                className="w-10 h-10 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-lg">
              No tienes favoritos todavia
            </p>
            <p className="text-gray-700 text-sm mt-1">
              Agrega personajes a favoritos desde la pagina de inicio
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-gray-500">
                {favorites.length}{" "}
                {favorites.length === 1 ? "favorito" : "favoritos"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {favorites.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
