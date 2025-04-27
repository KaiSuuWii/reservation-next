import React from 'react';

// Alternative approach - modal without isOpen prop
interface ConfirmedReservationModalProps {
    onClose: () => void;
    submissionResult?: any;
    submissionError?: any;
}

const ConfirmedReservationModal: React.FC<ConfirmedReservationModalProps> = ({
    onClose,
    submissionResult,
    submissionError
}) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Your reservation has been confirmed!</h2>
                <p className="mb-4">Please check your notifications for updates.</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmedReservationModal;