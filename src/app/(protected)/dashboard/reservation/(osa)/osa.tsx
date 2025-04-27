'use client'; 

import React, { useState, useEffect, use } from 'react';
import NotificationComponent from '@/components/NotificationComponent';


export default function ReservationOSA () {
  const [notifications, setNotifications] = useState<any[]>([]);


  const handleNotificationClicked = async (notification: any) => {
    console.log('Notification clicked:', notification);

    const response = await fetch('/api/dashboard/reservation/osa', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: notification.reservationNumber }),
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as viewed');
    }

    // based on notification reservation number, set uao_viewed to true in the use state
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.reservationNumber === notification.reservationNumber ? { ...notif, read: true } : notif
      )
    );

    const data = await response.json();
    console.log(data);

  };

  const handleLetterRequest = async (notification: any) => {
    console.log('Letter of request clicked:', notification);
  
    try {
      const response = await fetch(
        `/api/dashboard/reservation/osa?id=${notification.reservationNumber}`,
        { method: 'GET' }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch letter of request');
      }
  
      const data = await response.json();
      console.log(data);
  
      // Extract and convert the buffer properly
      const bufferData = data.request_letter?.data;
      if (!bufferData || !Array.isArray(bufferData)) {
        throw new Error('Invalid or missing PDF buffer data');
      }
  
      const byteArray = new Uint8Array(bufferData);
  
      // Create Blob and object URL
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
  
      // Open in new tab
      window.open(url, '_blank');
  
      // Optional: Clean up after use
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error("Error displaying PDF:", error);
    }
  };

  const handleAcknowledge = async (notification: any) => {
    
    const response = await fetch('/api/dashboard/reservation/osa', {
      method: 'PUT',
      body: JSON.stringify({ 
        id: notification.reservationNumber, 
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to acknowledge reservation');
    }
    
    // update the notifications
    getNotifications();
  };

  const getNotifications = async () => {

    const response = await fetch('/api/dashboard/reservation/osa');

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    console.log(data);

    // transform the data to the format that the NotificationComponent expects
    const transformedData = data.map((notification: any) => ({
      type: notification.uao_concluded ? 'completed' 
      : notification.ppo_viewed ? 'update' 
      : notification.osa_acknowledged ? 'reminder' 
      : 'reservation',
      date: notification.date,
      read: notification.osa_viewed,
      reservationNumber: notification._id.toString(),
      startDate: new Date(notification.start_date).toLocaleDateString(), // make this date readable
      endDate: new Date(notification.end_date).toLocaleDateString(), // make this date readable
      schoolUnit: notification.unit_name,
      representative: notification.representative_name,
      eventName: notification.event_name,
      contactNumber: notification.contact_number,
      venue: notification.facilities,
      eventType: notification.event_types,
      manpowerNeeded: notification.staff_manpower_needed,
      equipment_needed: notification.equipment_needed,
      presentation_equipment: notification.presentation_equipment,
      stage_options: notification.stage_options,
      lighting_options: notification.lighting_options,
    }));

    setNotifications(transformedData);
  } 

  useEffect(() => {

    getNotifications();

  }, []);

    
    return <NotificationComponent 
      notifications={notifications} 
      onMarkAllAsRead={() => {}}
      onNotificationClick={(notification) => handleNotificationClicked(notification)}
      onViewLetterOfRequest={(notification => handleLetterRequest(notification))}
      onAcknowledge={(notification => handleAcknowledge(notification))}
    />;

};
