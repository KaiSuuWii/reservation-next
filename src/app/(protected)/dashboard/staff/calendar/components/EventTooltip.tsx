import React from 'react';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import { EventType } from '../hooks/useCalendarEvent'; // Adjust the import path if necessary

interface EventTooltipProps {
    event: EventType;
    children: React.ReactNode;
}

const EventTooltip: React.FC<EventTooltipProps> = ({ event, children }) => {
    return (
        <>
            <div data-tooltip-id={`event-tooltip-${event.id}`}>
                {children}
            </div>
            <Tooltip
                id={`event-tooltip-${event.id}`}
                place="top"
                className="shadow-lg rounded-lg p-0 max-w-xs"
                style={{ zIndex: 9999, backgroundColor: 'transparent' }}
                opacity={1}
            >
                <div className="p-3 bg-white rounded-lg">
                    <div className="font-bold text-gray-800 mb-1">{event.notification.eventName}</div>
                    <div className="text-sm text-gray-500 border-b pb-2 mb-2">
                        {moment(event.start).format('MMM D, YYYY • h:mm A')} - {moment(event.end).format('h:mm A')}
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                        <div className="text-gray-500">Venue:</div>
                        <div className="text-gray-700 font-medium">{event.notification.venue}</div>
                        <div className="text-gray-500">Event Type:</div>
                        <div className="text-gray-700 font-medium">{event.notification.eventType}</div>
                        <div className="text-gray-500">School Unit:</div>
                        <div className="text-gray-700 font-medium">{event.notification.schoolUnit}</div>
                        <div className="text-gray-500">Representative:</div>
                        <div className="text-gray-700 font-medium">{event.notification.representative}</div>
                        <div className="text-gray-500">Attendees:</div>
                        <div className="text-gray-700 font-medium">{event.notification.pax}</div>
                        <div className="text-gray-500">Status:</div>
                        <div className={`font-medium ${event.notification.type === 'alert' ? 'text-red-500' : 'text-green-500'}`}>
                            {event.notification.type === 'alert' ? 'Canceled' : 'Confirmed'}
                        </div>
                    </div>
                </div>
            </Tooltip>
        </>
    );
};

export default EventTooltip;