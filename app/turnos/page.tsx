import TurnosCalendar from "../components/TurnosCalendar";
import UserMenu from "../components/UserMenu";
import SedeSelect from "../components/SedeSelect";
import FilterMenu from "../components/FilterMenu";

const PawLogo = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <circle cx="14" cy="14" r="5" fill="#F59E0B" />
    <circle cx="24" cy="10" r="5" fill="#F97316" />
    <circle cx="34" cy="14" r="5" fill="#F59E0B" />
    <circle cx="20" cy="24" r="5" fill="#F59E0B" />
    <path
      d="M24 30c-6 0-11 3.8-11 8.5 0 3.3 3.4 6.5 11 6.5s11-3.2 11-6.5C35 33.8 30 30 24 30Z"
      fill="#F97316"
    />
  </svg>
);

export default function TurnosPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="flex min-h-screen">
        <aside className="flex w-64 flex-col justify-between border-r border-slate-200 bg-white px-6 py-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff3e6]">
                <PawLogo />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f97316]">
                  Hampi
                </div>
                <div className="text-xs text-slate-400">Turnos</div>
              </div>
            </div>

            <nav className="mt-10 space-y-2 text-sm font-semibold text-slate-500">
              <button className="flex w-full items-center gap-3 rounded-xl bg-[#fff3e6] px-4 py-3 text-[#f97316]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#f97316]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                Citas
              </button>
            </nav>
          </div>

          <button className="flex items-center gap-3 text-sm font-semibold text-slate-400">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 17l5-5-5-5" />
                <path d="M4 12h11" />
                <path d="M20 19V5" />
              </svg>
            </span>
            Cerrar sesión
          </button>
        </aside>

        <main className="flex-1 px-10 py-8">
          <div className="flex items-start justify-between pr-20">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Bienvenido, <span className="font-bold">Nicole Salazar</span>
              </h1>
              <p className="mt-1 text-sm text-slate-400">Hampi / Tus citas</p>
            </div>
            <button className="rounded-xl border border-[#f59e0b] px-5 py-3 text-sm font-semibold text-[#f59e0b] shadow-sm transition hover:bg-[#fef3c7] mr-6 whitespace-nowrap">
              Crear Turno Adicional
            </button>
            <UserMenu />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-slate-500">
                Sede:
              </div>
              <SedeSelect />
              <FilterMenu />
            </div>
          </div>

          <div className="mt-6">
            <TurnosCalendar />
          </div>
        </main>
      </div>
    </div>
  );
}
