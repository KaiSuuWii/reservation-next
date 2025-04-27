import { useMemo } from 'react';
import { eventTypeColors } from '../config/calendarConfig';

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

// Explicitly export the EventType interface
export interface EventType {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
    color: string;
    borderColor?: string;
    notification: Notification;
}

const getEventColor = (notification: Notification): string => {
    return notification.type === "alert"
        ? eventTypeColors.alert
        : eventTypeColors[notification.eventType as keyof typeof eventTypeColors] || "#4f46e5";
};

const getEventBorderColor = (notification: Notification): string | undefined => {
    return notification.type === "alert" ? "#b91c1c" : undefined;
};

export const useCalendarEvents = (notifications: Notification[]): EventType[] => {
    return useMemo(() => {
        return notifications.map((notification) => ({
            id: notification.id.toString(),
            title: notification.eventName,
            start: new Date(notification.startDate),
            end: new Date(notification.endDate),
            color: getEventColor(notification),
            borderColor: getEventBorderColor(notification),
            notification,
        }));
    }, [notifications]);
};