"use client";

import React, { useState } from "react";
import NotificationComponent from "@/components/NotificationComponent";

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

const Page: React.FC = () => {
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
          startDate: "March 19, 2025",
          endDate: "March 19, 2025",
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
          startDate: "March 25, 2025",
          endDate: "March 25, 2025",
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
          startDate: "March 22, 2025",
          endDate: "March 22, 2025",
          pax: 40,
          schoolUnit: "Department of Science",
          representative: "Emily Davis",
          eventName: "Science Workshop",
          contactNumber: "09223334455",
          venue: "Science Hall",
          eventType: "Workshop",
        },
      ]);

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    console.log("Notification clicked:", notification);
  };

  return (
    <div>
      <NotificationComponent
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onNotificationClick={handleNotificationClick} // Pass the click handler
      />
    </div>
  );
};

export default Page;