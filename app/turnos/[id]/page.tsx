import UserMenu from "../../components/UserMenu";
import BackToTurnosButton from "../../components/BackToTurnosButton";
import { getCitaById } from "../../data/citas";

export default async function CitaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const cita = getCitaById(resolvedParams.id) ?? getCitaById("cita-13")!;
  return (
    <div className="min-h-screen bg-[#f7ead5]">
      <div className="flex min-h-screen">
        <aside className="flex w-64 flex-col justify-between border-r border-slate-200 bg-white px-6 py-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff3e6]">
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
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f97316]">
                  Hampi
                </div>
                <div className="text-xs text-slate-400">Turnos</div>
              </div>
            </div>

            <nav className="mt-10 space-y-2 text-sm font-semibold text-slate-500">
              <a
                href="/turnos"
                className="flex w-full items-center gap-3 rounded-xl bg-[#fff3e6] px-4 py-3 text-[#f97316]"
              >
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
              </a>
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

        <main className="flex-1">
          <UserMenu />
          <div className="relative px-10 py-8">
            
            <h1 className="text-2xl font-semibold text-slate-900">
              Bienvenido, <span className="font-bold">Nicole Salazar</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Hampi / Tus citas / Información del paciente
            </p>

            <div className="mt-8 rounded-3xl bg-white px-10 py-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <BackToTurnosButton />

              <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
                <div className="flex flex-col items-center border-r border-slate-200 pr-8">
                  <div className="grid h-40 w-40 place-items-center rounded-full border border-slate-200 text-sm text-slate-400">
                    Añadir imagen
                  </div>
                  <div className="mt-4 text-center text-sm font-semibold text-slate-700">
                    {cita.mascota}
                  </div>
                  <div className="text-sm text-slate-500">{cita.tipo}</div>
                </div>

                <div className="grid gap-6 text-sm text-slate-600 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-slate-700">
                        Fecha de la consulta
                      </div>
                      <div>{cita.fecha}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Custodio</div>
                      <div>{cita.custodio}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Sexo</div>
                      <div>{cita.sexo}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Peso</div>
                      <div>{cita.peso}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Documentos del paciente
                      </div>
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
                        <option>Selecciona la acción que deseas realizar</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-slate-700">Hora</div>
                      <div>{cita.hora}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Lugar</div>
                      <div>{cita.lugar}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Código HC</div>
                      <div>{cita.codigo}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Número de Cédula
                      </div>
                      <input
                        type="text"
                        placeholder="000000"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={`/turnos/${resolvedParams.id}/detalle`}
                className="rounded-xl bg-[#f59e0b] px-6 py-3 text-sm font-semibold text-white shadow-sm"
              >
                Ir a detalle de la consulta
              </a>
            </div>
          </div>
        </main>
      </div>

      <div className="sr-only">ID de cita: {resolvedParams.id}</div>
    </div>
  );
}
