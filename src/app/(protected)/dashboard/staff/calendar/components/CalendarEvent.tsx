
import React from 'react';
import { EventType } from '../hooks/useCalendarEvent';

interface CalendarEventProps {
    event: EventType;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
    return (
        <div
            style={{
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
        >
            {event.title}
        </div>
    );
};

export default CalendarEvent;