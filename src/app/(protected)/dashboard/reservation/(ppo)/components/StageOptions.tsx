import React, { ChangeEvent } from 'react';
import { FacilitySelectionProps } from '@/app/(protected)/dashboard/reservation/(ppo)/components/FollowUp';

interface StageOptionsProps extends FacilitySelectionProps { }

export const StageOptions: React.FC<StageOptionsProps> = ({ facilityNeeded, onFacilityChange }) => {
    const stageHeights = ['High', 'Medium', 'Low'];

    // Handle parent checkbox changes
    const handleParentChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = e.target;
        const isAcrylic = value === 'Stage Acrylic';
        const prefix = isAcrylic ? 'Acrylic' : 'Non-Acrylic';

        // Create a new event-like object to pass to the original handler
        const childrenValues = stageHeights.map(height => `${prefix} ${height}`);

        // Create a synthetic event
        const syntheticEvent = {
            ...e,
            target: {
                ...e.target,
                // The value becomes an array containing the parent and all children
                value: [value, ...childrenValues],
                // Additional property to indicate this is a parent checkbox action
                isParentAction: true,
                shouldCheck: checked
            }
        };

        onFacilityChange(syntheticEvent as any);
    };

    // Check if all children of a parent are selected
    const areAllChildrenSelected = (prefix: string): boolean => {
        return stageHeights.every(height =>
            facilityNeeded.includes(`${prefix} ${height}`)
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Stage Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-6">
                    <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                        <input
                            type="checkbox"
                            id="Stage_Non_Acrylic"
                            value="Stage Non-Acrylic"
                            checked={facilityNeeded.includes('Stage Non-Acrylic') || areAllChildrenSelected('Non-Acrylic')}
                            onChange={handleParentChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="Stage_Non_Acrylic" className="ml-2 text-gray-700 font-medium">
                            Stage Non-Acrylic
                        </label>
                    </div>
                    <div className="ml-8 mt-2 space-y-2 bg-gray-50 p-3 rounded-md">
                        {stageHeights.map((height) => (
                            <div key={`non-acrylic-${height}`} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`Non_Acrylic_${height}`}
                                    value={`Non-Acrylic ${height}`}
                                    checked={facilityNeeded.includes(`Non-Acrylic ${height}`)}
                                    onChange={onFacilityChange}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={`Non_Acrylic_${height}`} className="ml-2 text-gray-700">
                                    {height} (Non-Acrylic)
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                        <input
                            type="checkbox"
                            id="Stage_Acrylic"
                            value="Stage Acrylic"
                            checked={facilityNeeded.includes('Stage Acrylic') || areAllChildrenSelected('Acrylic')}
                            onChange={handleParentChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="Stage_Acrylic" className="ml-2 text-gray-700 font-medium">
                            Stage Acrylic
                        </label>
                    </div>
                    <div className="ml-8 mt-2 space-y-2 bg-gray-50 p-3 rounded-md">
                        {stageHeights.map((height) => (
                            <div key={`acrylic-${height}`} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`Acrylic_${height}`}
                                    value={`Acrylic ${height}`}
                                    checked={facilityNeeded.includes(`Acrylic ${height}`)}
                                    onChange={onFacilityChange}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={`Acrylic_${height}`} className="ml-2 text-gray-700">
                                    {height} (Acrylic)
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};