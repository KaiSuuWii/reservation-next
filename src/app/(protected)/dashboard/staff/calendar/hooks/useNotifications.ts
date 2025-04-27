import { useState } from 'react';

interface Notification {
    id: number;
    type: "reservation" | "reminder" | "update" | "alert";
    title: string;
    message: string;
    date: string;
    read: boolean;
    reservationNumber: string;
    startDate: string;
    endDate: string;
    pax: number;
    schoolUnit: string;
    representative: string;
    eventName: string;
    contactNumber: string;
    venue: string;
    eventType: string;
}

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            type: "reservation",
            title: "Reservation Approved",
            message:
                "We have approved the gymnasium reservation for College Orientation on March 18, 2025 submitted by John Doe.",
            date: "2 hours ago",
            read: false,
            reservationNumber: "RES-12345",
            startDate: "March 18, 2025",
            endDate: "March 18, 2025",
            pax: 50,
            schoolUnit: "College of Engineering",
            representative: "John Doe",
            eventName: "College Orientation",
            contactNumber: "09123456789",
            venue: "University Gymnasium",
            eventType: "Academic Event",
        },
        {
            id: 2,
            type: "reminder",
            title: "Upcoming Reservation",
            message:
                "Reminder: The Athletics Department has a reservation for the Football Field tomorrow at 3:00 PM. Please ensure the venue is prepared.",
            date: "5 hours ago",
            read: false,
            reservationNumber: "RES-67890",
            startDate: "March 19, 2025 15:00",
            endDate: "March 19, 2025 17:00",
            pax: 100,
            schoolUnit: "Athletics Department",
            representative: "Jane Smith",
            eventName: "Interdepartmental Football Match",
            contactNumber: "09876543210",
            venue: "Football Field",
            eventType: "Sports Event",
        },
        {
            id: 3,
            type: "update",
            title: "Reservation Time Changed",
            message:
                "We have rescheduled the Main Auditorium reservation for Student Affairs Office to March 25, 2025, 10:00 AM - 2:00 PM. Representative has been notified.",
            date: "1 day ago",
            read: true,
            reservationNumber: "RES-54321",
            startDate: "March 25, 2025 10:00",
            endDate: "March 25, 2025 14:00",
            pax: 80,
            schoolUnit: "Student Affairs Office",
            representative: "Michael Johnson",
            eventName: "Student Leadership Summit",
            contactNumber: "09111222333",
            venue: "Main Auditorium",
            eventType: "Leadership Seminar",
        },
        {
            id: 4,
            type: "alert",
            title: "Reservation Canceled",
            message:
                "We have canceled the Department of Science reservation for the Science Hall on March 22, 2025 due to required maintenance work. Emily Davis has been notified.",
            date: "2 days ago",
            read: true,
            reservationNumber: "RES-98765",
            startDate: "March 22, 2025 09:00",
            endDate: "March 22, 2025 16:00",
            pax: 40,
            schoolUnit: "Department of Science",
            representative: "Emily Davis",
            eventName: "Science Workshop",
            contactNumber: "09223334455",
            venue: "Science Hall",
            eventType: "Workshop",
        },
        {
            id: 5,
            type: "reservation",
            title: "Reservation Approved",
            message:
                "We have approved the Main Auditorium reservation for the Annual Science Fair on April 5, 2025 submitted by Sarah Lee.",
            date: "3 days ago",
            read: false,
            reservationNumber: "RES-11223",
            startDate: "April 5, 2025 08:00",
            endDate: "April 5, 2025 17:00",
            pax: 120,
            schoolUnit: "Department of Science",
            representative: "Sarah Lee",
            eventName: "Annual Science Fair",
            contactNumber: "09333445566",
            venue: "Main Auditorium",
            eventType: "Academic Event",
        },
        {
            id: 6,
            type: "reservation",
            title: "Reservation Approved",
            message:
                "We have approved the Football Field reservation for the Inter-School Sports Festival on April 10, 2025 submitted by Mark Johnson.",
            date: "4 days ago",
            read: false,
            reservationNumber: "RES-44556",
            startDate: "April 10, 2025 09:00",
            endDate: "April 10, 2025 16:00",
            pax: 200,
            schoolUnit: "Athletics Department",
            representative: "Mark Johnson",
            eventName: "Inter-School Sports Festival",
            contactNumber: "09444556677",
            venue: "Football Field",
            eventType: "Sports Event",
        },
        {
            id: 7,
            type: "alert",
            title: "Reservation Canceled",
            message:
                "We have canceled the University Gymnasium reservation for the Dance Workshop on April 15, 2025 due to unforeseen circumstances. Anna Brown has been notified.",
            date: "5 days ago",
            read: true,
            reservationNumber: "RES-77889",
            startDate: "April 15, 2025 13:00",
            endDate: "April 15, 2025 16:00",
            pax: 60,
            schoolUnit: "Performing Arts Department",
            representative: "Anna Brown",
            eventName: "Dance Workshop",
            contactNumber: "09555667788",
            venue: "University Gymnasium",
            eventType: "Workshop",
        },
        {
            id: 8,
            type: "reservation",
            title: "Reservation Approved",
            message:
                "We have approved the Science Hall reservation for the Robotics Competition on May 1, 2025 submitted by David Wilson.",
            date: "6 days ago",
            read: false,
            reservationNumber: "RES-99001",
            startDate: "May 1, 2025 08:30",
            endDate: "May 1, 2025 16:30",
            pax: 90,
            schoolUnit: "Department of Engineering",
            representative: "David Wilson",
            eventName: "Robotics Competition",
            contactNumber: "09666778899",
            venue: "Science Hall",
            eventType: "Academic Event",
        },
    ]);

    // In a real application, you might return more than just the notifications,
    // like loading state, error state, and a function to refetch.
    return notifications;
};