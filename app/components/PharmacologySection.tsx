'use client'

import { useEffect, useMemo, useState } from 'react'

type PharmacologySectionProps = {
  especie: string
  sexo: string
  peso: string | number
}

type ProfileKey =
  | 'canino_hembra'
  | 'canino_macho'
  | 'felino_hembra'
  | 'felino_macho'

type Rule =
  | { type: 'formula'; factor: number }
  | { type: 'manual' }
  | { type: 'hidden' }

type Medication = {
  id: string
  label: string
  section: 'obligatorio' | 'adicional'
  rules: Record<ProfileKey, Rule>
}

type SelectedState = Record<string, boolean>
type DosageState = Record<string, string>

const FORMULA = (factor: number): Rule => ({ type: 'formula', factor })
const MANUAL: Rule = { type: 'manual' }
const HIDDEN: Rule = { type: 'hidden' }

const medications: Medication[] = [
  {
    id: 'acepromacina-obligatorio',
    label: 'Acepromacina',
    section: 'obligatorio',
    rules: {
      canino_hembra: FORMULA(0.1),
      canino_macho: FORMULA(0.1),
      felino_hembra: FORMULA(0.1),
      felino_macho: FORMULA(0.1),
    },
  },
  {
    id: 'tramal-obligatorio',
    label: 'Tramal',
    section: 'obligatorio',
    rules: {
      canino_hembra: HIDDEN,
      canino_macho: HIDDEN,
      felino_hembra: FORMULA(0.04),
      felino_macho: FORMULA(0.04),
    },
  },
  {
    id: 'ketamina-obligatorio',
    label: 'Ketamina',
    section: 'obligatorio',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
  {
    id: 'midazolam-obligatorio',
    label: 'Midazolam',
    section: 'obligatorio',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: HIDDEN,
      felino_macho: HIDDEN,
    },
  },
  {
    id: 'benzapen-obligatorio',
    label: 'Benzapen',
    section: 'obligatorio',
    rules: {
      canino_hembra: FORMULA(0.1),
      canino_macho: FORMULA(0.1),
      felino_hembra: FORMULA(0.1),
      felino_macho: FORMULA(0.1),
    },
  },
  {
    id: 'lidocaina-obligatorio',
    label: 'Lidocaina',
    section: 'obligatorio',
    rules: {
      canino_hembra: HIDDEN,
      canino_macho: MANUAL,
      felino_hembra: HIDDEN,
      felino_macho: HIDDEN,
    },
  },
  {
    id: 'hepatomic-adicional',
    label: 'Hepatomic',
    section: 'adicional',
    rules: {
      canino_hembra: FORMULA(0.1),
      canino_macho: FORMULA(0.1),
      felino_hembra: FORMULA(0.1),
      felino_macho: FORMULA(0.1),
    },
  },
  {
    id: 'catosal-adicional',
    label: 'Catosal',
    section: 'adicional',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
  {
    id: 'aminovit-adicional',
    label: 'Aminovit',
    section: 'adicional',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
  {
    id: 'dextrosa-adicional',
    label: 'Dextrosa',
    section: 'adicional',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
  {
    id: 'quercetol-adicional',
    label: 'Quercetol (Etamsilato)',
    section: 'adicional',
    rules: {
      canino_hembra: FORMULA(0.125),
      canino_macho: FORMULA(0.125),
      felino_hembra: FORMULA(0.125),
      felino_macho: FORMULA(0.125),
    },
  },
  {
    id: 'meloxicam-adicional',
    label: 'Meloxicam 0.5%',
    section: 'adicional',
    rules: {
      canino_hembra: FORMULA(0.04),
      canino_macho: FORMULA(0.04),
      felino_hembra: FORMULA(0.04),
      felino_macho: FORMULA(0.04),
    },
  },
  {
    id: 'propofol-adicional',
    label: 'Propofol',
    section: 'adicional',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
  {
    id: 'viviram-adicional',
    label: 'Viviram (Doxapram)',
    section: 'adicional',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
  {
    id: 'atropina-adicional',
    label: 'Atropina',
    section: 'adicional',
    rules: {
      canino_hembra: FORMULA(0.044),
      canino_macho: FORMULA(0.044),
      felino_hembra: FORMULA(0.044),
      felino_macho: FORMULA(0.044),
    },
  },
  {
    id: 'epinefrina-adicional',
    label: 'Epinefrina',
    section: 'adicional',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
  {
    id: 'dexametasona-adicional',
    label: 'Dexametasona',
    section: 'adicional',
    rules: {
      canino_hembra: MANUAL,
      canino_macho: MANUAL,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
  {
    id: 'midazolam-adicional',
    label: 'Midazolam',
    section: 'adicional',
    rules: {
      canino_hembra: HIDDEN,
      canino_macho: HIDDEN,
      felino_hembra: MANUAL,
      felino_macho: MANUAL,
    },
  },
]

function parseWeight(peso: string | number): number {
  if (typeof peso === 'number') return Number.isFinite(peso) ? peso : 0

  const cleaned = peso.replace(',', '.').match(/(\d+(\.\d+)?)/)?.[0]
  if (!cleaned) return 0

  const value = Number(cleaned)
  return Number.isFinite(value) ? value : 0
}

function normalizeSpecies(especie: string): 'canino' | 'felino' {
  return especie.trim().toLowerCase() === 'gato' ? 'felino' : 'canino'
}

function normalizeSex(sexo: string): 'hembra' | 'macho' {
  return sexo.trim().toLowerCase() === 'hembra' ? 'hembra' : 'macho'
}

function formatMl(value: number): string {
  return value.toFixed(3).replace(/\.?0+$/, '')
}

function calculateDose(rule: Rule, weight: number): string {
  if (rule.type !== 'formula' || weight <= 0) return ''
  return formatMl(weight * rule.factor)
}

function getProfileKey(especie: string, sexo: string): ProfileKey {
  return `${normalizeSpecies(especie)}_${normalizeSex(sexo)}` as ProfileKey
}

function buildInitialState(
  profileKey: ProfileKey,
  weight: number,
): { selected: SelectedState; dosages: DosageState } {
  const selected: SelectedState = {}
  const dosages: DosageState = {}

  for (const medication of medications) {
    const rule = medication.rules[profileKey]
    if (rule.type === 'hidden') continue

    selected[medication.id] = medication.section === 'obligatorio'
    dosages[medication.id] = calculateDose(rule, weight)
  }

  return { selected, dosages }
}

function MedicationCard({
  medication,
  checked,
  dosage,
  onToggle,
  onDosageChange,
}: {
  medication: Medication
  checked: boolean
  dosage: string
  onToggle: (checked: boolean) => void
  onDosageChange: (value: string) => void
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-4 transition ${
        checked
          ? 'border-[#f59e0b] bg-[#fff7ed] shadow-[0_10px_24px_rgba(245,158,11,0.12)]'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className='flex items-center gap-3'>
        <input
          id={`${medication.id}-checkbox`}
          type='checkbox'
          checked={checked}
          onChange={(event) => onToggle(event.target.checked)}
          className='h-5 w-5 cursor-pointer rounded border-slate-300 text-[#f59e0b] focus:ring-[#f59e0b]'
        />

        <div className='flex min-w-0 flex-1 items-center gap-3'>
          <label
            className='cursor-pointer text-lg font-semibold text-slate-800'
            htmlFor={`${medication.id}-checkbox`}
          >
            {medication.label}
          </label>

          {checked && (
            <div className='flex items-center gap-2'>
              <input
                type='text'
                value={dosage}
                onChange={(event) => onDosageChange(event.target.value)}
                placeholder='0'
                className='h-10 w-24 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde6b3]'
              />
              <span className='text-sm font-semibold text-slate-500'>ml</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PharmacologySection({
  especie,
  sexo,
  peso,
}: PharmacologySectionProps) {
  const profileKey = useMemo(() => getProfileKey(especie, sexo), [especie, sexo])
  const weight = useMemo(() => parseWeight(peso), [peso])

  const visibleMedications = useMemo(
    () =>
      medications.filter((medication) => {
        const rule = medication.rules[profileKey]
        return rule.type !== 'hidden'
      }),
    [profileKey],
  )

  const initialState = useMemo(
    () => buildInitialState(profileKey, weight),
    [profileKey, weight],
  )

  const [selected, setSelected] = useState<SelectedState>(initialState.selected)
  const [dosages, setDosages] = useState<DosageState>(initialState.dosages)

  useEffect(() => {
    setSelected(initialState.selected)
    setDosages(initialState.dosages)
  }, [initialState])

  const mandatory = visibleMedications.filter(
    (medication) => medication.section === 'obligatorio',
  )
  const additional = visibleMedications.filter(
    (medication) => medication.section === 'adicional',
  )

  return (
    <div className='space-y-8 pt-6 text-sm text-slate-700'>
      <section>
        <h3 className='mb-4 text-base font-semibold text-slate-800'>
          Farmacos de uso obligatorio
        </h3>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {mandatory.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              checked={Boolean(selected[medication.id])}
              dosage={dosages[medication.id] ?? ''}
              onToggle={(checked) =>
                setSelected((current) => ({
                  ...current,
                  [medication.id]: checked,
                }))
              }
              onDosageChange={(value) =>
                setDosages((current) => ({
                  ...current,
                  [medication.id]: value,
                }))
              }
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className='mb-4 text-base font-semibold text-slate-800'>
          Farmacos adicionales
        </h3>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {additional.map((medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              checked={Boolean(selected[medication.id])}
              dosage={dosages[medication.id] ?? ''}
              onToggle={(checked) =>
                setSelected((current) => ({
                  ...current,
                  [medication.id]: checked,
                }))
              }
              onDosageChange={(value) =>
                setDosages((current) => ({
                  ...current,
                  [medication.id]: value,
                }))
              }
            />
          ))}
        </div>
      </section>
    </div>
  )
}
