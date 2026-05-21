"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { logout, favorites } = useApp();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/90 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/home"
            className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent hover:from-green-300 hover:to-cyan-300 transition-all duration-300"
          >
            Rick & Morty
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/home"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === "/home"
                  ? "bg-green-500/15 text-green-400"
                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/favorites"
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === "/favorites"
                  ? "bg-green-500/15 text-green-400"
                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
              }`}
            >
              Favoritos
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-gray-950 text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <div className="w-px h-6 bg-gray-800 mx-2" />
            <button
              onClick={logout}
              className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 cursor-pointer"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
