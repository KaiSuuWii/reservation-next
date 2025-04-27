// CalendarPage.tsx
"use client";

import React, { useState } from "react";
import { Calendar, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Tooltip } from "react-tooltip";
import moment from "moment";
import { localizer } from "@/app/(protected)/dashboard/staff/calendar/config/calendarConfig";
import { useNotifications } from "@/app/(protected)/dashboard/staff/calendar/hooks/useNotifications";
import { useCalendarEvents, EventType } from "@/app/(protected)/dashboard/staff/calendar/hooks/useCalendarEvent";
import { eventStyleGetter } from "@/app/(protected)/dashboard/staff/calendar/styles/calendarStyles";
import { formatDate } from "@/app/(protected)/dashboard/staff/calendar/utils/dateUtils";
import CalendarHeader from "@/app/(protected)/dashboard/staff/calendar/components/CalendarHeader";
import EventTypeLegend from "@/app/(protected)/dashboard/staff/calendar/components/EventTypeLegend";
import EventTooltip from "@/app/(protected)/dashboard/staff/calendar/components/EventTooltip";
import EventDetailsModal from "@/app/(protected)/dashboard/staff/calendar/components/EventDetailsModal";

const CalendarPage: React.FC = () => {
  const [viewType, setViewType] = useState<"week" | "day" | "month">("week"); // Updated state type
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const notifications = useNotifications();
  const calendarEvents = useCalendarEvents(notifications);

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view: "day" | "week" | "month") => { // Updated parameter type
    setViewType(view);
  };

  const handleEventSelect = (event: EventType) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {/* Calendar Header */}
          <CalendarHeader
            currentDate={currentDate}
            viewType={viewType}
            onNavigate={handleNavigate}
            onViewChange={handleViewChange}
          />

          {/* Legend */}
          <EventTypeLegend />

          {/* Calendar Component */}
          <div className="p-4 w-full" style={{ height: "700px" }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              views={["day", "week", "month"]}
              view={viewType}
              date={currentDate}
              onNavigate={handleNavigate}
              onView={(view: View) => handleViewChange(view as "day" | "week" | "month")} // Type assertion here
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleEventSelect}
              selectable={false}
              popup={true}
              tooltipAccessor={null}
              components={{
                event: ({ event }: { event: EventType }) => (
                  <EventTooltip key={`event-tooltip-${event.id}`} event={event}>
                    <div
                      style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {event.title}
                    </div>
                  </EventTooltip>
                ),
                toolbar: () => null,
              }}
            />
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}

        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Hover over events to see quick info, or click an event to view complete details.
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;