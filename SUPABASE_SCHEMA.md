# Supabase Database Design (Hampi)

Schema optimizado para: login, calendario de citas, detalle de cita, detalle de consulta (tabs) y reporte de atencion.

## Core Entities

### 1) `profiles`
Usuarios de auth.

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique,
  role text not null default 'staff',
  created_at timestamptz not null default now()
);
```

### 2) `sedes`
Sedes / parroquias (para filtros y reportes).

```sql
create table public.sedes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  parroquia text not null,
  canton text,
  provincia text,
  created_at timestamptz not null default now()
);
```

### 3) `custodios`
Tutor/propietario.

```sql
create table public.custodios (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  document_id text,
  birth_date date,
  created_at timestamptz not null default now()
);
```

### 4) `mascotas`
Datos del paciente.

```sql
create type public.pet_species as enum ('perro', 'gato');
create type public.pet_sex as enum ('macho', 'hembra');

create table public.mascotas (
  id uuid primary key default gen_random_uuid(),
  custodio_id uuid not null references public.custodios(id) on delete cascade,
  name text not null,
  species public.pet_species not null,
  sex public.pet_sex not null,
  birth_year int,
  created_at timestamptz not null default now()
);
```

### 5) `citas`
Citas del calendario + estado (para reporte).

```sql
create type public.cita_status as enum (
  'agendada',
  'atendida',
  'no_asistio',
  'asistio_no_atendido'
);

create table public.citas (
  id uuid primary key default gen_random_uuid(),
  mascota_id uuid not null references public.mascotas(id) on delete cascade,
  custodio_id uuid not null references public.custodios(id) on delete cascade,
  sede_id uuid not null references public.sedes(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.cita_status not null default 'agendada',
  day_index int, -- "Nro. Ficha dia"
  created_at timestamptz not null default now()
);

create index on public.citas (sede_id, starts_at);
create index on public.citas (status);
```

## Consultation Detail

### 6) `consultas`
1:1 con la cita (cabecera de consulta).

```sql
create table public.consultas (
  id uuid primary key default gen_random_uuid(),
  cita_id uuid not null unique references public.citas(id) on delete cascade,
  historia_clinica text,
  codigo_hc text,
  created_at timestamptz not null default now()
);
```

### 7) `evaluacion_clinica`
Tab Evaluacion clinica (anamnesis + constantes).

```sql
create table public.evaluacion_clinica (
  id uuid primary key default gen_random_uuid(),
  consulta_id uuid not null unique references public.consultas(id) on delete cascade,
  ayuno text, -- 'normal' | 'prolongado'
  vacunas boolean,
  desparasitacion boolean,
  vomito_diarrea boolean,
  enfermedad_previa text,
  observaciones text,
  temperatura_c numeric,
  frecuencia_cardiaca int,
  frecuencia_respiratoria int,
  peso_kg numeric,
  created_at timestamptz not null default now()
);
```

### 8) `farmacos`
Tab Farmacos (1 fila por farmaco).

```sql
create table public.farmacos (
  id uuid primary key default gen_random_uuid(),
  consulta_id uuid not null references public.consultas(id) on delete cascade,
  categoria text, -- pre-anestesico | anestesico | analgesico | antibiotico | otro
  nombre text not null,
  dosis_ml numeric,
  created_at timestamptz not null default now()
);
```

### 9) `operatorio`
Tab Operatorio (1 fila por consulta).

```sql
create table public.operatorio (
  id uuid primary key default gen_random_uuid(),
  consulta_id uuid not null unique references public.consultas(id) on delete cascade,
  quistes boolean,
  piometra boolean,
  vomito_diarrea boolean,
  tumor text, -- 'si' | 'no' o detalle
  observaciones text,
  created_at timestamptz not null default now()
);
```

### 10) `insumos`
Tab Insumos administrados (1 fila por insumo).

```sql
create table public.insumos (
  id uuid primary key default gen_random_uuid(),
  consulta_id uuid not null references public.consultas(id) on delete cascade,
  nombre text not null,
  unidad text,
  cantidad numeric,
  created_at timestamptz not null default now()
);
```

## Reporte de atencion

Para los contadores del dashboard (caninos/felinos, gestantes, piometras, tumores, vacunados, etc.)
se usa una tabla de flags por cita.

### 11) `condiciones_clinicas`

```sql
create table public.condiciones_clinicas (
  id uuid primary key default gen_random_uuid(),
  cita_id uuid not null unique references public.citas(id) on delete cascade,
  gestante boolean,
  no_nacidos boolean,
  piometra boolean,
  tumor boolean,
  desparasitado boolean,
  vacunado boolean,
  created_at timestamptz not null default now()
);
```

Con esto puedes calcular:
- Totales por especie/sexo: `citas` + `mascotas`
- Gestantes / piometras / tumores: `condiciones_clinicas`
- Estados de atencion: `citas.status`

## Suggested RLS (Summary)

```sql
alter table public.citas enable row level security;
alter table public.consultas enable row level security;
alter table public.evaluacion_clinica enable row level security;
alter table public.farmacos enable row level security;
alter table public.operatorio enable row level security;
alter table public.insumos enable row level security;
alter table public.condiciones_clinicas enable row level security;

create policy "staff_all_access"
  on public.citas for all
  using (exists(select 1 from public.profiles p where p.id = auth.uid()));
```

## Mapping to UI

- **Calendar**: `citas` + `mascotas` + `custodios` + `sedes`
- **Detalle de cita**: `citas` + `mascotas` + `custodios`
- **Detalle consulta tabs**: `evaluacion_clinica`, `farmacos`, `operatorio`, `insumos`
- **Reporte de atencion**: `citas` + `mascotas` + `condiciones_clinicas` + `sedes`

## Notes

- `custodios` y `mascotas` separados para que un tutor tenga multiples mascotas.
- Si necesitas historico de cambios en citas, agrega `citas_historial`.
- Para performance del dashboard, puedes crear una vista materializada por `parroquia + anio + mes + dia`.
