"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = [
  {
    title: "Bingo\nWilliam Pepper",
    start: "2026-02-02T06:55:00",
    end: "2026-02-02T07:10:00",
    badge: "1",
  },
  {
    title: "Sam\nMagdalena Chicaiza",
    start: "2026-02-02T06:55:00",
    end: "2026-02-02T07:10:00",
    badge: "2",
  },
  {
    title: "Perlita\nNicol Guzmán",
    start: "2026-02-02T06:55:00",
    end: "2026-02-02T07:10:00",
    badge: "3",
  },
  {
    title: "Manchas Pérez\nMaría Alexandra Pérez",
    start: "2026-02-02T06:55:00",
    end: "2026-02-02T07:10:00",
    badge: "4",
  },
  {
    title: "Nube\nGustavo Arias",
    start: "2026-02-03T06:55:00",
    end: "2026-02-03T07:10:00",
    badge: "1",
  },
  {
    title: "Luna\nFredy Luis Lema",
    start: "2026-02-03T06:55:00",
    end: "2026-02-03T07:10:00",
    badge: "2",
  },
  {
    title: "Lucero\nFredy Luis Lema",
    start: "2026-02-03T06:55:00",
    end: "2026-02-03T07:10:00",
    badge: "3",
  },
  {
    title: "Nina\nMelany Mayery",
    start: "2026-02-04T06:55:00",
    end: "2026-02-04T07:10:00",
    badge: "1",
  },
  {
    title: "Teila\nMelany Mayery",
    start: "2026-02-04T06:55:00",
    end: "2026-02-04T07:10:00",
    badge: "2",
  },
  {
    title: "Kiara\nIván Alomoto",
    start: "2026-02-04T06:55:00",
    end: "2026-02-04T07:10:00",
    badge: "3",
  },
  {
    title: "Mateo\nJuan Llucalla",
    start: "2026-02-05T07:55:00",
    end: "2026-02-05T07:10:00",
    badge: "1",
  },
  {
    title: "Pelusa\nDylan Mateo",
    start: "2026-02-05T06:55:00",
    end: "2026-02-05T07:10:00",
    badge: "2",
  },
  {
    title: "Pepe\nDianna Jacqueline",
    start: "2026-02-06T014:55:00",
    end: "2026-02-06T07:10:00",
    badge: "1",
  },
  {
    title: "Layca\nDianna Jacqueline",
    start: "2026-02-06T06:55:00",
    end: "2026-02-06T07:10:00",
    badge: "2",
  },
  {
    title: "Pepita\nEdit Graciela",
    start: "2026-02-06T06:55:00",
    end: "2026-02-06T07:10:00",
    badge: "3",
  },
];

export default function TurnosCalendar() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        initialDate="2026-02-02"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        locale="es"
        events={events}
        height="auto"
        dayMaxEventRows={5}
        eventDisplay="block"
        eventTextColor="#0b1f38"
        eventBackgroundColor="#baf7d4"
        eventBorderColor="#baf7d4"
        nowIndicator
        firstDay={1}
        dayHeaderFormat={{ weekday: "short", day: "2-digit" }}
        eventContent={(info) => {
          const badge = (info.event.extendedProps as { badge?: string }).badge;
          return (
            <div className="relative">
              <div className="absolute right-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-[#f97316] shadow-sm">
                {badge}
              </div>
              <div className="whitespace-pre-line text-[11px] font-semibold leading-4">
                {info.event.title}
              </div>
              <div className="mt-1 text-[10px] font-semibold text-slate-700">
                {info.timeText || "6:55 am"}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
