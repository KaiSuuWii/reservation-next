import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    steps: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => (
    <div className="mb-8">
        <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
                <span
                    key={step}
                    className={`text-sm font-medium ${currentStep > index ? 'text-blue-600' : 'text-gray-500'}`}
                >
                    {step}
                </span>
            ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
        </div>
    </div>
);