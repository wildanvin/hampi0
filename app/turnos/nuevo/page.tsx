'use client'

import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const CloseIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </svg>
)

const CalendarIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <rect x='3' y='4' width='18' height='18' rx='2' />
    <path d='M16 2v4M8 2v4M3 10h18' />
  </svg>
)

const dayPickerClassNames = {
  root: 'relative text-sm',
  month: 'space-y-4',
  month_caption: 'mb-3 text-sm font-semibold text-[#2b5d80]',
  caption_label: 'text-base font-semibold text-[#294864]',
  nav: 'absolute left-[9rem] top-0 flex items-center gap-2',
  button_previous:
    'flex h-8 w-8 items-center justify-center rounded-lg border border-[#d3edfc] text-[#5a87a8] transition hover:bg-[#edf7ff]',
  button_next:
    'flex h-8 w-8 items-center justify-center rounded-lg border border-[#d3edfc] text-[#5a87a8] transition hover:bg-[#edf7ff]',
  weekdays: 'w-full',
  weekday:
    'h-8 w-9 px-0 text-center align-middle text-xs font-semibold text-[#7d96ad]',
  month_grid: 'border-collapse-separate border-spacing-1',
  day: 'p-0',
  day_button:
    'flex h-9 w-9 items-center justify-center rounded-lg text-sm text-slate-700 transition hover:bg-[#d8ecfa] hover:text-[#3f7398]',
  selected: 'bg-[#b38af4] text-white hover:bg-[#9d74e8] hover:text-white',
  today: 'border border-[#bfe2f5] bg-[#e6f3fb] text-[#3f7398]',
  outside: 'text-slate-300',
}

function formatDate(date?: Date) {
  if (!date) return 'Seleccionar fecha'

  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(date)
}

export default function CrearTurnoPage() {
  const [tutorName, setTutorName] = useState('')
  const [petName, setPetName] = useState('')
  const [cedula, setCedula] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 1, 7),
  )
  const [calendarOpen, setCalendarOpen] = useState(false)

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_#ecf8ff_0%,_#dce9f5_42%,_#c8e6f8_100%)] px-6 py-10'>
      <div className='mx-auto max-w-3xl rounded-3xl border border-[#c8e6f8] bg-[#f7fcff]/95 px-8 py-7 shadow-[0_24px_50px_rgba(15,23,42,0.2)] backdrop-blur-sm'>
        <div className='flex items-start justify-between'>
          <h1 className='text-xl font-semibold text-[#6b57b8]'>
            Crear Turno Adicional
          </h1>
          <a
            href='/turnos'
            className='text-[#5f7b93] transition hover:text-[#2f5673]'
            aria-label='Cerrar'
          >
            <CloseIcon />
          </a>
        </div>

        <form className='mt-6 space-y-5'>
          <div>
            <div className='flex flex-wrap items-center gap-3 text-sm font-semibold text-[#5b4fa4]'>
              <span>Nombre del tutor</span>
              <button
                type='button'
                className='text-[#73cff5] transition hover:text-[#3fa9db]'
              ></button>
            </div>
            <input
              type='text'
              placeholder='BUSCAR NOMBRE COMPLETO'
              value={tutorName}
              onChange={(event) =>
                setTutorName(event.target.value.toUpperCase())
              }
              className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm uppercase text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
            />
          </div>

          <div>
            <div className='flex flex-wrap items-center gap-3 text-sm font-semibold text-[#5b4fa4]'>
              <span>Nombre de la mascota</span>
              <button
                type='button'
                className='text-[#73cff5] transition hover:text-[#3fa9db]'
              ></button>
            </div>
            <input
              type='text'
              placeholder='BUSCAR NOMBRE COMPLETO'
              value={petName}
              onChange={(event) => setPetName(event.target.value.toUpperCase())}
              className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm uppercase text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-[#5b4fa4]'>Sede</label>
            <select className='mt-2 w-full appearance-none rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-[#70879b] outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'>
              <option>Seleccionar Sede</option>
              <option>PUEMBO</option>
              <option>AMAGUAÑA</option>
            </select>
          </div>

          <div>
            <label className='text-sm font-semibold text-[#5b4fa4]'>
              Número de Cédula
            </label>
            <input
              type='text'
              inputMode='numeric'
              autoComplete='off'
              placeholder='0000000000'
              value={cedula}
              onChange={(event) =>
                setCedula(event.target.value.replace(/\D/g, '').slice(0, 10))
              }
              maxLength={10}
              className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-[#5b4fa4]'>
              Fecha
            </label>
            <div className='relative mt-2'>
              <button
                type='button'
                onClick={() => setCalendarOpen((current) => !current)}
                className='flex w-full items-center gap-4 rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-[#70879b] transition hover:border-[#86d4f5]'
              >
                <div className='flex-1 text-left text-slate-700'>
                  {formatDate(selectedDate)}
                </div>

                <div className='text-[#70879b]'>
                  <CalendarIcon />
                </div>
              </button>

              {calendarOpen && (
                <div className='absolute bottom-[calc(100%+10px)] left-0 z-30 rounded-2xl border border-[#d3ecfb] bg-[#f8fbff] p-4 shadow-[0_20px_40px_rgba(15,23,42,0.16)]'>
                  <DayPicker
                    mode='single'
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      setCalendarOpen(false)
                    }}
                    showOutsideDays
                    classNames={dayPickerClassNames}
                  />
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-end pt-2'>
            <button
              type='submit'
              className='w-36 rounded-xl bg-[#b38af4] py-3 text-sm font-semibold text-white transition hover:bg-[#9d74e8]'
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
