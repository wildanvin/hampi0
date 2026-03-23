'use client'

import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { createClient } from '@/app/utils/supabase/client'
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

const SelectChevronIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='m6 9 6 6 6-6' />
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

const sedes = [
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
]

const hourOptions = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
)

const minuteOptions = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, '0'),
)

const selectClassName =
  'mt-2 w-full appearance-none rounded-xl border border-[#c3dbef] bg-[#eef8ff] px-4 py-3 pr-11 text-sm font-medium text-[#47627c] outline-none transition hover:border-[#9ac8e8] focus:border-[#8cbeed] focus:ring-2 focus:ring-[#d7ebfa]'

const timeSelectClassName =
  'w-full appearance-none rounded-lg border border-[#c3dbef] bg-[#eef8ff] px-3 py-2 pr-10 text-sm font-medium text-[#47627c] outline-none transition hover:border-[#9ac8e8] focus:border-[#8cbeed] focus:ring-2 focus:ring-[#d7ebfa]'

export default function CrearTurnoPage() {
  const [activeTab, setActiveTab] = useState<'crear' | 'buscar'>('crear')
  const [tutorName, setTutorName] = useState('')
  const [petName, setPetName] = useState('')
  const [cedula, setCedula] = useState('')
  const [email, setEmail] = useState('')
  const [species, setSpecies] = useState('GATO')
  const [sex, setSex] = useState<'macho' | 'hembra'>('macho')
  const [ageYears, setAgeYears] = useState('1')
  const [ageMonths, setAgeMonths] = useState('0')
  const [sede, setSede] = useState('PUEMBO')
  const [hour12, setHour12] = useState('06')
  const [minutes, setMinutes] = useState('55')
  const [amPm, setAmPm] = useState<'AM' | 'PM'>('AM')
  const [searchCustodio, setSearchCustodio] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 1, 7),
  )
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [timePickerOpen, setTimePickerOpen] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const datePickerRef = useRef<HTMLDivElement>(null)
  const timePickerRef = useRef<HTMLDivElement>(null)

  const startDate = useMemo(() => {
    if (!selectedDate) return null
    const baseHour = Number(hour12) % 12
    const hours24 = amPm === 'PM' ? baseHour + 12 : baseHour
    const date = new Date(selectedDate)
    date.setHours(hours24, Number(minutes), 0, 0)
    return date
  }, [amPm, hour12, minutes, selectedDate])

  const startsAtPreview = useMemo(() => {
    if (!startDate) return '--'
    return `${formatDate(startDate)} ${hour12}:${minutes} ${amPm}`
  }, [amPm, hour12, minutes, startDate])

  const handleCreateTurno = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')
    setIsSubmitting(true)

    try {
      if (!startDate) {
        throw new Error('Selecciona una fecha válida.')
      }

      const supabase = createClient()
      const tutorFullName = tutorName.trim()
      const mascotaName = petName.trim()
      const documentId = cedula.trim() || null
      const normalizedEmail = email.trim().toLowerCase() || null

      if (!tutorFullName || !mascotaName) {
        throw new Error('Completa los campos obligatorios.')
      }

      let custodioId: string | null = null

      if (documentId) {
        const { data } = await supabase
          .from('custodios')
          .select('id')
          .eq('document_id', documentId)
          .maybeSingle()
        custodioId = data?.id ?? null
      }

      if (!custodioId && normalizedEmail) {
        const { data } = await supabase
          .from('custodios')
          .select('id')
          .eq('email', normalizedEmail)
          .maybeSingle()
        custodioId = data?.id ?? null
      }

      if (custodioId) {
        const { error: updateCustodioError } = await supabase
          .from('custodios')
          .update({
            full_name: tutorFullName,
            document_id: documentId,
            email: normalizedEmail,
          })
          .eq('id', custodioId)

        if (updateCustodioError) {
          throw updateCustodioError
        }
      } else {
        const { data: newCustodio, error: insertCustodioError } = await supabase
          .from('custodios')
          .insert({
            full_name: tutorFullName,
            document_id: documentId,
            email: normalizedEmail,
          })
          .select('id')
          .single()

        if (insertCustodioError) {
          throw insertCustodioError
        }

        custodioId = newCustodio.id
      }

      const ageYearsValue = Number.parseInt(ageYears, 10)
      const ageMonthsValue = Number.parseInt(ageMonths, 10)
      const safeAgeYears = Number.isNaN(ageYearsValue) ? 0 : Math.max(0, ageYearsValue)
      const safeAgeMonths = Number.isNaN(ageMonthsValue)
        ? 0
        : Math.min(11, Math.max(0, ageMonthsValue))

      const { data: mascotaData, error: mascotaError } = await supabase
        .from('mascotas')
        .insert({
          custodio_id: custodioId,
          name: mascotaName,
          species: species.toLowerCase(),
          sex,
          age_years: safeAgeYears,
          age_months: safeAgeMonths,
        })
        .select('id')
        .single()

      if (mascotaError) {
        throw mascotaError
      }

      let sedeId: string | null = null
      const { data: sedeFound, error: sedeFindError } = await supabase
        .from('sedes')
        .select('id')
        .eq('name', sede)
        .maybeSingle()

      if (sedeFindError) {
        throw sedeFindError
      }

      sedeId = sedeFound?.id ?? null

      if (!sedeId) {
        const { data: sedeInserted, error: sedeInsertError } = await supabase
          .from('sedes')
          .insert({ name: sede })
          .select('id')
          .single()

        if (sedeInsertError) {
          throw sedeInsertError
        }

        sedeId = sedeInserted.id
      }

      const endsAt = new Date(startDate.getTime() + 30 * 60 * 1000)

      const { error: turnoError } = await supabase.from('turnos').insert({
        mascota_id: mascotaData.id,
        custodio_id: custodioId,
        sede_id: sedeId,
        starts_at: startDate.toISOString(),
        ends_at: endsAt.toISOString(),
        status: 'agendada',
        document_id: documentId,
      })

      if (turnoError) {
        throw turnoError
      }

      setSubmitSuccess('Turno creado correctamente.')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se pudo crear el turno. Intenta nuevamente.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSearchCustodio = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowSearchResult(true)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const targetNode = event.target as Node

      if (
        calendarOpen &&
        datePickerRef.current &&
        !datePickerRef.current.contains(targetNode)
      ) {
        setCalendarOpen(false)
      }

      if (
        timePickerOpen &&
        timePickerRef.current &&
        !timePickerRef.current.contains(targetNode)
      ) {
        setTimePickerOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [calendarOpen, timePickerOpen])

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

        <div className='mt-6'>
          <div className='flex flex-wrap gap-2 border-b border-[#d3ecfb] pb-3'>
            <button
              type='button'
              onClick={() => setActiveTab('crear')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'crear'
                  ? 'bg-[#a887ee] text-white shadow-[0_8px_18px_rgba(114,85,196,0.35)]'
                  : 'bg-[#edf6fd] text-[#65819b] hover:bg-[#e3f0fb]'
              }`}
            >
              Crear turno
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('buscar')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'buscar'
                  ? 'bg-[#a887ee] text-white shadow-[0_8px_18px_rgba(114,85,196,0.35)]'
                  : 'bg-[#edf6fd] text-[#65819b] hover:bg-[#e3f0fb]'
              }`}
            >
              Buscar custodio
            </button>
          </div>

          {activeTab === 'crear' ? (
            <form onSubmit={handleCreateTurno} className='mt-6 space-y-5'>
              <div className='rounded-2xl border border-[#d8ebf8] bg-[#f4faff] p-4'>
                <h2 className='text-sm font-semibold text-[#6b57b8]'>
                  Datos del custodio
                </h2>

                <div className='mt-3 grid gap-4 md:grid-cols-2'>
                  <div className='md:col-span-2'>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Nombre completo
                    </label>
                    <input
                      type='text'
                      placeholder='Nombre'
                      value={tutorName}
                      onChange={(event) =>
                        setTutorName(event.target.value.toUpperCase())
                      }
                      className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm uppercase text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
                      required
                    />
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
                        setCedula(
                          event.target.value.replace(/\D/g, '').slice(0, 10),
                        )
                      }
                      maxLength={10}
                      required
                      className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
                    />
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Correo electrónico
                    </label>
                    <input
                      type='email'
                      placeholder='correo@dominio.com'
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}'
                      title='Ingresa un correo electrónico válido, por ejemplo: nombre@dominio.com'
                      className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
                    />
                  </div>
                </div>
              </div>

              <div className='rounded-2xl border border-[#d8ebf8] bg-[#f4faff] p-4'>
                <h2 className='text-sm font-semibold text-[#6b57b8]'>
                  Datos de la mascota
                </h2>

                <div className='mt-3 grid gap-4 md:grid-cols-2'>
                  <div className='md:col-span-2'>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Nombre de la mascota
                    </label>
                    <input
                      type='text'
                      placeholder='Nombre'
                      value={petName}
                      onChange={(event) =>
                        setPetName(event.target.value.toUpperCase())
                      }
                      className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm uppercase text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
                      required
                    />
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Especie
                    </label>
                    <div className='relative'>
                      <select
                        value={species}
                        onChange={(event) => setSpecies(event.target.value)}
                        className={selectClassName}
                      >
                        <option value='PERRO'>PERRO</option>
                        <option value='GATO'>GATO</option>
                      </select>
                      <span className='pointer-events-none absolute right-4 top-[1.1rem] text-[#7b5ece]'>
                        <SelectChevronIcon />
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Sexo
                    </label>
                    <div className='relative'>
                      <select
                        value={sex}
                        onChange={(event) =>
                          setSex(event.target.value as 'macho' | 'hembra')
                        }
                        className={`${selectClassName} uppercase`}
                      >
                        <option value='macho'>MACHO</option>
                        <option value='hembra'>HEMBRA</option>
                      </select>
                      <span className='pointer-events-none absolute right-4 top-[1.1rem] text-[#7b5ece]'>
                        <SelectChevronIcon />
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Edad (años)
                    </label>
                    <input
                      type='number'
                      min={0}
                      step={1}
                      value={ageYears}
                      onChange={(event) => setAgeYears(event.target.value)}
                      className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
                    />
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Edad (meses)
                    </label>
                    <input
                      type='number'
                      min={0}
                      step={1}
                      max={11}
                      value={ageMonths}
                      onChange={(event) => setAgeMonths(event.target.value)}
                      className='mt-2 w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
                    />
                  </div>
                </div>
              </div>

              <div className='rounded-2xl border border-[#d8ebf8] bg-[#f4faff] p-4'>
                <h2 className='text-sm font-semibold text-[#6b57b8]'>
                  Datos del turno
                </h2>

                <div className='mt-3 grid gap-4 md:grid-cols-2'>
                  <div>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Sede
                    </label>
                    <div className='relative'>
                      <select
                        value={sede}
                        onChange={(event) => setSede(event.target.value)}
                        className={selectClassName}
                      >
                        {sedes.map((sedeOption) => (
                          <option key={sedeOption} value={sedeOption}>
                            {sedeOption}
                          </option>
                        ))}
                      </select>
                      <span className='pointer-events-none absolute right-4 top-[1.1rem] text-[#7b5ece]'>
                        <SelectChevronIcon />
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Fecha
                    </label>
                    <div ref={datePickerRef} className='relative mt-2'>
                      <button
                        type='button'
                        onClick={() => {
                          setCalendarOpen((current) => !current)
                          setTimePickerOpen(false)
                        }}
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

                  <div>
                    <label className='text-sm font-semibold text-[#5b4fa4]'>
                      Hora
                    </label>
                    <div ref={timePickerRef} className='relative mt-2'>
                      <button
                        type='button'
                        onClick={() => {
                          setTimePickerOpen((currentOpen) => !currentOpen)
                          setCalendarOpen(false)
                        }}
                        className='flex w-full items-center gap-4 rounded-xl border border-[#c3dbef] bg-[#eef8ff] px-4 py-3 text-sm font-medium text-[#47627c] transition hover:border-[#9ac8e8]'
                      >
                        <div className='flex-1 text-left'>
                          {hour12}:{minutes} {amPm}
                        </div>
                        <span className='text-[#7b5ece]'>
                          <SelectChevronIcon />
                        </span>
                      </button>

                      {timePickerOpen && (
                        <div className='absolute bottom-[calc(100%+10px)] left-0 z-30 w-full rounded-2xl border border-[#d3ecfb] bg-[#f8fbff] p-4 shadow-[0_20px_40px_rgba(15,23,42,0.16)]'>
                          <div className='space-y-3'>
                            <div className='grid grid-cols-[70px_1fr] items-center gap-3'>
                              <span className='text-xs font-semibold uppercase tracking-wide text-[#6e87a1]'>
                                Hora
                              </span>
                              <div className='relative'>
                                <select
                                  value={hour12}
                                  onChange={(event) =>
                                    setHour12(event.target.value)
                                  }
                                  className={timeSelectClassName}
                                >
                                  {hourOptions.map((hourOption) => (
                                    <option
                                      key={hourOption}
                                      value={hourOption}
                                    >
                                      {hourOption}
                                    </option>
                                  ))}
                                </select>
                                <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7b5ece]'>
                                  <SelectChevronIcon />
                                </span>
                              </div>
                            </div>

                            <div className='grid grid-cols-[70px_1fr] items-center gap-3'>
                              <span className='text-xs font-semibold uppercase tracking-wide text-[#6e87a1]'>
                                Min
                              </span>
                              <div className='relative'>
                                <select
                                  value={minutes}
                                  onChange={(event) =>
                                    setMinutes(event.target.value)
                                  }
                                  className={timeSelectClassName}
                                >
                                  {minuteOptions.map((minuteOption) => (
                                    <option
                                      key={minuteOption}
                                      value={minuteOption}
                                    >
                                      {minuteOption}
                                    </option>
                                  ))}
                                </select>
                                <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7b5ece]'>
                                  <SelectChevronIcon />
                                </span>
                              </div>
                            </div>

                            <div className='grid grid-cols-[70px_1fr] items-center gap-3'>
                              <span className='text-xs font-semibold uppercase tracking-wide text-[#6e87a1]'>
                                Formato
                              </span>
                              <div className='relative'>
                                <select
                                  value={amPm}
                                  onChange={(event) =>
                                    setAmPm(event.target.value as 'AM' | 'PM')
                                  }
                                  className={timeSelectClassName}
                                >
                                  <option value='AM'>AM</option>
                                  <option value='PM'>PM</option>
                                </select>
                                <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7b5ece]'>
                                  <SelectChevronIcon />
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            type='button'
                            onClick={() => setTimePickerOpen(false)}
                            className='mt-4 w-full rounded-lg bg-[#b38af4] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#9d74e8]'
                          >
                            Listo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className='mt-4 rounded-xl border border-[#d3ecfb] bg-[#eef8ff] px-3 py-2 text-xs text-[#4f6f8a]'>
                  Inicio de turno: <span className='font-semibold'>{startsAtPreview}</span>
                </p>
              </div>

              <div className='flex justify-end pt-2'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-40 rounded-xl bg-[#b38af4] py-3 text-sm font-semibold text-white transition hover:bg-[#9d74e8]'
                >
                  {isSubmitting ? 'Guardando...' : 'Crear turno'}
                </button>
              </div>

              {submitError && (
                <p className='rounded-xl border border-[#f3b0b0] bg-[#ffe9e9] px-4 py-3 text-sm text-[#a24747]'>
                  {submitError}
                </p>
              )}

              {submitSuccess && (
                <p className='rounded-xl border border-[#b6e4d3] bg-[#ebfff6] px-4 py-3 text-sm text-[#2a6e57]'>
                  {submitSuccess}
                </p>
              )}
            </form>
          ) : (
            <form onSubmit={handleSearchCustodio} className='mt-6 space-y-5'>
              <div className='rounded-2xl border border-[#d8ebf8] bg-[#f4faff] p-4'>
                <h2 className='text-sm font-semibold text-[#6b57b8]'>
                  Buscar custodio existente
                </h2>
                <p className='mt-1 text-xs text-[#6e8295]'>
                  Esta pestaña se usará para reutilizar custodios ya creados.
                </p>

                <div className='mt-4 grid gap-4 md:grid-cols-[1fr_auto]'>
                  <input
                    type='text'
                    placeholder='Buscar por cédula o nombre'
                    value={searchCustodio}
                    onChange={(event) => setSearchCustodio(event.target.value)}
                    className='w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
                  />
                  <button
                    type='submit'
                    className='rounded-xl bg-[#7f61d7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f52c6]'
                  >
                    Buscar
                  </button>
                </div>
              </div>

              {showSearchResult && (
                <div className='rounded-2xl border border-dashed border-[#c6def0] bg-[#eff8ff] px-4 py-6 text-sm text-[#57718a]'>
                  No hay resultados conectados todavía. En el siguiente paso
                  integramos esta búsqueda con Supabase.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
