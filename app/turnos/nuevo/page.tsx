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
  month_caption: 'mb-3 text-sm font-semibold text-slate-700',
  caption_label: 'text-base font-semibold text-slate-800',
  nav: 'absolute left-[9rem] top-0 flex items-center gap-2',
  button_previous:
    'flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50',
  button_next:
    'flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50',
  weekdays: 'w-full',
  weekday:
    'h-8 w-9 px-0 text-center align-middle text-xs font-semibold text-slate-400',
  month_grid: 'border-collapse-separate border-spacing-1',
  day: 'p-0',
  day_button:
    'flex h-9 w-9 items-center justify-center rounded-lg text-sm text-slate-700 transition hover:bg-[#fff7ed] hover:text-[#f59e0b]',
  selected: 'bg-[#f59e0b] text-white hover:bg-[#f59e0b] hover:text-white',
  today: 'border border-[#fcd9a6] bg-[#fff7ed] text-[#f59e0b]',
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
    <div className='min-h-screen bg-[#2f2f2f] px-6 py-10'>
      <div className='mx-auto max-w-3xl rounded-3xl bg-white px-8 py-7 shadow-[0_30px_80px_rgba(15,23,42,0.35)]'>
        <div className='flex items-start justify-between'>
          <h1 className='text-xl font-semibold text-slate-900'>
            Crear Turno Adicional
          </h1>
          <a
            href='/turnos'
            className='text-slate-500 transition hover:text-slate-700'
            aria-label='Cerrar'
          >
            <CloseIcon />
          </a>
        </div>

        <form className='mt-6 space-y-5'>
          <div>
            <div className='flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700'>
              <span>Nombre del tutor</span>
              <button
                type='button'
                className='text-[#f59e0b] transition hover:text-[#f97316]'
              ></button>
            </div>
            <input
              type='text'
              placeholder='BUSCAR NOMBRE COMPLETO'
              value={tutorName}
              onChange={(event) =>
                setTutorName(event.target.value.toUpperCase())
              }
              className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase text-slate-700 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20'
            />
          </div>

          <div>
            <div className='flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700'>
              <span>Nombre de la mascota</span>
              <button
                type='button'
                className='text-[#f59e0b] transition hover:text-[#f97316]'
              ></button>
            </div>
            <input
              type='text'
              placeholder='BUSCAR NOMBRE COMPLETO'
              value={petName}
              onChange={(event) => setPetName(event.target.value.toUpperCase())}
              className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase text-slate-700 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20'
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-slate-700'>Sede</label>
            <select className='mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20'>
              <option>Seleccionar Sede</option>
              <option>PUEMBO</option>
              <option>AMAGUAÑA</option>
            </select>
          </div>

          <div>
            <label className='text-sm font-semibold text-slate-700'>
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
              className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-400 outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20'
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-slate-700'>
              Fecha
            </label>
            <div className='relative mt-2'>
              <button
                type='button'
                onClick={() => setCalendarOpen((current) => !current)}
                className='flex w-full items-center gap-4 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500 transition hover:border-slate-300'
              >
                <div className='flex-1 text-left text-slate-700'>
                  {formatDate(selectedDate)}
                </div>

                <div className='text-slate-500'>
                  <CalendarIcon />
                </div>
              </button>

              {calendarOpen && (
                <div className='absolute bottom-[calc(100%+10px)] left-0 z-30 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_40px_rgba(15,23,42,0.12)]'>
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
              className='w-36 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-400'
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
