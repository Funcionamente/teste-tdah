"use client";

​import { useState } from "react";

export default function Home() {
 ​ ​const [hovered, setHovered] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Container principal com efeito glass */}
      <div className="glass p-10 w-full max-w-lg shadow-float">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Teste TDAH
        </h1>
        <p className="text-gray-300 mb-8">
          Descubra seu nível de atenção com um design moderno e suave.
        </p>

        <a
          href="/teste"
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
          className={`btn-glass px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
            hovered ? "scale-105" : ""
          }`}
        >
          Iniciar Teste
        </a>
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Teste TDAH - Design Moderno
      </footer>​
    </main>
  );
}
