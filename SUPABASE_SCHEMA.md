-- Migration script for the entire project

-- Table: sedes
create table public.sedes (
id uuid primary key default gen_random_uuid(),
name text unique not null
);

-- Table: custodios
create table public.custodios (
id uuid primary key default gen_random_uuid(),
document_id text unique,
created_at timestamptz not null default now(),
full_name text not null,
email text unique
);

-- Table: mascotas
create table public.mascotas (
id uuid primary key default gen_random_uuid(),
custodio_id uuid not null,
name text not null,
species text not null,
sex text not null,
age_years integer not null,
created_at timestamptz not null default now(),
age_months integer not null default 0,
constraint mascotas_custodio_id_fkey foreign key (custodio_id) references public.custodios(id)
);

-- Table: turnos
create table public.turnos (
id uuid primary key default gen_random_uuid(),
mascota_id uuid not null,
custodio_id uuid not null,
sede_id uuid not null,
starts_at timestamptz not null,
ends_at timestamptz not null,
status text not null default 'agendada',
day_index integer,
created_at timestamptz not null default now(),
mascota_photo_id text,
document_id text,
constraint citas_custodio_id_fkey foreign key (custodio_id) references public.custodios(id),
constraint citas_mascota_id_fkey foreign key (mascota_id) references public.mascotas(id),
constraint citas_sede_id_fkey foreign key (sede_id) references public.sedes(id)
);

-- Table: evaluacion_clinica
create table public.evaluacion_clinica (
id uuid primary key default gen_random_uuid(),
turno_id uuid unique not null,
ayuno boolean,
vacunas boolean,
desparasitacion boolean,
vomito_diarrea boolean,
observaciones text,
temperatura_c numeric,
freq_cardi integer,
freq_resp integer,
peso_kg numeric,
created_at timestamptz not null default now(),
toser_estornudar boolean,
inapetencia boolean,
celo boolean,
constraint evaluacion_clinica_turno_id_fkey foreign key (turno_id) references public.turnos(id)
);

-- Table: farmacos
create table public.farmacos (
id uuid primary key default gen_random_uuid(),
turno_id uuid not null,
created_at timestamptz not null default now(),
acepromacina_ml numeric,
tramal_ml numeric,
ketamina_ml numeric,
midazolam_ml numeric,
benzapen_ml numeric,
lidocaina_ml numeric,
hepatomic_ml numeric,
catosal_ml numeric,
aminovit_ml numeric,
dextrosa_ml numeric,
quercetol_ml numeric,
meloxicam_ml numeric,
propofol_ml numeric,
viviram_ml numeric,
atropina_ml numeric,
epinefrina_ml numeric,
dexametasona_ml numeric,
constraint farmacos_turno_id_fkey foreign key (turno_id) references public.turnos(id)
);

-- Table: operatorio
create table public.operatorio (
id uuid primary key default gen_random_uuid(),
turno_id uuid unique not null,
quistes boolean,
piometra boolean,
tumor text,
observaciones text,
created_at timestamptz not null default now(),
constraint operatorio_turno_id_fkey foreign key (turno_id) references public.turnos(id)
);

CREATE TYPE public.cita_status AS ENUM (
'agendada',
'atendida',
'no_asistio',
'asistio_no_atendido'
);

CREATE TYPE public.pet_sex AS ENUM (
'macho',
'hembra'
);
