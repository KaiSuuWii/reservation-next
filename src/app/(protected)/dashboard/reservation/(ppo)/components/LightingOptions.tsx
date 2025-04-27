import { LightingSelectionProps } from '@/app/(protected)/dashboard/reservation/(ppo)/components/FollowUp';

interface LightingOptionsProps extends LightingSelectionProps { }

export const LightingOptions: React.FC<LightingOptionsProps> = ({ lightingOption, onLightingChange }) => {
    const lightingOptions = ['With Lights', 'Without Lights'];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Lighting Options</h2>
            <div className="flex flex-wrap gap-4">
                {lightingOptions.map((option) => (
                    <div key={option} className="flex items-center">
                        <input
                            type="radio"
                            id={option.replace(/\s+/g, '_')}
                            value={option}
                            checked={lightingOption === option}
                            onChange={onLightingChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
                        />
                        <label htmlFor={option.replace(/\s+/g, '_')} className="ml-2 text-gray-700">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};