import { FacilitySelectionProps } from '@/app/(protected)/dashboard/reservation/(ppo)/components/FollowUp';
import React from 'react';

interface PresentationEquipmentProps extends FacilitySelectionProps { }

export const PresentationEquipment: React.FC<PresentationEquipmentProps> = ({ facilityNeeded, onFacilityChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Presentation Equipment</h2>
            <div className="mb-6">
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                    <input
                        type="checkbox"
                        id="Podium"
                        value="Podium"
                        checked={facilityNeeded.includes('Podium')}
                        onChange={onFacilityChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="Podium" className="ml-2 text-gray-700 font-medium">
                        Podium
                    </label>
                </div>
                <div className="ml-8 mt-2 space-y-2 bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="XU_Seal"
                            value="XU Seal"
                            checked={facilityNeeded.includes('XU Seal')}
                            onChange={onFacilityChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="XU_Seal" className="ml-2 text-gray-700">
                            XU Seal
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="XU_Logo"
                            value="XU Logo"
                            checked={facilityNeeded.includes('XU Logo')}
                            onChange={onFacilityChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="XU_Logo" className="ml-2 text-gray-700">
                            XU Logo
                        </label>
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                    <input
                        type="checkbox"
                        id="Flag"
                        value="Flag"
                        checked={facilityNeeded.includes('Flag')}
                        onChange={onFacilityChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="Flag" className="ml-2 text-gray-700 font-medium">
                        Flag
                    </label>
                </div>
                <div className="ml-8 mt-2 space-y-2 bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="Philippine_Flag"
                            value="Philippine Flag"
                            checked={facilityNeeded.includes('Philippine Flag')}
                            onChange={onFacilityChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="Philippine_Flag" className="ml-2 text-gray-700">
                            Philippine Flag
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="XU_Flag"
                            value="XU Flag"
                            checked={facilityNeeded.includes('XU Flag')}
                            onChange={onFacilityChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="XU_Flag" className="ml-2 text-gray-700">
                            XU Flag
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};