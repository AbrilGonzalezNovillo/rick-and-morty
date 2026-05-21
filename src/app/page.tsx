"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      router.push("/home");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              animationDelay: `${(i * 0.3) % 3}s`,
              animationDuration: `${2 + (i % 3)}s`,
              opacity: 0.08 + (i % 5) * 0.06,
            }}
          />
        ))}
      </div>

      {/* Login form */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent mb-3">
            Rick & Morty
          </h1>
          <p className="text-gray-600 text-xs tracking-[0.25em] uppercase">
            Explorador de personajes
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@usuario.com"
                className="w-full px-4 py-3 bg-gray-950/60 border border-gray-800/50 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/10 transition-all duration-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full px-4 py-3 bg-gray-950/60 border border-gray-800/50 rounded-xl text-white placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/10 transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-sm text-red-400 text-center">
                Credenciales incorrectas
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 disabled:from-green-900 disabled:to-cyan-900 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-600/10 hover:shadow-green-500/20 cursor-pointer text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 animate-spin"
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
                Ingresando...
              </span>
            ) : (
              "Ingresar"
            )}
          </button>

          <p className="mt-5 text-[11px] text-gray-700 text-center">
            Credenciales: usuario@usuario.com / password
          </p>
        </form>
      </div>
    </div>
  );
}
