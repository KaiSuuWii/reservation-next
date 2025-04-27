"use client";

import React, { useState } from "react";
import NotificationComponentForStudent from "@/components/NotificationComponentForStudent"; // Updated import

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
      title: "Reservation Submitted",
      message:
        "Your reservation request for the University Gymnasium has been submitted. We'll notify you once it's reviewed.",
      date: "2 hours ago",
      read: false,
      reservationNumber: "RES-12345",
      startDate: "March 18, 2025",
      endDate: "March 18, 2025",
      pax: 50,
      schoolUnit: "College of Engineering",
      representative: "You",
      eventName: "College Orientation",
      contactNumber: "09123456789",
      venue: "University Gymnasium",
      eventType: "Academic Event",
    },
    {
      id: 2,
      type: "update",
      title: "Reservation Approved",
      message:
        "Great news! Your reservation for the Main Auditorium has been approved. Please review the details.",
      date: "5 hours ago",
      read: false,
      reservationNumber: "RES-54321",
      startDate: "March 25, 2025",
      endDate: "March 25, 2025",
      pax: 80,
      schoolUnit: "Student Council",
      representative: "You",
      eventName: "Student Leadership Summit",
      contactNumber: "09111222333",
      venue: "Main Auditorium",
      eventType: "Leadership Seminar",
    },
  ]);

  // State for modal
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );

    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className="container mx-auto p-4">
      <NotificationComponentForStudent
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onNotificationClick={handleNotificationClick}
      />

      {/* Modal for notification details */}
      {isModalOpen && selectedNotification && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <NotificationComponentForStudent
            notification={selectedNotification}
            onClose={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Page;