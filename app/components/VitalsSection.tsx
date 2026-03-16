'use client'

import { useEffect, useMemo, useState } from 'react'

type Severity = 'info' | 'warning' | 'critical'

type Vitals = {
  temperature?: number | null
  heartRate?: number | null
  respRate?: number | null
}

type Finding = {
  key: 'temperature' | 'heartRate' | 'respRate'
  type: string
  severity: Severity
  message: string
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function evaluateVitals(vitals: Vitals): Finding[] {
  const findings: Finding[] = []

  if (isFiniteNumber(vitals.temperature)) {
    const t = vitals.temperature

    if (t >= 41.0) {
      findings.push({
        key: 'temperature',
        type: 'hyperthermia_severe',
        severity: 'critical',
        message: 'Hipertermia severa',
      })
    } else if (t >= 40.0) {
      findings.push({
        key: 'temperature',
        type: 'fever_high',
        severity: 'warning',
        message: 'Fiebre alta',
      })
    } else if (t >= 39.3) {
      findings.push({
        key: 'temperature',
        type: 'fever_possible',
        severity: 'info',
        message: 'Posible fiebre',
      })
    } else if (t <= 36.5) {
      findings.push({
        key: 'temperature',
        type: 'hypothermia_severe',
        severity: 'critical',
        message: 'Hipotermia severa',
      })
    } else if (t <= 37.5) {
      findings.push({
        key: 'temperature',
        type: 'hypothermia',
        severity: 'warning',
        message: 'Hipotermia',
      })
    }
  }

  if (isFiniteNumber(vitals.heartRate)) {
    const hr = vitals.heartRate

    if (hr > 220) {
      findings.push({
        key: 'heartRate',
        type: 'tachycardia_marked',
        severity: 'critical',
        message: 'Taquicardia marcada',
      })
    } else if (hr > 180) {
      findings.push({
        key: 'heartRate',
        type: 'tachycardia',
        severity: 'warning',
        message: 'Taquicardia',
      })
    } else if (hr < 50) {
      findings.push({
        key: 'heartRate',
        type: 'bradycardia_marked',
        severity: 'critical',
        message: 'Bradicardia marcada',
      })
    } else if (hr < 60) {
      findings.push({
        key: 'heartRate',
        type: 'bradycardia',
        severity: 'warning',
        message: 'Bradicardia',
      })
    }
  }

  if (isFiniteNumber(vitals.respRate)) {
    const rr = vitals.respRate

    if (rr > 60) {
      findings.push({
        key: 'respRate',
        type: 'resp_distress_possible',
        severity: 'critical',
        message: 'Posible dificultad respiratoria',
      })
    } else if (rr > 40) {
      findings.push({
        key: 'respRate',
        type: 'tachypnea',
        severity: 'warning',
        message: 'Taquipnea',
      })
    } else if (rr < 10) {
      findings.push({
        key: 'respRate',
        type: 'bradypnea',
        severity: 'warning',
        message: 'Bradipnea',
      })
    }
  }

  return findings
}

function toNullableNumber(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : null
}

export default function VitalsSection() {
  const [temperatureInput, setTemperatureInput] = useState('38')
  const [heartRateInput, setHeartRateInput] = useState('120')
  const [respRateInput, setRespRateInput] = useState('30')

  const [temperature, setTemperature] = useState<number | null>(
    toNullableNumber('38'),
  )
  const [heartRate, setHeartRate] = useState<number | null>(
    toNullableNumber('120'),
  )
  const [respRate, setRespRate] = useState<number | null>(
    toNullableNumber('30'),
  )

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTemperature(toNullableNumber(temperatureInput))
      setHeartRate(toNullableNumber(heartRateInput))
      setRespRate(toNullableNumber(respRateInput))
    }, 220)

    return () => window.clearTimeout(timer)
  }, [temperatureInput, heartRateInput, respRateInput])

  const findings = useMemo(
    () => evaluateVitals({ temperature, heartRate, respRate }),
    [temperature, heartRate, respRate],
  )

  return (
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
            value={temperatureInput}
            onChange={(event) => setTemperatureInput(event.target.value)}
            className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
          />
        </div>
        <div>
          <label className='text-xs font-semibold text-slate-600'>
            Frecuencia cardiaca
          </label>
          <input
            type='text'
            value={heartRateInput}
            onChange={(event) => setHeartRateInput(event.target.value)}
            className='mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600'
          />
        </div>
        <div>
          <label className='text-xs font-semibold text-slate-600'>
            Frecuencia respiratoria
          </label>
          <input
            type='text'
            value={respRateInput}
            onChange={(event) => setRespRateInput(event.target.value)}
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
      <div className='mt-6'>
        <div className='text-xs font-semibold text-slate-600'>Hallazgos</div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {findings.length === 0 && (
            <span className='rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-400'>
              Sin hallazgos
            </span>
          )}
          {findings.map((finding) => {
            const badge =
              finding.severity === 'critical'
                ? 'border-[#ef4444] bg-[#fee2e2] text-[#b91c1c]'
                : finding.severity === 'warning'
                  ? 'border-[#b38af4] bg-[#f4ecff] text-[#7b5ab8]'
                  : 'border-[#38bdf8] bg-[#e0f2fe] text-[#0369a1]'

            return (
              <span
                key={`${finding.key}-${finding.type}`}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge}`}
              >
                {finding.message}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
