import Link from "next/link";

const PawMark = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
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

const InputIconMail = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
    <path d="m22 8-10 6L2 8" />
  </svg>
);

const InputIconLock = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const InputIconEye = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f6fb]">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-12 lg:px-10">
        <section className="w-full max-w-xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#fff3e6] shadow-sm">
              <PawMark />
            </div>
            <div>
              <div className="text-lg font-semibold uppercase tracking-[0.18em] text-[#f97316]">
                Hampi
              </div>
              <div className="text-sm text-slate-500">
                Plataforma de turnos
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              ¡Bienvenido a Hampi!
            </h1>
            <p className="text-base text-slate-500">
              Inicia sesión en tu cuenta
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-600">
                Correo electrónico
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <InputIconMail />
                </span>
                <input
                  type="email"
                  placeholder="tucorreo@hampi.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/15"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Contraseña
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <InputIconLock />
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/15"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <InputIconEye />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#f59e0b] focus:ring-[#f59e0b]"
                />
                Recordarme
              </label>
              <button
                type="button"
                className="font-semibold text-[#f97316] transition hover:text-[#ea580c]"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Link
              href="/turnos"
              className="mt-6 block w-full rounded-xl bg-slate-100 py-3 text-center text-sm font-semibold text-slate-400 shadow-inner"
            >
              Iniciar sesión
            </Link>
          </form>
        </section>

        {/* <section className="relative hidden w-full max-w-xl lg:block">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[36px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]" />

          <div className="relative z-10 rounded-[32px] bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
            

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between bg-[#0b1f38] px-5 py-4 text-white">
                <div className="text-sm font-display font-bold uppercase tracking-wide">
                  Jornadas de esterilización
                </div>
                <div className="rounded-full bg-[#f59e0b] px-3 py-1 text-xs font-bold text-[#0b1f38]">
                  ¡Gratuita!
                </div>
              </div>
              <div className="grid grid-cols-[1.1fr_0.9fr] gap-4 px-5 py-6">
                <div>
                  <div className="text-2xl font-display font-bold text-[#f97316]">
                    Huellas
                  </div>
                  <div className="text-2xl font-display font-extrabold text-slate-900">
                    RESPONSABLES
                  </div>
                  <div className="text-lg font-medium text-slate-500">
                    En tu
                    <span className="ml-2 text-xl font-display font-bold text-[#1f9ac8]">
                      ENTORNO
                    </span>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="relative mt-8 h-52">
              <div className="absolute right-2 top-2 h-40 w-40 rounded-full bg-gradient-to-br from-[#fde68a] via-[#f97316] to-[#f97316]/40 opacity-60 blur-2xl" />
              <div className="absolute left-6 top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#93c5fd] via-[#22c55e] to-[#f59e0b] opacity-50 blur-2xl" />
              <div className="absolute inset-x-8 bottom-0 h-44 rounded-[28px] bg-gradient-to-br from-[#fef3c7] via-[#fde68a] to-[#fed7aa] shadow-lg">
                <div className="absolute -top-6 right-10 h-24 w-24 rounded-full bg-white/60 blur-xl" />
                <div className="absolute left-6 top-10 h-20 w-20 rounded-full bg-white/40" />
                <div className="absolute right-16 top-8 h-28 w-28 rounded-full bg-white/60" />
                <div className="absolute left-8 bottom-8 text-sm font-semibold text-[#0b1f38]">
                  
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
