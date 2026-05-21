"use client";

import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  onSearch: (id: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(value), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, onSearch]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || /^\d+$/.test(val)) setValue(val);
          }}
          placeholder="Buscar por ID del personaje..."
          className="w-full pl-12 pr-12 py-3.5 bg-gray-900/80 border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/70 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-sm"
        />
        {value && (
          <button
            onClick={() => setValue("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
