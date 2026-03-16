"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
    <div ref={ref} className="fixed right-8 top-8 z-30">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-700"
        aria-label="Perfil de usuario"
        aria-expanded={open}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#b38af4] text-[10px] font-bold text-white">
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
          <button
            type="button"
            className="block w-full px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Editar Perfil
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push("/reportes");
            }}
            className="block w-full px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reportes
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push("/");
            }}
            className="block w-full px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
