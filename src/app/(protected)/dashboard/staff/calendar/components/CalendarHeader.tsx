import React from 'react';
import moment from 'moment';

interface CalendarHeaderProps {
    currentDate: Date;
    viewType: "day" | "week" | "month";
    onViewChange: (view: "day" | "week" | "month") => void;
    onNavigate: (date: Date) => void;
}

const formatDate = (date: Date): string => {
    return moment(date).format('MMMM YYYY');
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, viewType, onViewChange, onNavigate }) => {
    return (
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Reservation Calendar</h1>
                <p className="text-gray-500 mt-1">{formatDate(currentDate)}</p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                {/* View Controls */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => onViewChange("day")}
                        className={`px-3 py-1 text-sm rounded-md transition ${viewType === "day" ? "bg-white shadow-sm text-indigo-600" : "text-gray-600 "}`}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => onViewChange("week")}
                        className={`px-3 py-1 text-sm rounded-md transition ${viewType === "week" ? "bg-white shadow-sm text-indigo-600" : "text-gray-600 "}`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => onViewChange("month")}
                        className={`px-3 py-1 text-sm rounded-md transition ${viewType === "month" ? "bg-white shadow-sm text-indigo-600" : "text-gray-600 "}`}
                    >
                        Month
                    </button>
                </div>

                {/* Navigation Controls */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => onNavigate(moment(currentDate).subtract(1, viewType).toDate())}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onNavigate(new Date())}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Today
                    </button>
                    <button
                        onClick={() => onNavigate(moment(currentDate).add(1, viewType).toDate())}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarHeader;