"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";

export default function HomePage() {
  const { isLoggedIn } = useApp();
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResult, setSearchResult] = useState<Character | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, [isLoggedIn, router]);

  const fetchPage = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/characters?page=${p}`);
      if (!res.ok) return;
      const data = await res.json();
      setCharacters(data.characters);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchPage(page);
  }, [isLoggedIn, page, fetchPage]);

  const handleSearch = useCallback(async (id: string) => {
    if (!id) {
      setSearchResult(null);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(`/api/character/${id}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResult(data);
      } else {
        setSearchResult(null);
      }
    } finally {
      setSearching(false);
    }
  }, []);

  if (!isLoggedIn) return null;

  const isSearching = searchResult !== null;
  const displayCharacters = isSearching ? [searchResult] : characters;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent mb-3">
              Explorar Personajes
            </h1>
            <p className="text-gray-500 text-sm">
              Todos los personajes del multiverso de Rick & Morty
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading || searching ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 border border-gray-800 mb-4">
              <svg
                className="w-8 h-8 text-green-500 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Cargando personajes...</p>
          </div>
        ) : displayCharacters.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-900 border border-gray-800 mb-4">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-lg">No se encontraron personajes</p>
            <p className="text-gray-700 text-sm mt-1">Intenta con otro ID</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-gray-500">
                {isSearching ? "1 resultado" : `Pagina ${page} de ${totalPages}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {displayCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {/* Paginacion */}
            {!isSearching && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium hover:border-green-500/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                  Anterior
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (page <= 4) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = page - 3 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                        page === pageNum
                          ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                          : "bg-gray-900 border border-gray-800 text-gray-400 hover:border-green-500/50 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium hover:border-green-500/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
