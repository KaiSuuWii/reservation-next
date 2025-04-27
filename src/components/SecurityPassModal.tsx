import React, { useState } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { format } from 'date-fns';

const SecurityPassModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const reservationDetails = {
        unit_name: "Marketing Department",
        event_name: "Annual Product Launch",
        representative_name: "Jane Smith",
        contact_number: "555-123-4567",
        event_types: ["Conference", "Product Demo"],
        facilities: ["Main Auditorium", "Conference Room B"],
        start_date: new Date(2025, 3, 15),
        end_date: new Date(2025, 3, 16),
        created_at: new Date(2025, 2, 20),
        staff_manpower_needed: ["Security Personnel", "Technical Support", "Ushers"],
        equipment_needed: ["PA System", "Projector", "Microphones"],
        presentation_equipment: ["Laser Pointer", "Wireless Presenter"],
        stage_options: ["Stage Lighting", "Podium"],
        lightning_options: ["Spotlights", "Ambient Lighting"]
    };

    const onClose = () => setIsOpen(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
                Show Security Pass
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl overflow-hidden">
                {/* Header */}
                <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Security Pass Details</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200 transition-all">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reservationDetails.event_name && (
                            <div className="col-span-full bg-blue-50 p-3 rounded-lg">
                                <p className="font-bold text-blue-800">Event</p>
                                <p className="text-lg text-blue-900">{reservationDetails.event_name}</p>
                            </div>
                        )}

                        {reservationDetails.unit_name && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-600">Unit Name</p>
                                <p className="text-gray-900">{reservationDetails.unit_name}</p>
                            </div>
                        )}

                        {reservationDetails.representative_name && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-600">Representative</p>
                                <p className="text-gray-900">{reservationDetails.representative_name}</p>
                            </div>
                        )}

                        {reservationDetails.contact_number && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-600">Contact</p>
                                <p className="text-gray-900">{reservationDetails.contact_number}</p>
                            </div>
                        )}

                        {reservationDetails.start_date && reservationDetails.end_date && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-600">Date</p>
                                <p className="text-gray-900">
                                    {format(reservationDetails.start_date, 'MMM dd, yyyy')}
                                    {" — "}
                                    {format(reservationDetails.end_date, 'MMM dd, yyyy')}
                                </p>
                            </div>
                        )}

                        {reservationDetails.created_at && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-600">Request Date</p>
                                <p className="text-gray-900">{format(reservationDetails.created_at, 'MMM dd, yyyy')}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 space-y-4">
                        {reservationDetails.event_types && reservationDetails.event_types.length > 0 && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-600 mb-1">Event Type</p>
                                <div className="flex flex-wrap gap-2">
                                    {reservationDetails.event_types.map((type, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {reservationDetails.facilities && reservationDetails.facilities.length > 0 && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-600 mb-1">Facilities</p>
                                <div className="flex flex-wrap gap-2">
                                    {reservationDetails.facilities.map((facility, index) => (
                                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                            {facility}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {reservationDetails.staff_manpower_needed && reservationDetails.staff_manpower_needed.length > 0 && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-semibold text-gray-600 mb-1">Staff Required</p>
                                <div className="flex flex-wrap gap-2">
                                    {reservationDetails.staff_manpower_needed.map((staff, index) => (
                                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                            {staff}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Equipment Section */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-semibold text-gray-600 mb-2">Equipment & Setup</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {reservationDetails.equipment_needed && reservationDetails.equipment_needed.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Equipment</p>
                                        <ul className="list-disc list-inside text-gray-800 text-sm">
                                            {reservationDetails.equipment_needed.map((equipment, index) => (
                                                <li key={index}>{equipment}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {reservationDetails.presentation_equipment && reservationDetails.presentation_equipment.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Presentation</p>
                                        <ul className="list-disc list-inside text-gray-800 text-sm">
                                            {reservationDetails.presentation_equipment.map((equipment, index) => (
                                                <li key={index}>{equipment}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {reservationDetails.stage_options && reservationDetails.stage_options.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Stage</p>
                                        <ul className="list-disc list-inside text-gray-800 text-sm">
                                            {reservationDetails.stage_options.map((option, index) => (
                                                <li key={index}>{option}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {reservationDetails.lightning_options && reservationDetails.lightning_options.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Lighting</p>
                                        <ul className="list-disc list-inside text-gray-800 text-sm">
                                            {reservationDetails.lightning_options.map((option, index) => (
                                                <li key={index}>{option}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t p-4 flex justify-between">
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-md hover:bg-blue-100 transition-all">
                            <Printer size={16} />
                            <span>Print</span>
                        </button>
                        <button className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-2 rounded-md hover:bg-green-100 transition-all">
                            <Download size={16} />
                            <span>Download</span>
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecurityPassModal;