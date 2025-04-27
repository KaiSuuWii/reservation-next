// components/BasicFacilities.tsx
import React, { ChangeEvent } from 'react';
import { FacilitySelectionProps } from '@/app/(protected)/dashboard/reservation/(ppo)/components/FollowUp';

interface BasicFacilitiesProps extends FacilitySelectionProps { }

export const BasicFacilities: React.FC<BasicFacilitiesProps> = ({ facilityNeeded, onFacilityChange }) => {
    const basicFacilities = [
        'Long Tables', 'Sound System', 'Ceiling Fans', 'Benches',
        'Digital Clock', 'Mono-block Chairs', 'Bulletin Board',
        'Standing Fans', 'Mats', 'Narra Chairs', 'Scaffolding',
        'Iwata Fans'
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Basic Facilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {basicFacilities.map((option) => (
                    <div key={option} className="flex items-center">
                        <input
                            type="checkbox"
                            id={option}
                            value={option}
                            checked={facilityNeeded.includes(option)}
                            onChange={onFacilityChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={option} className="ml-2 text-gray-700">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};