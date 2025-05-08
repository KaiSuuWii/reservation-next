
"use client";

import { useState } from "react";
import CalendarView from "@/components/CalendarView";

export default function CalendarPage() {
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
    };

    return (
        <div className="space-y-8 p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Event Calendar</h1>
                <div className="flex items-center space-x-4">
                    <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                        Filter by Status:
                    </label>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="partially_approved">Partially Approved</option>
                        <option value="fully_approved">Fully Approved</option>
                        <option value="concluded">Concluded</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <CalendarView statusFilter={statusFilter} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendar Information</h2>
                <div className="text-gray-700 space-y-4">
                    <p>
                        This calendar displays all facility reservations across Xavier University. Click on any date to view detailed event information or hover to see a quick summary.
                    </p>
                    <p>The color coding indicates the status of each reservation:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc pl-5">
                        <li>
                            <span className="text-red-500 font-medium">Red</span>: Pending approval from all departments
                        </li>
                        <li>
                            <span className="text-yellow-500 font-medium">Yellow</span>: Partially approved (some departments have acknowledged)
                        </li>
                        <li>
                            <span className="text-blue-500 font-medium">Blue</span>: Fully approved by all departments
                        </li>
                        <li>
                            <span className="text-green-500 font-medium">Green</span>: Event concluded
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}