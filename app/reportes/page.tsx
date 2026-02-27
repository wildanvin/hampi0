const resumen = [
  {
    title: "Citas Agendadas",
    value: "10375",
    color: "bg-[#c47a2a]",
  },
  {
    title: "Atenciones Completadas",
    value: "7760",
    color: "bg-[#6b7f2e]",
  },
  {
    title: "No Asistieron",
    value: "2148",
    color: "bg-[#e25555]",
  },
  {
    title: "Asistieron / No atendidos",
    value: "448",
    color: "bg-[#1f2937]",
  },
];

const caninos = [
  { label: "Machos", value: "1351", color: "bg-[#1f8ab9]" },
  { label: "Hembras", value: "3247", color: "bg-[#6a7f2f]" },
  { label: "Gestantes", value: "78", color: "bg-[#b7b7b7]" },
  { label: "No Nacidos", value: "497", color: "bg-[#b7b7b7]" },
  { label: "Piometras", value: "19", color: "bg-[#b7b7b7]" },
  { label: "Tumores", value: "9", color: "bg-[#b7b7b7]" },
  { label: "Desparasitados", value: "1770", color: "bg-[#b7b7b7]" },
  { label: "Vacunados", value: "1551", color: "bg-[#b7b7b7]" },
];

const felinos = [
  { label: "Machos", value: "1196", color: "bg-[#1f8ab9]" },
  { label: "Hembras", value: "1966", color: "bg-[#6a7f2f]" },
  { label: "Gestantes", value: "117", color: "bg-[#b7b7b7]" },
  { label: "No Nacidos", value: "504", color: "bg-[#b7b7b7]" },
  { label: "Piometras", value: "8", color: "bg-[#b7b7b7]" },
  { label: "Tumores", value: "0", color: "bg-[#b7b7b7]" },
  { label: "Desparasitados", value: "876", color: "bg-[#b7b7b7]" },
  { label: "Vacunados", value: "611", color: "bg-[#b7b7b7]" },
];

export default function ReportesPage() {
  return (
    <div className="min-h-screen bg-[#f8f4ef]">
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-lg space-y-3">
                <h1 className="text-3xl font-semibold text-[#f39a1d]">
                  REPORTE DE ATENCION
                </h1>
                <div>
                  <p className="text-sm font-semibold text-[#7a5b2f]">
                    Seleccione la parroquia:
                  </p>
                  <div className="mt-2 flex w-64 items-center justify-between rounded-xl border border-[#e3d5c2] bg-white px-4 py-2 text-sm text-[#c47a2a] shadow-sm">
                    <span>All</span>
                    <span className="text-[#c47a2a]">▾</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#5a8fab]">
                    Seleccione la fecha:
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="rounded-full bg-[#d9ecf7] px-3 py-1 text-xs font-semibold text-[#3c7aa1]">
                      Ano
                    </span>
                    <div className="flex items-center gap-2 rounded-xl border border-[#dfe6ec] bg-white px-3 py-2">
                      <span>2025</span>
                      <span>▾</span>
                    </div>
                    <span className="rounded-full bg-[#d9ecf7] px-3 py-1 text-xs font-semibold text-[#3c7aa1]">
                      Mes
                    </span>
                    <div className="flex items-center gap-2 rounded-xl border border-[#dfe6ec] bg-white px-3 py-2">
                      <span>All</span>
                      <span>▾</span>
                    </div>
                    <span className="rounded-full bg-[#d9ecf7] px-3 py-1 text-xs font-semibold text-[#3c7aa1]">
                      Dia
                    </span>
                    <div className="flex items-center gap-2 rounded-xl border border-[#dfe6ec] bg-white px-3 py-2">
                      <span>All</span>
                      <span>▾</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
                {resumen.map((item) => (
                  <div
                    key={item.title}
                    className={`${item.color} flex items-center justify-between rounded-2xl px-5 py-4 text-white shadow-md`}
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
                        {item.title}
                      </p>
                      <p className="text-2xl font-semibold">{item.value}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                      <span className="text-sm font-semibold">INFO</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/80 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#c47a2a]/15 text-lg font-semibold text-[#c47a2a]">
                  CAN
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#c47a2a]">
                    Total Caninos
                  </p>
                  <p className="text-3xl font-semibold text-[#c47a2a]">4598</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {caninos.map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} rounded-2xl px-4 py-3 text-white shadow-sm`}
                  >
                    <p className="text-xs font-semibold">{item.label}</p>
                    <p className="text-xl font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white/80 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6a7f2f]/15 text-lg font-semibold text-[#6a7f2f]">
                  FEL
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#6a7f2f]">
                    Total Felinos
                  </p>
                  <p className="text-3xl font-semibold text-[#6a7f2f]">3162</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {felinos.map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} rounded-2xl px-4 py-3 text-white shadow-sm`}
                  >
                    <p className="text-xs font-semibold">{item.label}</p>
                    <p className="text-xl font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
