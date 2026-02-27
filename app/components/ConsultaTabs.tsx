'use client'

import { useState } from 'react'

const tabs = [
  'Evaluación clínica',
  'Fármacos',
  'Operatorio',
  'Insumos administrados',
] as const

type TabKey = (typeof tabs)[number]

export default function ConsultaTabs() {
  const [active, setActive] = useState<TabKey>('Evaluación clínica')

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
            <div>
              <div className='font-semibold text-slate-700'>
                ¿A que hora comió su mascota?
              </div>
              <div className='mt-2 flex gap-4'>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='comida' defaultChecked />
                  Ayuno normal
                </label>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='comida' />
                  Ayuno prolongado
                </label>
              </div>
            </div>
            <div>
              <div className='font-semibold text-slate-700'>
                ¿Su mascota tiene vacunas?
              </div>
              <div className='mt-2 flex gap-4'>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='vacunas' />
                  Si
                </label>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='vacunas' defaultChecked />
                  No
                </label>
              </div>
            </div>
            <div>
              <div className='font-semibold text-slate-700'>
                ¿Su mascota tiene desparacitaciones?
              </div>
              <div className='mt-2 flex gap-4'>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='despara' />
                  Si
                </label>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='despara' defaultChecked />
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
                  <input type='radio' name='vomito' />
                  Si
                </label>
                <label className='inline-flex items-center gap-2'>
                  <input type='radio' name='vomito' defaultChecked />
                  No
                </label>
              </div>
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

          <div className='mt-8'>
            <div className='mb-4 font-semibold text-slate-700'>
              Constantes fisiológicas
            </div>
            <div className='grid gap-4 lg:grid-cols-3'>
              <div>
                <label className='text-xs font-semibold text-slate-600'>
                  Temperatura (°C)
                </label>
                <input
                  type='text'
                  defaultValue='38'
                  className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
                />
              </div>
              <div>
                <label className='text-xs font-semibold text-slate-600'>
                  Frecuencia cardiaca
                </label>
                <input
                  type='text'
                  defaultValue='120'
                  className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
                />
              </div>
              <div>
                <label className='text-xs font-semibold text-slate-600'>
                  Frecuencia respiratoria
                </label>
                <input
                  type='text'
                  defaultValue='30'
                  className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
                />
              </div>
              <div>
                <label className='text-xs font-semibold text-slate-600'>
                  Peso (Kg)
                </label>
                <input
                  type='text'
                  defaultValue='3'
                  className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {active === 'Fármacos' && (
        <div className='pt-6 text-sm text-slate-600'>
          <div className='flex items-center justify-between'>
            <div className='font-semibold text-slate-800'>Pre-Anestésicos</div>
            <button className='rounded-xl border border-[#f59e0b] px-4 py-2 text-xs font-semibold text-[#f59e0b]'>
              Agregar fármaco
            </button>
          </div>
          <div className='mt-4 grid gap-4 lg:grid-cols-2'>
            <div>
              <label className='text-xs font-semibold text-slate-600'>
                Tramal (ml)
              </label>
              <input
                type='text'
                defaultValue='0'
                className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
              />
            </div>
            <div>
              <label className='text-xs font-semibold text-slate-600'>
                Acepromacina (ml)
              </label>
              <input
                type='text'
                defaultValue='0'
                className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
              />
            </div>
          </div>

          <div className='mt-6 border-t border-slate-200 pt-6'>
            <div className='font-semibold text-slate-800'>Anestésicos</div>
            <div className='mt-4 grid gap-4 lg:grid-cols-2'>
              <div>
                <label className='text-xs font-semibold text-slate-600'>
                  Ketamina 100 (ml)
                </label>
                <input
                  type='text'
                  defaultValue='0'
                  className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
                />
              </div>
              <div>
                <label className='text-xs font-semibold text-slate-600'>
                  Midazolam (ml)
                </label>
                <input
                  type='text'
                  defaultValue='0'
                  className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
                />
              </div>
            </div>
          </div>

          <div className='mt-6 border-t border-slate-200 pt-6'>
            <div className='font-semibold text-slate-800'>Analgésicos</div>
            <div className='mt-4'>
              <label className='text-xs font-semibold text-slate-600'>
                ketoprofeno (ml)
              </label>
              <input
                type='text'
                defaultValue='0'
                className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
              />
            </div>
          </div>

          <div className='mt-6 border-t border-slate-200 pt-6'>
            <div className='font-semibold text-slate-800'>Antibioticos</div>
            <div className='mt-4'>
              <label className='text-xs font-semibold text-slate-600'>
                Benzapen (ml)
              </label>
              <input
                type='text'
                defaultValue='0'
                className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
              />
            </div>
          </div>

          <div className='mt-6 border-t border-slate-200 pt-6'>
            <div className='font-semibold text-slate-800'>Otros fármacos</div>
            <div className='mt-4'>
              <label className='text-xs font-semibold text-slate-600'>
                Amino vit (ml)
              </label>
              <input
                type='text'
                defaultValue='0'
                className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
              />
            </div>
          </div>
        </div>
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

      {active === 'Insumos administrados' && (
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
      )}
    </div>
  )
}
