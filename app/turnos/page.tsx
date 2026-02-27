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
        <main className="flex-1 px-10 py-8">
          <div className="flex items-start justify-between pr-20">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Bienvenido, <span className="font-bold">Nicole Salazar</span>
              </h1>
              <p className="mt-1 text-sm text-slate-400">Hampi / Tus citas</p>
            </div>
            <a
              href="/turnos/nuevo"
              className="rounded-xl border border-[#f59e0b] px-5 py-3 text-sm font-semibold text-[#f59e0b] shadow-sm transition hover:bg-[#fef3c7] mr-6 whitespace-nowrap"
            >
              Crear Turno Adicional
            </a>
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
