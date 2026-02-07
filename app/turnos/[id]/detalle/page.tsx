import UserMenu from "../../../components/UserMenu";
import BackToTurnosButton from "../../../components/BackToTurnosButton";
import { getCitaById } from "../../../data/citas";
import ConsultaTabs from "../../../components/ConsultaTabs";

export default async function DetalleConsultaPage({
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
          <div className="px-10 py-8">
            <h1 className="text-2xl font-semibold text-slate-900">
              Bienvenido, <span className="font-bold">Nicole Salazar</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Hampi / Tus citas / Detalle de la consulta
            </p>

            <div className="mt-8 rounded-3xl bg-white px-10 py-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <BackToTurnosButton />
                <span className="rounded-xl border border-[#fca5a5] px-4 py-2 text-sm font-semibold text-[#ef4444]">
                  Asistió pero no se atendió
                </span>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
                <div className="flex flex-col items-center border-r border-slate-200 pr-8">
                  <div className="grid h-40 w-40 place-items-center rounded-full bg-[#f59e0b] text-white">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="8" r="3" />
                      <circle cx="17" cy="10" r="3" />
                      <path d="M5 20a4 4 0 0 1 8 0" />
                      <path d="M13 20a4 4 0 0 1 6 0" />
                    </svg>
                  </div>
                  <div className="mt-4 text-center text-sm font-semibold text-slate-700">
                    {cita.mascota}
                  </div>
                  <div className="text-sm text-slate-500">{cita.tipo}</div>
                </div>

                <div className="space-y-6 text-sm text-slate-600">
                  <div className="grid gap-6 lg:grid-cols-4">
                    <div className="font-semibold text-slate-700 underline">
                      Datos ficha clínica
                    </div>
                    <div />
                    <div />
                    <div />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-4">
                    <div>
                      <div className="font-semibold text-slate-700">
                        Nro. Historia clínica
                      </div>
                      <input
                        type="text"
                        placeholder="00000000"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Lugar</div>
                      <div className="mt-3">{cita.lugar}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Fecha</div>
                      <div className="mt-3">{cita.hora}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Nro. Ficha día
                      </div>
                      <input
                        type="text"
                        defaultValue={cita.badge}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-4">
                    <div className="font-semibold text-slate-700 underline">
                      Datos del Custodio
                    </div>
                    <div />
                    <div />
                    <div />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-4">
                    <div>
                      <div className="font-semibold text-slate-700">Nombre</div>
                      <input
                        type="text"
                        defaultValue={cita.custodio.split(" ")[0]}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Apellidos
                      </div>
                      <input
                        type="text"
                        defaultValue={cita.custodio.split(" ").slice(1).join(" ")}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Fecha de nacimiento
                      </div>
                      <input
                        type="text"
                        defaultValue="06/27/1994"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Documento de identidad
                      </div>
                      <input
                        type="text"
                        defaultValue="1722959879"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-4">
                    <div className="font-semibold text-slate-700 underline">
                      Datos del Animal
                    </div>
                    <div />
                    <div />
                    <div />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-4">
                    <div>
                      <div className="font-semibold text-slate-700">Nombre</div>
                      <input
                        type="text"
                        defaultValue={cita.mascota}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Especie</div>
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
                        <option>{cita.tipo.split(" - ")[0]}</option>
                      </select>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">
                        Edad en el momento de la cita
                      </div>
                      <input
                        type="text"
                        defaultValue={cita.tipo.split(" - ")[1]?.split(" ")[0]}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Sexo</div>
                      <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
                        <option>{cita.sexo}</option>
                      </select>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-700">Peso</div>
                      <div className="mt-3">{cita.peso}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ConsultaTabs />
          </div>
        </main>
      </div>
    </div>
  );
}
