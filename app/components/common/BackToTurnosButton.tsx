"use client";

import { useRouter } from "next/navigation";

export default function BackToTurnosButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/turnos")}
      className="inline-flex items-center gap-2 text-sm font-semibold text-[#b38af4]"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full border border-[#b38af4]">
        ←
      </span>
      Volver
    </button>
  );
}
