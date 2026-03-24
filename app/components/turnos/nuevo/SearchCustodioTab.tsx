'use client'

import { type FormEvent, useState } from 'react'
import { createClient } from '@/app/utils/supabase/client'

type CustodioResult = {
  id: string
  full_name: string
  document_id: string | null
  email: string | null
}

type MascotaResult = {
  id: string
  name: string
  species: string
  sex: string
  age_years: number
  age_months: number
}

export type ExistingSelection = {
  custodio: {
    id: string
    fullName: string
    documentId: string
    email: string
  }
  mascota: {
    id: string
    name: string
    species: 'PERRO' | 'GATO'
    sex: 'macho' | 'hembra'
    ageYears: number
    ageMonths: number
  }
}

type SearchCustodioTabProps = {
  onUseSelection: (selection: ExistingSelection) => void
}

export default function SearchCustodioTab({
  onUseSelection,
}: SearchCustodioTabProps) {
  const [term, setTerm] = useState('')
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [loadingMascotas, setLoadingMascotas] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState<CustodioResult[]>([])
  const [selectedCustodio, setSelectedCustodio] = useState<CustodioResult | null>(
    null,
  )
  const [mascotas, setMascotas] = useState<MascotaResult[]>([])

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanTerm = term.trim()

    if (!cleanTerm) {
      setError('Ingresa una cédula o nombre para buscar.')
      setResults([])
      setSelectedCustodio(null)
      setMascotas([])
      return
    }

    setError('')
    setLoadingSearch(true)
    setResults([])
    setSelectedCustodio(null)
    setMascotas([])

    try {
      const supabase = createClient()
      const baseQuery = supabase
        .from('custodios')
        .select('id, full_name, document_id, email')
        .order('created_at', { ascending: false })
        .limit(10)

      const { data, error: queryError } = /^\d+$/.test(cleanTerm)
        ? await baseQuery.ilike('document_id', `%${cleanTerm}%`)
        : await baseQuery.ilike('full_name', `%${cleanTerm}%`)

      if (queryError) {
        throw queryError
      }

      setResults((data as CustodioResult[]) ?? [])
      if (!data || data.length === 0) {
        setError('No encontramos custodios con ese criterio.')
      }
    } catch (searchError) {
      const message =
        searchError instanceof Error
          ? searchError.message
          : 'No se pudo realizar la búsqueda.'
      setError(message)
    } finally {
      setLoadingSearch(false)
    }
  }

  const handleSelectCustodio = async (custodio: CustodioResult) => {
    setSelectedCustodio(custodio)
    setMascotas([])
    setError('')
    setLoadingMascotas(true)

    try {
      const supabase = createClient()
      const { data, error: petsError } = await supabase
        .from('mascotas')
        .select('id, name, species, sex, age_years, age_months')
        .eq('custodio_id', custodio.id)
        .order('created_at', { ascending: false })

      if (petsError) {
        throw petsError
      }

      setMascotas((data as MascotaResult[]) ?? [])

      if (!data || data.length === 0) {
        setError('Este custodio aún no tiene mascotas registradas.')
      }
    } catch (petsError) {
      const message =
        petsError instanceof Error
          ? petsError.message
          : 'No se pudieron cargar las mascotas.'
      setError(message)
    } finally {
      setLoadingMascotas(false)
    }
  }

  return (
    <div className='mt-6 space-y-5'>
      <form
        onSubmit={handleSearch}
        className='rounded-2xl border border-[#d8ebf8] bg-[#f4faff] p-4'
      >
        <h2 className='text-sm font-semibold text-[#6b57b8]'>
          Buscar custodio existente
        </h2>
        <p className='mt-1 text-xs text-[#6e8295]'>
          Busca por cédula o nombre y luego selecciona una mascota para cargar
          los datos al formulario de crear turno.
        </p>

        <div className='mt-4 grid gap-4 md:grid-cols-[1fr_auto]'>
          <input
            type='text'
            placeholder='Buscar por cédula o nombre'
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            className='w-full rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#86d4f5] focus:ring-2 focus:ring-[#d4efff]/45'
          />
          <button
            type='submit'
            disabled={loadingSearch}
            className='rounded-xl bg-[#7f61d7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f52c6] disabled:cursor-not-allowed disabled:opacity-70'
          >
            {loadingSearch ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {error && (
        <p className='rounded-xl border border-[#f3d5b0] bg-[#fff7e9] px-4 py-3 text-sm text-[#8c5e24]'>
          {error}
        </p>
      )}

      {results.length > 0 && (
        <div className='rounded-2xl border border-[#d8ebf8] bg-white p-4'>
          <h3 className='text-sm font-semibold text-[#5b4fa4]'>Custodios</h3>
          <div className='mt-3 space-y-2'>
            {results.map((custodio) => (
              <button
                key={custodio.id}
                type='button'
                onClick={() => void handleSelectCustodio(custodio)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  selectedCustodio?.id === custodio.id
                    ? 'border-[#b38af4] bg-[#f3ecff]'
                    : 'border-[#d3ecfb] bg-[#f8fbff] hover:border-[#a8d7f2]'
                }`}
              >
                <div className='text-sm font-semibold text-slate-700'>
                  {custodio.full_name}
                </div>
                <div className='mt-1 text-xs text-slate-500'>
                  Cédula: {custodio.document_id ?? 'Sin cédula'} · Correo:{' '}
                  {custodio.email ?? 'Sin correo'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedCustodio && (
        <div className='rounded-2xl border border-[#d8ebf8] bg-white p-4'>
          <h3 className='text-sm font-semibold text-[#5b4fa4]'>
            Mascotas de {selectedCustodio.full_name}
          </h3>

          {loadingMascotas ? (
            <p className='mt-3 text-sm text-slate-500'>Cargando mascotas...</p>
          ) : (
            <div className='mt-3 space-y-2'>
              {mascotas.map((mascota) => {
                const species =
                  mascota.species.trim().toLowerCase() === 'perro'
                    ? 'PERRO'
                    : 'GATO'
                const sex =
                  mascota.sex.trim().toLowerCase() === 'hembra'
                    ? 'hembra'
                    : 'macho'

                return (
                  <div
                    key={mascota.id}
                    className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d3ecfb] bg-[#f8fbff] px-4 py-3'
                  >
                    <div>
                      <div className='text-sm font-semibold text-slate-700'>
                        {mascota.name}
                      </div>
                      <div className='mt-1 text-xs text-slate-500'>
                        {species} · {sex.toUpperCase()} · {mascota.age_years}a{' '}
                        {mascota.age_months}m
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() =>
                        onUseSelection({
                          custodio: {
                            id: selectedCustodio.id,
                            fullName: selectedCustodio.full_name,
                            documentId: selectedCustodio.document_id ?? '',
                            email: selectedCustodio.email ?? '',
                          },
                          mascota: {
                            id: mascota.id,
                            name: mascota.name,
                            species,
                            sex,
                            ageYears: mascota.age_years ?? 0,
                            ageMonths: mascota.age_months ?? 0,
                          },
                        })
                      }
                      className='rounded-lg bg-[#b38af4] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#9d74e8]'
                    >
                      Usar en crear turno
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
