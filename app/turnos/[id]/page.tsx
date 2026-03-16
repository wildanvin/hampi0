import UserMenu from '../../components/UserMenu'
import BackToTurnosButton from '../../components/BackToTurnosButton'
import { getCitaById } from '../../data/citas'

export default async function CitaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const cita = getCitaById(resolvedParams.id) ?? getCitaById('cita-13')!
  return (
    <div className='min-h-screen bg-[#e7edf4]'>
      <div className='flex min-h-screen'>
        <main className='flex-1'>
          <UserMenu />
          <div className='relative px-10 py-8'>
            <h1 className='text-2xl font-semibold text-slate-900'>
              Bienvenido, <span className='font-bold'>Nicole Salazar</span>
            </h1>
            <p className='mt-1 text-sm text-slate-500'>
              Hampi / Tus citas / Información del paciente
            </p>

            <div className='mt-8 rounded-3xl bg-white px-10 py-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]'>
              <BackToTurnosButton />

              <div className='mt-6 grid gap-8 lg:grid-cols-[220px_1fr]'>
                <div className='flex flex-col items-center border-r border-slate-200 pr-8'>
                  <div className='grid h-40 w-40 place-items-center rounded-full border border-slate-200 text-sm text-slate-400'>
                    Añadir imagen
                  </div>

                  <div className='mt-4 text-center text-sm font-semibold text-slate-700'>
                    {cita.mascota}
                  </div>
                  <div className='text-sm text-slate-500'>
                    {cita.especie} - {cita.edad} años
                  </div>
                </div>

                <div className='grid gap-6 text-sm text-slate-600 lg:grid-cols-2'>
                  <div className='space-y-4'>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Fecha de la consulta
                      </div>
                      <div>{cita.fecha}</div>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Custodio
                      </div>
                      <div>{cita.custodio}</div>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>Sexo</div>
                      <div>{cita.sexo}</div>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>Peso</div>
                      <div>{cita.peso}</div>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Documentos del paciente
                      </div>
                      <select className='mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500'>
                        <option>
                          Selecciona la acción que deseas realizar
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <div className='font-semibold text-slate-700'>Hora</div>
                      <div>{cita.hora}</div>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>Lugar</div>
                      <div>{cita.lugar}</div>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Número de Cédula
                      </div>
                      <input
                        type='text'
                        placeholder='000000'
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 flex justify-end'>
              <a
                href={`/turnos/${resolvedParams.id}/detalle`}
                className='rounded-xl bg-[#4a86b8] px-6 py-3 text-sm font-semibold text-white shadow-sm'
              >
                Ir a detalle de la consulta
              </a>
            </div>
          </div>
        </main>
      </div>

      <div className='sr-only'>ID de cita: {resolvedParams.id}</div>
    </div>
  )
}
