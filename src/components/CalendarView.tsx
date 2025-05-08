"use client";

import { useState, useEffect, useRef } from "react";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    addMonths,
    subMonths,
} from "date-fns";

interface Reservation {
    _id: string;
    unit_name: string;
    event_name: string;
    representative_name: string;
    contact_number: string;
    event_types: string[];
    facilities: string[];
    start_date: Date;
    end_date: Date;
    created_at: Date;
    staff_manpower_needed: string[];
    uao_acknowledged: boolean;
    uao_concluded: boolean;
    pe_acknowledged: boolean;
    osa_acknowledged: boolean;
    ppo_acknowledged: boolean;
    equipment_needed: string[];
    presentation_equipment: string[];
    stage_options: string[];
    lighting_options: string[];
    student_viewed: boolean;
    uao_viewed: boolean;
    pe_viewed: boolean;
    osa_viewed: boolean;
    ppo_viewed: boolean;
}

interface CalendarViewProps {
    statusFilter: string;
}

export default function CalendarView({ statusFilter }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const xuBlue = "rgb(40,57,113)";

    // Fetch reservations data
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                const monthStart = startOfMonth(currentMonth);
                const monthEnd = endOfMonth(currentMonth);
                const query = new URLSearchParams({
                    startDate: monthStart.toISOString(),
                    endDate: monthEnd.toISOString(),
                    ...(statusFilter !== "all" && { status: statusFilter }),
                });
                const response = await fetch(`/api/protected/dashboard/calendar?${query}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch reservations");
                }

                const data = await response.json();
                const formattedData = data.map((res: any) => ({
                    ...res,
                    start_date: new Date(res.start_date),
                    end_date: new Date(res.end_date),
                    created_at: new Date(res.created_at),
                }));

                setReservations(formattedData);
                setError(null);
            } catch (err) {
                console.error("Error fetching reservations:", err);
                setError("Failed to load reservations. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [currentMonth, statusFilter]);

    // Position popup dynamically
    useEffect(() => {
        if (hoverDate && popupRef.current) {
            const popup = popupRef.current;
            const rect = popup.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Adjust horizontal position
            if (rect.right > viewportWidth) {
                popup.style.left = `${viewportWidth - rect.width - 10}px`;
            }

            // Adjust vertical position
            if (rect.bottom > viewportHeight) {
                popup.style.top = `${viewportHeight - rect.height - 10}px`;
            }
        }
    }, [hoverDate]);

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getDayReservations = (day: Date) => {
        return reservations.filter((res) => {
            const startDate = new Date(res.start_date);
            const endDate = new Date(res.end_date);
            return day >= startDate && day <= endDate;
        });
    };

    const getStatusColor = (reservation: Reservation) => {
        if (reservation.uao_concluded) {
            return "bg-green-500";
        } else if (
            reservation.uao_acknowledged &&
            reservation.pe_acknowledged &&
            reservation.osa_acknowledged &&
            reservation.ppo_acknowledged
        ) {
            return `bg-[${xuBlue}]`;
        } else if (
            reservation.uao_acknowledged ||
            reservation.pe_acknowledged ||
            reservation.osa_acknowledged ||
            reservation.ppo_acknowledged
        ) {
            return "bg-yellow-500";
        } else {
            return "bg-red-500";
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <CalendarIcon className="mr-2" size={24} />
                    Event Calendar
                </h2>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <button
                        onClick={prevMonth}
                        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Previous month"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-xl font-medium text-gray-700">
                        {format(currentMonth, "MMMM yyyy")}
                    </h3>
                    <button
                        onClick={nextMonth}
                        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Next month"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
                <>
                    <div className="grid grid-cols-7 gap-1">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="py-2 text-center font-medium text-gray-500">
                                {day}
                            </div>
                        ))}

                        {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                            <div
                                key={`empty-start-${index}`}
                                className="min-h-[120px] sm:min-h-[140px] p-1 bg-gray-50"
                            ></div>
                        ))}

                        {days.map((day) => {
                            const dayReservations = getDayReservations(day);
                            const isToday = isSameDay(day, new Date());
                            const isSelected = selectedDate && isSameDay(day, selectedDate);
                            const isHovered = hoverDate && isSameDay(day, hoverDate);

                            return (
                                <div
                                    key={day.toString()}
                                    onClick={() => setSelectedDate(day)}
                                    onMouseEnter={() => setHoverDate(day)}
                                    onMouseLeave={() => setHoverDate(null)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            setSelectedDate(day);
                                        }
                                    }}
                                    tabIndex={0}
                                    className={`min-h-[120px] sm:min-h-[140px] p-2 border rounded-md overflow-hidden transition-all cursor-pointer ${isToday ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:bg-gray-50"
                                        } ${isSelected ? "ring-2 ring-blue-500" : ""} ${isHovered ? "shadow-md" : ""}`}
                                    aria-label={`Events on ${format(day, "MMMM d, yyyy")}`}
                                >
                                    <div className="text-right mb-1">
                                        <span
                                            className={`inline-block w-6 h-6 rounded-full text-center leading-6 text-sm ${isToday ? "bg-blue-500 text-white" : "text-gray-700"
                                                }`}
                                        >
                                            {format(day, "d")}
                                        </span>
                                    </div>

                                    <div className="space-y-1 overflow-hidden max-h-24">
                                        {dayReservations.length > 0 ? (
                                            dayReservations.slice(0, 2).map((res) => (
                                                <div
                                                    key={res._id}
                                                    className={`px-1 py-0.5 text-xs rounded truncate text-white ${getStatusColor(
                                                        res
                                                    )}`}
                                                    title={res.event_name}
                                                >
                                                    {res.event_name}
                                                </div>
                                            ))
                                        ) : null}

                                        {dayReservations.length > 2 && (
                                            <div className="text-xs text-gray-500 pl-1">
                                                +{dayReservations.length - 2} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
                            <div
                                key={`empty-end-${index}`}
                                className="min-h-[120px] sm:min-h-[140px] p-1 bg-gray-50"
                            ></div>
                        ))}
                    </div>
                </>
            )}

            {hoverDate && getDayReservations(hoverDate).length > 0 && (
                <div
                    ref={popupRef}
                    className="fixed z-20 bg-white rounded-lg shadow-xl border border-gray-200 w-full sm:w-96 p-4 max-h-96 overflow-y-auto"
                    style={{ top: "100px", left: "20px" }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">
                            {format(hoverDate, "MMMM d, yyyy")}
                        </h3>
                        <span className="text-sm text-gray-500">
                            {getDayReservations(hoverDate).length} reservations
                        </span>
                    </div>

                    <div className="space-y-3">
                        {getDayReservations(hoverDate).map((res) => (
                            <div
                                key={res._id}
                                className="border-l-4 pl-3 py-2"
                                style={{
                                    borderLeftColor: getStatusColor(res)
                                        .replace("bg-", "#")
                                        .replace("rgb(40,57,113)", xuBlue),
                                }}
                            >
                                <div className="font-medium text-gray-800">{res.event_name}</div>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                        <span className="font-medium">Unit:</span> {res.unit_name}
                                    </p>
                                    <p>
                                        <span className="font-medium">Representative:</span>{" "}
                                        {res.representative_name}
                                    </p>
                                    <p>
                                        <span className="font-medium">Time:</span>{" "}
                                        {format(new Date(res.start_date), "h:mm a")} -{" "}
                                        {format(new Date(res.end_date), "h:mm a")}
                                    </p>
                                    <p>
                                        <span className="font-medium">Facilities:</span>{" "}
                                        {res.facilities.join(", ")}
                                    </p>
                                    {res.equipment_needed.length > 0 && (
                                        <p>
                                            <span className="font-medium">Equipment:</span>{" "}
                                            {res.equipment_needed.join(", ")}
                                        </p>
                                    )}
                                    <div className="mt-2 grid grid-cols-4 gap-1">
                                        <div
                                            className={`text-center text-xs p-1 rounded ${res.uao_acknowledged
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            UAO
                                        </div>
                                        <div
                                            className={`text-center text-xs p-1 rounded ${res.pe_acknowledged
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            PE
                                        </div>
                                        <div
                                            className={`text-center text-xs p-1 rounded ${res.osa_acknowledged
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            OSA
                                        </div>
                                        <div
                                            className={`text-center text-xs p-1 rounded ${res.ppo_acknowledged
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            PPO
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-1 rounded-full bg-red-500"></span>
                    <span>Pending</span>
                </div>
                <div className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-1 rounded-full bg-yellow-500"></span>
                    <span>Partially Approved</span>
                </div>
                <div className="flex items-center">
                    <span
                        className="inline-block w-3 h-3 mr-1 rounded-full"
                        style={{ backgroundColor: xuBlue }}
                    ></span>
                    <span>Fully Approved</span>
                </div>
                <div className="flex items-center">
                    <span className="inline-block w-3 h-3 mr-1 rounded-full bg-green-500"></span>
                    <span>Concluded</span>
                </div>
            </div>
        </div>
    );
}