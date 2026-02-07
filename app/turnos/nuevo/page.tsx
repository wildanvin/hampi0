const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export default function CrearTurnoPage() {
  return (
    <div className="min-h-screen bg-[#2f2f2f] px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white px-8 py-7 shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-semibold text-slate-900">
            Crear Turno Adicional
          </h1>
          <a
            href="/turnos"
            className="text-slate-500 transition hover:text-slate-700"
            aria-label="Cerrar"
          >
            <CloseIcon />
          </a>
        </div>

        <form className="mt-6 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700">
              <span>Nombre del tutor</span>
              <button
                type="button"
                className="text-[#f59e0b] transition hover:text-[#f97316]"
              >
              
              </button>
            </div>
            <input
              type="text"
              placeholder="Buscar Nombre Completo"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700">
              <span>Nombre de la mascota</span>
              <button
                type="button"
                className="text-[#f59e0b] transition hover:text-[#f97316]"
              >
                
              </button>
            </div>
            <input
              type="text"
              placeholder="Buscar Nombre Completo"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-400 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Sede</label>
            <select className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20">
              <option>Seleccionar Sede</option>
              <option>PUEMBO</option>
              <option>AMAGUAÑA</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Número de Cédula
            </label>
            <input
              type="text"
              placeholder="0000000000"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-400 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Fecha</label>
            <div className="mt-2 flex items-center gap-4 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-400">
              <div className="flex-1">07.02.26</div>
              <div className="text-slate-500">12:00</div>
              <div className="text-slate-500">
                <CalendarIcon />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="w-36 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-400"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
