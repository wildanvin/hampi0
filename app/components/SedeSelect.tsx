"use client";

import { useEffect, useRef, useState } from "react";

const sedes = [
  "AMAGUAÑA",
  "NONO",
  "SAN JOSÉ DE AYORA",
  "ZAMBIZA",
  "CANGAHUA",
  "CHECA",
  "PUEMBO",
  "EL QUINCHE",
  "SANTA ROSA DE CUZUBAMBA",
  "ASCÁZUBI",
  "TUMBACO",
  "CALDERON PUNTO 1",
  "CALDERON PUNTO 2",
  "CONOCOTO",
];

export default function SedeSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("PUEMBO");
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
        className="flex min-w-[220px] items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected}
        <span className="text-slate-400">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-72 w-[280px] overflow-auto rounded-xl border border-slate-300 bg-white py-2 text-sm font-medium text-slate-700 shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
          {sedes.map((sede) => (
            <button
              key={sede}
              type="button"
              onClick={() => {
                setSelected(sede);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left transition ${
                selected === sede
                  ? "bg-[#4a86b8] text-white"
                  : "hover:bg-slate-50"
              }`}
            >
              {sede}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
