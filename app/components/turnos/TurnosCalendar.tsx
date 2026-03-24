"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { citas } from "@/app/data/citas";

const events = citas.map((cita) => ({
  id: cita.id,
  title: `${cita.mascota}\n${cita.custodio}`,
  start: cita.start,
  end: cita.end,
  badge: cita.badge,
}));

export default function TurnosCalendar() {
  const router = useRouter();
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const applyView = () => {
      const api = calendarRef.current?.getApi();
      if (!api) return;
      api.changeView(media.matches ? "timeGridDay" : "dayGridWeek");
    };

    applyView();
    media.addEventListener("change", applyView);

    return () => media.removeEventListener("change", applyView);
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <FullCalendar
        ref={calendarRef}
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
        eventTextColor="#2f5673"
        eventBackgroundColor="#d9f3ff"
        eventBorderColor="#d9f3ff"
        nowIndicator
        firstDay={1}
        dayHeaderFormat={{ weekday: "short", day: "2-digit" }}
        eventClick={(info) => {
          if (info.event.id) {
            router.push(`/turnos/${info.event.id}`);
          }
        }}
        eventContent={(info) => {
          const badge = (info.event.extendedProps as { badge?: string }).badge;
          return (
            <div className="relative">
              <div className="absolute right-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-[#b38af4] shadow-sm">
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
