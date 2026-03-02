'use client'

import { useState } from 'react'

type Medication = {
  id: string
  label: string
  defaultChecked?: boolean
  defaultValue?: string
}

const medications: Medication[] = [
  { id: 'tramal', label: 'Tramal', defaultValue: '0' },
  { id: 'acepromacina', label: 'Acepromacina' },
  { id: 'ketamina', label: 'Ketamina' },
  { id: 'midazolam', label: 'Midazolam' },
  { id: 'ketoprofeno', label: 'Ketoprofeno', defaultValue: '0' },
  { id: 'benzapen', label: 'Benzapen' },
  { id: 'amino-vit', label: 'Amino vit' },
]

type SelectedState = Record<string, boolean>
type DosageState = Record<string, string>

function buildInitialSelectedState() {
  return medications.reduce<SelectedState>((acc, medication) => {
    acc[medication.id] = Boolean(medication.defaultChecked)
    return acc
  }, {})
}

function buildInitialDosageState() {
  return medications.reduce<DosageState>((acc, medication) => {
    acc[medication.id] = medication.defaultValue ?? ''
    return acc
  }, {})
}

export default function PharmacologySection() {
  const [selected, setSelected] = useState<SelectedState>(
    buildInitialSelectedState,
  )
  const [dosages, setDosages] = useState<DosageState>(buildInitialDosageState)

  return (
    <div className='pt-6 text-sm text-slate-700'>
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {medications.map((medication) => (
          <div
            key={medication.id}
            className={`rounded-2xl border px-4 py-4 transition ${
              selected[medication.id]
                ? 'border-[#f59e0b] bg-[#fff7ed] shadow-[0_10px_24px_rgba(245,158,11,0.12)]'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className='flex items-center gap-3'>
              <input
                id={`${medication.id}-checkbox`}
                type='checkbox'
                checked={selected[medication.id]}
                onChange={(event) =>
                  setSelected((current) => ({
                    ...current,
                    [medication.id]: event.target.checked,
                  }))
                }
                className='h-5 w-5 cursor-pointer rounded border-slate-300 text-[#f59e0b] focus:ring-[#f59e0b]'
              />

              <div className='flex min-w-0 flex-1 items-center gap-3'>
                <label
                  className='cursor-pointer text-lg font-semibold text-slate-800'
                  htmlFor={`${medication.id}-checkbox`}
                >
                  {medication.label}
                </label>

                {selected[medication.id] && (
                  <div className='flex items-center gap-2'>
                    <input
                      type='text'
                      value={dosages[medication.id]}
                      onChange={(event) =>
                        setDosages((current) => ({
                          ...current,
                          [medication.id]: event.target.value,
                        }))
                      }
                      placeholder='0'
                      className='h-10 w-24 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde6b3]'
                    />
                    <span className='text-sm font-semibold text-slate-500'>
                      ml
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
