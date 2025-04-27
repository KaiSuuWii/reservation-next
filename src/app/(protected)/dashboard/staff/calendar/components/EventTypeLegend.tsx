import React from 'react';
import { eventTypeColors } from '../config/calendarConfig';

const EventTypeLegend: React.FC = () => {
    return (
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-3">
            <div className="text-sm font-medium text-gray-500">Event Types:</div>
            <div className="flex flex-wrap gap-4">
                {Object.entries(eventTypeColors).map(([eventType, color]) => (
                    <div className="flex items-center" key={eventType}>
                        <span className={`inline-block w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: color }}></span>
                        <span className="text-sm text-gray-600">{eventType.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventTypeLegend;