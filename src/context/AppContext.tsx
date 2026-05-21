"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Character } from "@/lib/types";

interface AppContextType {
  isLoggedIn: boolean;
  favorites: Character[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleFavorite: (character: Character) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<Character[]>([]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.access) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setFavorites([]);
  }, []);

  const toggleFavorite = useCallback(
    async (character: Character) => {
      const isFav = favorites.some((f) => f.id === character.id);
      if (isFav) {
        const res = await fetch(`/api/fav/${character.id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        setFavorites(data);
      } else {
        const res = await fetch("/api/fav", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(character),
        });
        const data = await res.json();
        setFavorites(data);
      }
    },
    [favorites]
  );

  return (
    <AppContext.Provider
      value={{ isLoggedIn, favorites, login, logout, toggleFavorite }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
