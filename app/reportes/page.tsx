'use client'

import { useMemo, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import BackToTurnosButton from '../components/BackToTurnosButton'
import 'react-day-picker/dist/style.css'

const parroquias = [
  'AMAGUAÑA',
  'NONO',
  'SAN JOSÉ DE AYORA',
  'ZAMBIZA',
  'CANGAHUA',
  'CHECA',
  'PUEMBO',
  'EL QUINCHE',
  'SANTA ROSA DE CUZUBAMBA',
  'ASCÁZUBI',
  'TUMBACO',
  'CALDERON PUNTO 1',
  'CALDERON PUNTO 2',
  'CONOCOTO',
] as const

const sexOptions = ['Todos', 'Macho', 'Hembra'] as const

type MetricCard = {
  label: string
  value: string
  color: string
}

type ReportSnapshot = {
  resumen: Array<{
    title: string
    value: string
    color: string
  }>
  caninosTotal: string
  felinosTotal: string
  caninos: MetricCard[]
  felinos: MetricCard[]
}

const dayPickerClassNames = {
  root: 'text-base',
  month: 'space-y-4',
  month_caption:
    'flex items-center justify-between text-base font-semibold text-slate-700 mb-4',
  caption_label: 'text-[18px] font-semibold text-slate-800',
  nav: 'flex items-center gap-2',
  button_previous:
    'flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50',
  button_next:
    'flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50',
  weekdays: 'w-full',
  weekday:
    'h-10 w-12 px-0 text-center align-middle text-sm font-semibold text-slate-400',
  month_grid: 'border-collapse-separate border-spacing-2',
  week: '',
  day: 'p-0',
  day_button:
    'flex h-12 w-12 items-center justify-center rounded-xl text-base text-slate-700 transition hover:bg-[#fff7ed] hover:text-[#f59e0b]',
  selected:
    'bg-[#f59e0b] text-white hover:bg-[#f59e0b] hover:text-white',
  today: 'border border-[#fcd9a6] bg-[#fff7ed] text-[#f59e0b]',
  outside: 'text-slate-300',
}

const reportData: Record<(typeof sexOptions)[number], ReportSnapshot> = {
  Todos: {
    resumen: [
      { title: 'Citas Agendadas', value: '10375', color: 'bg-[#c47a2a]' },
      {
        title: 'Atenciones Completadas',
        value: '7760',
        color: 'bg-[#6b7f2e]',
      },
      { title: 'No Asistieron', value: '2148', color: 'bg-[#e25555]' },
      {
        title: 'Asistieron / No atendidos',
        value: '448',
        color: 'bg-[#1f2937]',
      },
    ],
    caninosTotal: '4598',
    felinosTotal: '3162',
    caninos: [
      { label: 'Machos', value: '1351', color: 'bg-[#1f8ab9]' },
      { label: 'Hembras', value: '3247', color: 'bg-[#6a7f2f]' },
      { label: 'Gestantes', value: '78', color: 'bg-[#b7b7b7]' },
      { label: 'No Nacidos', value: '497', color: 'bg-[#b7b7b7]' },
      { label: 'Piometras', value: '19', color: 'bg-[#b7b7b7]' },
      { label: 'Tumores', value: '9', color: 'bg-[#b7b7b7]' },
      { label: 'Desparasitados', value: '1770', color: 'bg-[#b7b7b7]' },
      { label: 'Vacunados', value: '1551', color: 'bg-[#b7b7b7]' },
    ],
    felinos: [
      { label: 'Machos', value: '1196', color: 'bg-[#1f8ab9]' },
      { label: 'Hembras', value: '1966', color: 'bg-[#6a7f2f]' },
      { label: 'Gestantes', value: '117', color: 'bg-[#b7b7b7]' },
      { label: 'No Nacidos', value: '504', color: 'bg-[#b7b7b7]' },
      { label: 'Piometras', value: '8', color: 'bg-[#b7b7b7]' },
      { label: 'Tumores', value: '0', color: 'bg-[#b7b7b7]' },
      { label: 'Desparasitados', value: '876', color: 'bg-[#b7b7b7]' },
      { label: 'Vacunados', value: '611', color: 'bg-[#b7b7b7]' },
    ],
  },
  Macho: {
    resumen: [
      { title: 'Citas Agendadas', value: '4890', color: 'bg-[#c47a2a]' },
      {
        title: 'Atenciones Completadas',
        value: '3522',
        color: 'bg-[#6b7f2e]',
      },
      { title: 'No Asistieron', value: '1084', color: 'bg-[#e25555]' },
      {
        title: 'Asistieron / No atendidos',
        value: '156',
        color: 'bg-[#1f2937]',
      },
    ],
    caninosTotal: '1351',
    felinosTotal: '1196',
    caninos: [
      { label: 'Machos', value: '1351', color: 'bg-[#1f8ab9]' },
      { label: 'No Nacidos', value: '0', color: 'bg-[#b7b7b7]' },
      { label: 'Piometras', value: '0', color: 'bg-[#b7b7b7]' },
      { label: 'Tumores', value: '2', color: 'bg-[#b7b7b7]' },
      { label: 'Desparasitados', value: '824', color: 'bg-[#b7b7b7]' },
      { label: 'Vacunados', value: '710', color: 'bg-[#b7b7b7]' },
    ],
    felinos: [
      { label: 'Machos', value: '1196', color: 'bg-[#1f8ab9]' },
      { label: 'No Nacidos', value: '0', color: 'bg-[#b7b7b7]' },
      { label: 'Piometras', value: '0', color: 'bg-[#b7b7b7]' },
      { label: 'Tumores', value: '0', color: 'bg-[#b7b7b7]' },
      { label: 'Desparasitados', value: '451', color: 'bg-[#b7b7b7]' },
      { label: 'Vacunados', value: '318', color: 'bg-[#b7b7b7]' },
    ],
  },
  Hembra: {
    resumen: [
      { title: 'Citas Agendadas', value: '5485', color: 'bg-[#c47a2a]' },
      {
        title: 'Atenciones Completadas',
        value: '4238',
        color: 'bg-[#6b7f2e]',
      },
      { title: 'No Asistieron', value: '1064', color: 'bg-[#e25555]' },
      {
        title: 'Asistieron / No atendidos',
        value: '292',
        color: 'bg-[#1f2937]',
      },
    ],
    caninosTotal: '3247',
    felinosTotal: '1966',
    caninos: [
      { label: 'Hembras', value: '3247', color: 'bg-[#6a7f2f]' },
      { label: 'Gestantes', value: '78', color: 'bg-[#b7b7b7]' },
      { label: 'No Nacidos', value: '497', color: 'bg-[#b7b7b7]' },
      { label: 'Piometras', value: '19', color: 'bg-[#b7b7b7]' },
      { label: 'Tumores', value: '7', color: 'bg-[#b7b7b7]' },
      { label: 'Desparasitados', value: '946', color: 'bg-[#b7b7b7]' },
      { label: 'Vacunados', value: '841', color: 'bg-[#b7b7b7]' },
    ],
    felinos: [
      { label: 'Hembras', value: '1966', color: 'bg-[#6a7f2f]' },
      { label: 'Gestantes', value: '117', color: 'bg-[#b7b7b7]' },
      { label: 'No Nacidos', value: '504', color: 'bg-[#b7b7b7]' },
      { label: 'Piometras', value: '8', color: 'bg-[#b7b7b7]' },
      { label: 'Tumores', value: '0', color: 'bg-[#b7b7b7]' },
      { label: 'Desparasitados', value: '425', color: 'bg-[#b7b7b7]' },
      { label: 'Vacunados', value: '293', color: 'bg-[#b7b7b7]' },
    ],
  },
}

export default function ReportesPage() {
  const [selectedParroquia, setSelectedParroquia] = useState('All')
  const [selectedSex, setSelectedSex] =
    useState<(typeof sexOptions)[number]>('Todos')
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(2025, 0, 1),
  )
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 11, 31))
  const [openPicker, setOpenPicker] = useState<'from' | 'to' | null>(null)

  const snapshot = useMemo(() => reportData[selectedSex], [selectedSex])

  function formatDate(date?: Date) {
    if (!date) return 'Seleccionar fecha'

    return new Intl.DateTimeFormat('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  }

  return (
    <div className='min-h-screen bg-[#f8f4ef]'>
      <div className='min-h-screen px-6 py-10'>
        <div className='mx-auto flex w-full max-w-6xl flex-col gap-9'>
          <BackToTurnosButton />

          <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap items-start justify-between gap-6'>
              <div className='max-w-lg space-y-5'>
                <h1 className='text-3xl font-semibold text-[#f39a1d]'>
                  REPORTE DE ATENCIÓN
                </h1>

                <div>
                  <p className='text-sm font-semibold text-[#7a5b2f]'>
                    Seleccione la parroquia:
                  </p>
                  <select
                    value={selectedParroquia}
                    onChange={(event) =>
                      setSelectedParroquia(event.target.value)
                    }
                    className='mt-2 w-72 rounded-xl border border-[#e3d5c2] bg-white px-4 py-2 text-sm text-[#c47a2a] shadow-sm outline-none transition focus:border-[#f39a1d]'
                  >
                    <option value='All'>All</option>
                    {parroquias.map((parroquia) => (
                      <option key={parroquia} value={parroquia}>
                        {parroquia}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className='text-sm font-semibold text-[#5a8fab]'>
                    Seleccione la fecha:
                  </p>
                  <div className='mt-3 grid gap-4 md:grid-cols-2'>
                    <div className='relative'>
                      <button
                        type='button'
                        onClick={() =>
                          setOpenPicker((current) =>
                            current === 'from' ? null : 'from',
                          )
                        }
                        className='flex w-full items-center justify-between rounded-2xl border border-[#dfe6ec] bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#c9d6e2]'
                      >
                        <div className='flex flex-col gap-1'>
                          <span className='rounded-full bg-[#d9ecf7] px-3 py-1 text-xs font-semibold text-[#3c7aa1] w-fit'>
                            Desde
                          </span>
                          <span className='text-sm font-semibold text-slate-600'>
                            {formatDate(fromDate)}
                          </span>
                        </div>
                        <span className='text-slate-400'>▾</span>
                      </button>

                      {openPicker === 'from' && (
                        <div className='absolute left-0 top-[calc(100%+10px)] z-20 rounded-3xl border border-[#dfe6ec] bg-white p-5 shadow-xl'>
                          <DayPicker
                            mode='single'
                            selected={fromDate}
                            onSelect={(date) => {
                              setFromDate(date)
                              setOpenPicker(null)
                            }}
                            showOutsideDays
                            className='text-base'
                            classNames={dayPickerClassNames}
                          />
                        </div>
                      )}
                    </div>

                    <div className='relative'>
                      <button
                        type='button'
                        onClick={() =>
                          setOpenPicker((current) =>
                            current === 'to' ? null : 'to',
                          )
                        }
                        className='flex w-full items-center justify-between rounded-2xl border border-[#dfe6ec] bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#c9d6e2]'
                      >
                        <div className='flex flex-col gap-1'>
                          <span className='rounded-full bg-[#d9ecf7] px-3 py-1 text-xs font-semibold text-[#3c7aa1] w-fit'>
                            Hasta
                          </span>
                          <span className='text-sm font-semibold text-slate-600'>
                            {formatDate(toDate)}
                          </span>
                        </div>
                        <span className='text-slate-400'>▾</span>
                      </button>

                      {openPicker === 'to' && (
                        <div className='absolute left-0 top-[calc(100%+10px)] z-20 rounded-3xl border border-[#dfe6ec] bg-white p-5 shadow-xl'>
                          <DayPicker
                            mode='single'
                            selected={toDate}
                            onSelect={(date) => {
                              setToDate(date)
                              setOpenPicker(null)
                            }}
                            showOutsideDays
                            className='text-base'
                            classNames={dayPickerClassNames}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type='button'
                    className='mt-4 rounded-2xl bg-[#f59e0b] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(245,158,11,0.25)] transition hover:bg-[#e68a00] hover:shadow-[0_14px_28px_rgba(245,158,11,0.32)]'
                  >
                    Consultar
                  </button>
                </div>

                <div>
                  <p className='text-sm font-semibold text-[#5a8fab]'>
                    Filtros:
                  </p>
                  <div className='mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500'>
                    <span className='rounded-full bg-[#d9ecf7] px-3 py-1 text-xs font-semibold text-[#3c7aa1]'>
                      Sexo
                    </span>
                    <select
                      value={selectedSex}
                      onChange={(event) =>
                        setSelectedSex(
                          event.target.value as (typeof sexOptions)[number],
                        )
                      }
                      className='min-w-40 rounded-xl border border-[#dfe6ec] bg-white px-4 py-2 text-sm text-slate-600 outline-none transition focus:border-[#3c7aa1]'
                    >
                      {sexOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className='grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2'>
                {snapshot.resumen.map((item) => (
                  <div
                    key={item.title}
                    className={`${item.color} flex items-center justify-between rounded-2xl px-5 py-4 text-white shadow-md`}
                  >
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-wide text-white/80'>
                        {item.title}
                      </p>
                      <p className='text-2xl font-semibold'>{item.value}</p>
                    </div>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white'>
                      <span className='text-sm font-semibold'>INFO</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='grid gap-6 lg:grid-cols-2'>
            <div className='rounded-3xl bg-white/80 p-6 shadow-sm'>
              <div className='flex items-center gap-4'>
                <div className='flex h-20 w-20 items-center justify-center rounded-full bg-[#c47a2a]/15 text-lg font-semibold text-[#c47a2a]'>
                  CAN
                </div>
                <div>
                  <p className='text-sm font-semibold text-[#c47a2a]'>
                    Total Caninos
                  </p>
                  <p className='text-3xl font-semibold text-[#c47a2a]'>
                    {snapshot.caninosTotal}
                  </p>
                </div>
              </div>
              <div className='mt-6 grid grid-cols-2 gap-4'>
                {snapshot.caninos.map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} rounded-2xl px-4 py-3 text-white shadow-sm`}
                  >
                    <p className='text-xs font-semibold'>{item.label}</p>
                    <p className='text-xl font-semibold'>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='rounded-3xl bg-white/80 p-6 shadow-sm'>
              <div className='flex items-center gap-4'>
                <div className='flex h-20 w-20 items-center justify-center rounded-full bg-[#6a7f2f]/15 text-lg font-semibold text-[#6a7f2f]'>
                  FEL
                </div>
                <div>
                  <p className='text-sm font-semibold text-[#6a7f2f]'>
                    Total Felinos
                  </p>
                  <p className='text-3xl font-semibold text-[#6a7f2f]'>
                    {snapshot.felinosTotal}
                  </p>
                </div>
              </div>
              <div className='mt-6 grid grid-cols-2 gap-4'>
                {snapshot.felinos.map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} rounded-2xl px-4 py-3 text-white shadow-sm`}
                  >
                    <p className='text-xs font-semibold'>{item.label}</p>
                    <p className='text-xl font-semibold'>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
