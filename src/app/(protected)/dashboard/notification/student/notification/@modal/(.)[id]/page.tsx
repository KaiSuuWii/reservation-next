"use client";

import React from 'react';

interface Notification {
    id: number;
    type: 'reservation' | 'reminder' | 'update' | 'alert';
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
  

interface ModalProps {
  notification: Notification; 
  onClose: () => void; 
}

const Modal: React.FC<ModalProps> = ({ notification, onClose }) => {
  return (
      <div className="bg-white p-6 rounded-2xl shadow-lg w-3/4 max-w-5xl">
        <h2 className="text-xl font-semibold">{notification.title}</h2>
        <p className="mt-2 text-gray-600">{notification.message}</p>
        
        <div className="mt-4 space-y-2">
          <p><span className="font-semibold">Reservation Number:</span> {notification.reservationNumber}</p>
          <p><span className="font-semibold">Start Date:</span> {notification.startDate}</p>
          <p><span className="font-semibold">End Date:</span> {notification.endDate}</p>
          <p><span className="font-semibold">Pax:</span> {notification.pax}</p>
          <p><span className="font-semibold">School/Unit/Organization:</span> {notification.schoolUnit}</p>
          <p><span className="font-semibold">Representative:</span> {notification.representative}</p>
          <p><span className="font-semibold">Event Name:</span> {notification.eventName}</p>
          <p><span className="font-semibold">Contact Number:</span> {notification.contactNumber}</p>
          <p><span className="font-semibold">Venue:</span> {notification.venue}</p>
          <p><span className="font-semibold">Event Type:</span> {notification.eventType}</p>
        </div>

        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
  );
};

export default Modal;