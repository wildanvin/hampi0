# Umbrales de Hallazgos (Constantes fisiológicas)

Estos son los rangos actuales usados en el frontend para generar hallazgos.

## Temperatura (°C)

| Rango | Hallazgo | Severidad |
| --- | --- | --- |
| `t >= 41.0` | Hipertermia severa | critical |
| `40.0 <= t < 41.0` | Fiebre alta | warning |
| `39.3 <= t < 40.0` | Posible fiebre | info |
| `36.5 >= t` | Hipotermia severa | critical |
| `37.5 >= t > 36.5` | Hipotermia | warning |

## Frecuencia cardiaca (lpm)

| Rango | Hallazgo | Severidad |
| --- | --- | --- |
| `hr > 220` | Taquicardia marcada | critical |
| `180 < hr <= 220` | Taquicardia | warning |
| `hr < 50` | Bradicardia marcada | critical |
| `50 <= hr < 60` | Bradicardia | warning |

## Frecuencia respiratoria (rpm)

| Rango | Hallazgo | Severidad |
| --- | --- | --- |
| `rr > 60` | Posible dificultad respiratoria | critical |
| `40 < rr <= 60` | Taquipnea | warning |
| `rr < 10` | Bradipnea | warning |

