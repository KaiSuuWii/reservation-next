import React from 'react';

interface ConfirmationStepProps {
    onNewReservation: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ onNewReservation }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
        <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reservation Submitted!</h2>
        <p className="text-gray-600 mb-6">Your facility reservation has been successfully submitted.</p>
        <p className="text-gray-600 mb-6">A confirmation email will be sent to you shortly.</p>
        <button
            type="button"
            onClick={onNewReservation}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
            Complete Transaction
        </button>
    </div>
);