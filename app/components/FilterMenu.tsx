"use client";

import { useEffect, useRef, useState } from "react";

export default function FilterMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
        Filtrar por
        <span className="text-slate-400">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-3 w-80 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_30px_60px_rgba(15,23,42,0.12)]">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-800">
                Nombre custodio
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-800">
                Hora
              </label>
              <select className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20">
                <option>Buscar por hora</option>
                <option>6:55 am</option>
                <option>7:00 am</option>
                <option>7:10 am</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-800">
                Estatus
              </label>
              <select className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20">
                
                <option>Confirmado</option>
                <option>Pendiente</option>
                <option>Cancelado</option>
              </select>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-[#f59e0b] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f97316]"
            >
              Ir a la búsqueda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
