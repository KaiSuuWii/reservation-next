// components/ReviewStep.tsx
import React from 'react';

interface ReviewProps {
    facilityNeeded: string[];
    lightingOption: string;
    presentationEquipment: string[];
    stageOptions: string[];
    onBack: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
}

interface ReviewStepProps extends ReviewProps { }

export const ReviewStep: React.FC<ReviewStepProps> = ({
    facilityNeeded,
    lightingOption,
    presentationEquipment,
    stageOptions,
    onBack,
    onSubmit,
    isSubmitting
}) => {
    const basicFacilities = [
        'Long Tables', 'Sound System', 'Ceiling Fans', 'Benches',
        'Digital Clock', 'Mono-block Chairs', 'Bulletin Board',
        'Standing Fans', 'Mats', 'Narra Chairs', 'Scaffolding',
        'Iwata Fans'
    ];

    const selectedBasicFacilities = basicFacilities.filter(item => facilityNeeded.includes(item));

    const selectedNonAcrylicHeights = stageOptions.filter(item =>
        item.startsWith('Non-Acrylic') && ['High', 'Medium', 'Low'].includes(item.split(' ')[1])
    );

    const selectedAcrylicHeights = stageOptions.filter(item =>
        item.startsWith('Acrylic') && ['High', 'Medium', 'Low'].includes(item.split(' ')[1])
    );

    const hasNonAcrylicSelected = stageOptions.includes('Stage Non-Acrylic') || selectedNonAcrylicHeights.length > 0;
    const hasAcrylicSelected = stageOptions.includes('Stage Acrylic') || selectedAcrylicHeights.length > 0;

    const selectedPodiumAddons = presentationEquipment.filter(item => ['XU Seal', 'XU Logo'].includes(item));
    const selectedFlagAddons = presentationEquipment.filter(item => ['Philippine Flag', 'XU Flag'].includes(item));
    const selectedProjectorAddons = presentationEquipment.filter(item => ['HDMI', 'VGA', 'USB'].includes(item));
    const selectedMicrophoneAddons = presentationEquipment.filter(item => ['Microphone Stand', 'Desk Stand'].includes(item));

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Review Your Reservation</h2>

            <div className="space-y-6">
                {selectedBasicFacilities.length > 0 && (
                    <div className="mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">Basic Facilities</h3>
                        <div className="bg-gray-50 p-3 rounded-md">
                            <ul className="list-disc list-inside">
                                {selectedBasicFacilities.map((item, index) => (
                                    <li key={`basic-${index}`} className="text-gray-600">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {presentationEquipment.length > 0 && (
                    <div className="mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">Presentation Equipment</h3>
                        <div className="bg-gray-50 p-3 rounded-md">
                            <ul className="list-disc list-inside">
                                {presentationEquipment
                                    .filter(item => !['Podium', 'Flag', 'Projector', 'Wireless Microphone', 'Wired Microphone', 'Lapel Microphone'].includes(item))
                                    .map((item, index) => (
                                        <li key={`presentation-${index}`} className="text-gray-600">{item}</li>
                                    ))
                                }

                                {presentationEquipment.includes('Podium') && (
                                    <li key="podium">
                                        Podium
                                        {selectedPodiumAddons.length > 0 && (
                                            <ul className="list-disc list-inside ml-4">
                                                {selectedPodiumAddons.map((addon, index) => (
                                                    <li key={`podium-addon-${index}`} className="text-gray-600">{addon}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                )}

                                {presentationEquipment.includes('Flag') && (
                                    <li key="flag">
                                        Flag
                                        {selectedFlagAddons.length > 0 && (
                                            <ul className="list-disc list-inside ml-4">
                                                {selectedFlagAddons.map((addon, index) => (
                                                    <li key={`flag-addon-${index}`} className="text-gray-600">{addon}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                )}

                                {presentationEquipment.includes('Projector') && (
                                    <li key="projector">
                                        Projector
                                        {selectedProjectorAddons.length > 0 && (
                                            <ul className="list-disc list-inside ml-4">
                                                {selectedProjectorAddons.map((addon, index) => (
                                                    <li key={`projector-addon-${index}`} className="text-gray-600">{addon}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                )}

                                {(presentationEquipment.includes('Wireless Microphone') ||
                                    presentationEquipment.includes('Wired Microphone') ||
                                    presentationEquipment.includes('Lapel Microphone')) && (
                                        <li key="microphones">
                                            Microphones
                                            <ul className="list-disc list-inside ml-4">
                                                {presentationEquipment.includes('Wireless Microphone') && (
                                                    <li key="wireless-mic" className="text-gray-600">Wireless Microphone</li>
                                                )}
                                                {presentationEquipment.includes('Wired Microphone') && (
                                                    <li key="wired-mic" className="text-gray-600">Wired Microphone</li>
                                                )}
                                                {presentationEquipment.includes('Lapel Microphone') && (
                                                    <li key="lapel-mic" className="text-gray-600">Lapel Microphone</li>
                                                )}
                                                {selectedMicrophoneAddons.length > 0 && selectedMicrophoneAddons.map((addon, index) => (
                                                    <li key={`mic-addon-${index}`} className="text-gray-600">{addon}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    )}
                            </ul>
                        </div>
                    </div>
                )}

                {stageOptions.length > 0 && (
                    <>
                        {hasNonAcrylicSelected && (
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-700 mb-2">Stage Non-Acrylic</h3>
                                <div className="bg-gray-50 p-3 rounded-md">
                                    <ul className="list-disc list-inside">
                                        {stageOptions.includes('Stage Non-Acrylic') && <li key="stage-non-acrylic" className="text-gray-600">Stage Non-Acrylic</li>}
                                        {selectedNonAcrylicHeights.map((option, index) => (
                                            <li key={`non-acrylic-${index}`} className="text-gray-600">{option}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {hasAcrylicSelected && (
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-700 mb-2">Stage Acrylic</h3>
                                <div className="bg-gray-50 p-3 rounded-md">
                                    <ul className="list-disc list-inside">
                                        {stageOptions.includes('Stage Acrylic') && <li key="stage-acrylic" className="text-gray-600">Stage Acrylic</li>}
                                        {selectedAcrylicHeights.map((option, index) => (
                                            <li key={`acrylic-${index}`} className="text-gray-600">{option}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {lightingOption && (
                    <div className="mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">Lighting Option</h3>
                        <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-gray-600">{lightingOption}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-blue-600 bg-white border border-blue-600 py-2 px-6 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    Back to Edit
                </button>
                <button
                    type="button"
                    onClick={(e) => onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        'Submit Reservation'
                    )}
                </button>
            </div>
        </div>
    );
};