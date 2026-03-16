'use client'

import { useState } from 'react'
import PharmacologySection from './PharmacologySection'
import VitalsSection from './VitalsSection'

const tabs = [
  'Evaluación clínica',
  'Fármacos',
  'Operatorio',
  //'Insumos administrados',
] as const

type TabKey = (typeof tabs)[number]

type ConsultaTabsProps = {
  sexo: string
  especie: string
  peso: string | number
}

const anamnesisQuestions = [
  { key: 'ayuno-prolongado', label: 'Ayuno prolongado?' },
  { key: 'vacunas', label: 'Vacunas?' },
  { key: 'desparacitacion', label: 'Desparacitacion?' },
  { key: 'vomitos-diarrea', label: 'Vomitos o diarrea?' },
  { key: 'toser-estornudar', label: 'Toser o estornudar?' },
  { key: 'inapetencia-decaimiento', label: 'Inapetencia y decaimiento?' },
] as const

export default function ConsultaTabs({
  sexo,
  especie,
  peso,
}: ConsultaTabsProps) {
  const [active, setActive] = useState<TabKey>('Evaluación clínica')
  const isFemale = sexo.trim().toLowerCase() === 'hembra'

  return (
    <div className='mt-10 rounded-3xl bg-white px-8 py-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]'>
      <div className='flex flex-wrap items-center gap-3 border-b border-slate-200 pb-3 text-sm font-semibold text-slate-400'>
        {tabs.map((tab) => (
          <button
            key={tab}
            type='button'
            onClick={() => setActive(tab)}
            className={`rounded-xl px-4 py-2 transition ${
              active === tab
                ? 'bg-[#f59e0b] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 'Evaluación clínica' && (
        <div className='pt-6 text-sm text-slate-600'>
          <h3 className='mb-6 font-semibold text-slate-800'>
            Anamnesis animal
          </h3>
          <div className='grid gap-6 lg:grid-cols-3'>
            {anamnesisQuestions.map((question) => (
              <div key={question.key}>
                <div className='font-semibold text-slate-700'>
                  {question.label}
                </div>
                <div className='mt-2 flex gap-4'>
                  <label className='inline-flex items-center gap-2'>
                    <input type='radio' name={question.key} />
                    Si
                  </label>
                  <label className='inline-flex items-center gap-2'>
                    <input type='radio' name={question.key} defaultChecked />
                    No
                  </label>
                </div>
              </div>
            ))}

            {isFemale && (
              <div>
                <div className='font-semibold text-slate-700'>
                  Celo presente?
                </div>
                <div className='mt-2 flex gap-4'>
                  <label className='inline-flex items-center gap-2'>
                    <input type='radio' name='celo-presente' />
                    Si
                  </label>
                  <label className='inline-flex items-center gap-2'>
                    <input type='radio' name='celo-presente' defaultChecked />
                    No
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className='mt-6'>
            <div className='font-semibold text-slate-700'>
              Observación adicional del veterinario
            </div>
            <textarea
              className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500'
              rows={3}
              placeholder='Escriba aqui...'
            />
          </div>

          <VitalsSection />
        </div>
      )}

      {active === 'Fármacos' && (
        <PharmacologySection especie={especie} sexo={sexo} peso={peso} />
      )}

      {active === 'Operatorio' && (
        <div className='pt-6 text-sm text-slate-600'>
          <h3 className='mb-6 font-semibold text-slate-800'>Información</h3>
          <div className='grid gap-6 lg:grid-cols-2'>
            <div>
              <div className='font-semibold text-slate-700'>
                ¿Animal presentó quistes?
              </div>
              <div className='mt-2 flex gap-4'>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='quistes' />
                  Si
                </label>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='quistes' defaultChecked />
                  No
                </label>
              </div>
            </div>
            <div>
              <div className='font-semibold text-slate-700'>
                ¿Animal presentó piometra?
              </div>
              <div className='mt-2 flex gap-4'>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='piometra' />
                  Si
                </label>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='piometra' defaultChecked />
                  No
                </label>
              </div>
            </div>
            <div>
              <div className='font-semibold text-slate-700'>
                ¿Su mascota ha presentado vómito o diarrea?
              </div>
              <div className='mt-2 flex gap-4'>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='vomito2' />
                  Si
                </label>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='vomito2' defaultChecked />
                  No
                </label>
              </div>
            </div>
            <div>
              <div className='font-semibold text-slate-700'>
                ¿Presentó tumor?
              </div>
              <select className='mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500'>
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
          </div>

          <div className='mt-6'>
            <div className='font-semibold text-slate-700'>
              Observación adicional del veterinario
            </div>
            <textarea
              className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500'
              rows={3}
              placeholder='Escriba aqui...'
            />
          </div>
        </div>
      )}

      {/* {active === 'Insumos administrados' && (
        <div className='pt-6 text-sm text-slate-600'>
          <div className='flex items-center justify-between'>
            <div className='font-semibold text-slate-800'>
              Insumos Aplicados
            </div>
            <button className='rounded-xl border border-[#f59e0b] px-4 py-2 text-xs font-semibold text-[#f59e0b]'>
              Agregar insumo
            </button>
          </div>
          <div className='mt-4'>
            <label className='text-xs font-semibold text-slate-600'>
              jeringas aguja descartable 3ml (Unidad)
            </label>
            <input
              type='text'
              defaultValue='0.00'
              className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
            />
          </div>
        </div>
      )} */}
    </div>
  )
}
