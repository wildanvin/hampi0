import UserMenu from '../../../components/UserMenu'
import BackToTurnosButton from '../../../components/BackToTurnosButton'
import { getCitaById } from '../../../data/citas'
import ConsultaTabs from '../../../components/ConsultaTabs'

export default async function DetalleConsultaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const cita = getCitaById(resolvedParams.id) ?? getCitaById('cita-13')!

  return (
    <div className='min-h-screen bg-[#f3fbff]'>
      <div className='flex min-h-screen'>
        <main className='flex-1'>
          <UserMenu />
          <div className='px-10 py-8'>
            <h1 className='text-2xl font-semibold text-slate-900'>
              Bienvenido, <span className='font-bold'>Nicole Salazar</span>
            </h1>
            <p className='mt-1 text-sm text-slate-500'>
              Hampi / Tus citas / Detalle de la consulta
            </p>

            <div className='mt-8 rounded-3xl bg-white px-10 py-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]'>
              <div className='flex items-center justify-between'>
                <BackToTurnosButton />
                <span className='rounded-xl border border-[#fca5a5] px-4 py-2 text-sm font-semibold text-[#ef4444]'>
                  Asistió pero no se atendió
                </span>
              </div>

              <div className='mt-8 grid gap-8 lg:grid-cols-[220px_1fr]'>
                <div className='flex flex-col items-center border-r border-slate-200 pr-8'>
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
                </div>

                <div className='space-y-6 text-sm text-slate-600'>
                  <div className='grid gap-6 lg:grid-cols-4'>
                    <div className='font-semibold text-slate-700 underline'>
                      Datos ficha clínica
                    </div>
                    <div />
                    <div />
                    <div />
                  </div>

                  <div className='grid gap-6 lg:grid-cols-4'>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Nro. Historia clínica
                      </div>
                      <input
                        type='text'
                        placeholder='0000000000'
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>Lugar</div>
                      <div className='mt-3'>{cita.lugar}</div>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>Fecha</div>
                      <div className='mt-3'>{cita.hora}</div>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Nro. Ficha día
                      </div>
                      <input
                        type='text'
                        defaultValue={cita.badge}
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                  </div>

                  <div className='grid gap-6 lg:grid-cols-4'>
                    <div className='font-semibold text-slate-700 underline'>
                      Datos del Custodio
                    </div>
                    <div />
                    <div />
                    <div />
                  </div>

                  <div className='grid gap-6 lg:grid-cols-4'>
                    <div>
                      <div className='font-semibold text-slate-700'>Nombre</div>
                      <input
                        type='text'
                        defaultValue={cita.custodio.split(' ')[0]}
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Apellidos
                      </div>
                      <input
                        type='text'
                        defaultValue={cita.custodio
                          .split(' ')
                          .slice(1)
                          .join(' ')}
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Fecha de nacimiento
                      </div>
                      <input
                        type='text'
                        defaultValue='06/27/1994'
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Documento de identidad
                      </div>
                      <input
                        type='text'
                        defaultValue='1722959879'
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                  </div>

                  <div className='grid gap-6 lg:grid-cols-4'>
                    <div className='font-semibold text-slate-700 underline'>
                      Datos del Animal
                    </div>
                    <div />
                    <div />
                    <div />
                  </div>

                  <div className='grid gap-6 lg:grid-cols-4'>
                    <div>
                      <div className='font-semibold text-slate-700'>Nombre</div>
                      <input
                        type='text'
                        defaultValue={cita.mascota}
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Especie
                      </div>
                      <select
                        defaultValue={cita.especie}
                        className='mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500'
                      >
                        <option>Perro</option>
                        <option>Gato</option>
                      </select>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>
                        Edad en el momento de la cita
                      </div>
                      <input
                        type='text'
                        defaultValue={cita.edad}
                        className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-500'
                      />
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>Sexo</div>
                      <select
                        defaultValue={cita.sexo}
                        className='mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500'
                      >
                        <option>Macho</option>
                        <option>Hembra</option>
                      </select>
                    </div>
                    <div>
                      <div className='font-semibold text-slate-700'>Peso</div>
                      <div className='mt-3'>{cita.peso}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ConsultaTabs
              sexo={cita.sexo}
              especie={cita.especie}
              peso={cita.peso}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
