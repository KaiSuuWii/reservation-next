'use client'; 

import React, { useState, useEffect, use } from 'react';
import NotificationComponent from '@/components/NotificationComponent';

export default function ReservationUAO () {
  const [manpowerNeeded, setManpowerNeeded] = useState<string[]>([]);
  const [showOtherField, setShowOtherField] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [acknowledgedId, setAcknowledgeId] = useState<string>('');

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setManpowerNeeded([...manpowerNeeded, value]);
    } else {
      setManpowerNeeded(manpowerNeeded.filter((item) => item !== value));
    }

    if (value === 'Other') {
      setShowOtherField(checked);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const manpowerNeeded = data.getAll('manpower');
    // exclude the "Other" manpower from the manpowerNeeded array
    const filteredManpowerNeeded = manpowerNeeded.filter((item) => item !== 'Other');
    
    // send the manpowerNeeded to the server
    const response = await fetch("/api/dashboard/reservation/uao", {
      method: "PUT",
      body: JSON.stringify({
          staff_manpower_needed: filteredManpowerNeeded,
          id: acknowledgedId,
        }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to submit manpower needed');
    }

    // reset to show the notifications by setting the acknowledgedId to empty string
    setAcknowledgeId('');
    setManpowerNeeded([]);

    // update the notifications
    getNotifications();

  };


  const handleNotificationClicked = async (notification: any) => {
    console.log('Notification clicked:', notification);

    const response = await fetch('/api/dashboard/reservation/uao', {
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
        `/api/dashboard/reservation/uao?id=${notification.reservationNumber}`,
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
    setAcknowledgeId(notification.reservationNumber);
  };

  const handleApprove = async (notification: any) => {
    const id = notification.reservationNumber;
    const response = await fetch(`/api/dashboard/reservation/uao?id=${id}`, { method: 'PUT', });

    if (!response.ok) {
      throw new Error('Failed to approve reservation');
    }

    await getNotifications();
  }

  const getNotifications = async () => {

    const response = await fetch('/api/dashboard/reservation/uao');

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    console.log(data);

    // transform the data to the format that the NotificationComponent expects
    const transformedData = data.map((notification: any) => ({
      type: 
        notification.uao_concluded ? 'completed' 
        : notification.ppo_acknowledged ? 'approval'
        : notification.pe_viewed ? 'update'
        : notification.staff_manpower_needed && notification.staff_manpower_needed.length > 0 ? 'reminder' 
        : 'reservation',
      date: notification.date,
      read: notification.uao_viewed,
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


  if (!acknowledgedId) {
    
    return <NotificationComponent 
      notifications={notifications} 
      onMarkAllAsRead={() => {}}
      onNotificationClick={(notification) => handleNotificationClicked(notification)}
      onViewLetterOfRequest={(notification => handleLetterRequest(notification))}
      onAcknowledge={(notification => handleAcknowledge(notification))}
      onApprove={notification => handleApprove(notification)}
    />;

  }

  else 
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Reservation UAO Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Manpower Needed Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Manpower Needed</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              'Security',
              'Janitor',
              'Electrician',
              'Technician',
              'Assoc. Technician',
              'Digital Clock Operator',
              'Plumber',
              'Other',
            ].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  name='manpower'
                  checked={manpowerNeeded.includes(option)}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={option} className="ml-2 text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>

          {/* Conditional "Other" Text Field */}
          {showOtherField && (
            <div className="mt-4">
              <label htmlFor="manpower" className="block text-sm font-medium text-gray-700">
                Specify Other Manpower Needed
              </label>
              <input
                type="text"
                id="otherDetails"
                name="manpower"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter details"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="fixed bottom-30 right-40 w-[150px] h-[50px] px-4 py-2 bg-[#005DA8] text-white font-semibold rounded-[14px] hover:bg-[#004080] transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};