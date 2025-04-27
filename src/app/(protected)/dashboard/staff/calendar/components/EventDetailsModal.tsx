import React from 'react';
import moment from 'moment';
import { EventType } from '../hooks/useCalendarEvent';

interface EventDetailsModalProps {
    event: EventType;
    onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 m-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">{event.notification.eventName}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mt-3 flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {moment(event.start).format('MMMM D, YYYY')}
                </div>

                <div className="mt-1 flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                </div>

                <div className="mt-4 space-y-3">
                    <div className="flex">
                        <div className="w-32 flex-shrink-0 text-gray-500">Venue:</div>
                        <div className="text-gray-800 font-medium">{event.notification.venue}</div>
                    </div>
                    <div className="flex">
                        <div className="w-32 flex-shrink-0 text-gray-500">Event Type:</div>
                        <div className="text-gray-800 font-medium">{event.notification.eventType}</div>
                    </div>
                    <div className="flex">
                        <div className="w-32 flex-shrink-0 text-gray-500">School Unit:</div>
                        <div className="text-gray-800 font-medium">{event.notification.schoolUnit}</div>
                    </div>
                    <div className="flex">
                        <div className="w-32 flex-shrink-0 text-gray-500">Representative:</div>
                        <div className="text-gray-800 font-medium">{event.notification.representative}</div>
                    </div>
                    <div className="flex">
                        <div className="w-32 flex-shrink-0 text-gray-500">Contact:</div>
                        <div className="text-gray-800 font-medium">{event.notification.contactNumber}</div>
                    </div>
                    <div className="flex">
                        <div className="w-32 flex-shrink-0 text-gray-500">Attendees:</div>
                        <div className="text-gray-800 font-medium">{event.notification.pax}</div>
                    </div>
                    <div className="flex">
                        <div className="w-32 flex-shrink-0 text-gray-500">Reservation #:</div>
                        <div className="text-gray-800 font-medium">{event.notification.reservationNumber}</div>
                    </div>
                    <div className="flex">
                        <div className="w-32 flex-shrink-0 text-gray-500">Status:</div>
                        <div className={`font-medium ${event.notification.type === 'alert' ? 'text-red-500' : 'text-green-500'}`}>
                            {event.notification.type === 'alert' ? 'Canceled' : 'Confirmed'}
                        </div>
                    </div>
                </div>

                {event.notification.message && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-gray-500 mb-1 text-sm font-medium">Notes:</div>
                        <p className="text-gray-700 text-sm">{event.notification.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetailsModal;