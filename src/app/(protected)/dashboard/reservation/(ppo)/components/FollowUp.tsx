// app/dashboard/staff/reservation/ppo/page.tsx
'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { BasicFacilities } from './BasicFacilities';
import { PresentationEquipment } from './PresentationEquipment';
import { StageOptions } from './StageOptions';
import { LightingOptions } from './LightingOptions';
import { ReviewStep } from './ReviewStep';
import { ConfirmationStep } from './ConfirmationStep';
import { ProgressBar } from './ProgressBar';

export interface FacilitySelectionProps {
  facilityNeeded: string[];
  onFacilityChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface PresentationEquipmentProps {
  facilityNeeded: string[];
  onFacilityChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface StageOptionsProps {
  facilityNeeded: string[];
  onFacilityChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface LightingSelectionProps {
  lightingOption: string;
  onLightingChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface ReviewStepProps {
  facilityNeeded: string[];
  lightingOption: string;
  presentationEquipment: string[];
  stageOptions: string[];
  onBack: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

// Define equipment categories for better organization
const PRESENTATION_EQUIPMENT = [
  'Podium', 'XU Seal', 'XU Logo',
  'Flag', 'Philippine Flag', 'XU Flag',
  'Projector', 'Screen', 'HDMI Cable',
  'Sound System', 'Microphone', 'Speakers',
  'Wireless Microphone', 'Wired Microphone', 'Lapel Microphone',
  'Microphone Stand', 'Desk Stand', 'HDMI', 'VGA', 'USB'
];

const STAGE_OPTIONS = [
  'Stage', 'Stage Backdrop', 'Stage Lights',
  'Stage Non-Acrylic', 'Stage Acrylic',
  'Non-Acrylic High', 'Non-Acrylic Medium', 'Non-Acrylic Low',
  'Acrylic High', 'Acrylic Medium', 'Acrylic Low'
];

export default function FollowUp({ acknowledgedId, setAcknolwedgeId, getNotifications }: {
  acknowledgedId: string;
  setAcknolwedgeId: (id: string) => void;
  getNotifications: () => Promise<void>;
}) {
  // Use null as initial state, then initialize with empty arrays
  // This helps prevent hydration errors by ensuring client/server match
  const [mounted, setMounted] = useState(false);
  const [facilityNeeded, setFacilityNeeded] = useState<string[]>([]);
  const [presentationEquipment, setPresentationEquipment] = useState<string[]>([]);
  const [stageOptions, setStageOptions] = useState<string[]>([]);
  const [lightingOption, setLightingOption] = useState<string>('');
  const [formStep, setFormStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle hydration issues by mounting after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync states when necessary
  useEffect(() => {
    // Update presentationEquipment based on facilityNeeded
    const updatedPresentationEquipment = facilityNeeded.filter(item =>
      PRESENTATION_EQUIPMENT.includes(item)
    );

    setPresentationEquipment(updatedPresentationEquipment);

    // Update stageOptions based on facilityNeeded
    const updatedStageOptions = facilityNeeded.filter(item =>
      STAGE_OPTIONS.includes(item) ||
      item.startsWith('Non-Acrylic') ||
      item.startsWith('Acrylic')
    );

    setStageOptions(updatedStageOptions);
  }, [facilityNeeded]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    const { value, checked } = e.target;

    // Handle parent checkbox actions from StageOptions component
    if (e.target.isParentAction) {
      const [parentValue, ...childValues] = value;
      const shouldCheck = e.target.shouldCheck;

      setFacilityNeeded(prev => {
        // Create a new array without the parent and its children
        const filtered = prev.filter(item =>
          item !== parentValue && !childValues.includes(item)
        );

        // If checking, add all values; if unchecking, just return filtered
        if (shouldCheck) {
          return [...filtered, parentValue, ...childValues];
        } else {
          return filtered;
        }
      });
      return;
    }

    // Regular checkbox handling with immutable approach
    setFacilityNeeded(prev => {
      let updatedFacilities = [...prev];

      // Helper function to handle relationships between items
      const updateRelatedItems = (mainItem: string, relatedItems: string[]) => {
        if (value === mainItem) {
          if (checked) {
            // Add main item and related items if they're not already included
            if (!updatedFacilities.includes(mainItem)) {
              updatedFacilities.push(mainItem);
            }

            // Add related items if they're not already included
            relatedItems.forEach(item => {
              if (!updatedFacilities.includes(item)) {
                updatedFacilities.push(item);
              }
            });
          } else {
            // Remove main item and related items
            updatedFacilities = updatedFacilities.filter(
              item => item !== mainItem && !relatedItems.includes(item)
            );
          }
        } else if (relatedItems.includes(value)) {
          if (checked) {
            // Add the checked item if not included
            if (!updatedFacilities.includes(value)) {
              updatedFacilities.push(value);
            }

            // Add the main item if not included
            if (!updatedFacilities.includes(mainItem)) {
              updatedFacilities.push(mainItem);
            }
          } else {
            // Remove the unchecked item
            updatedFacilities = updatedFacilities.filter(item => item !== value);

            // If no related items are checked, remove the main item too
            if (relatedItems.every(item => !updatedFacilities.includes(item))) {
              updatedFacilities = updatedFacilities.filter(item => item !== mainItem);
            }
          }
        }
      };

      // Handle the basic checked/unchecked state first
      if (checked && !updatedFacilities.includes(value)) {
        updatedFacilities.push(value);
      } else if (!checked) {
        updatedFacilities = updatedFacilities.filter(item => item !== value);
      }

      // Apply relationship rules
      updateRelatedItems('Podium', ['XU Seal', 'XU Logo']);
      updateRelatedItems('Flag', ['Philippine Flag', 'XU Flag']);
      updateRelatedItems('Projector', ['Screen', 'HDMI Cable']);
      updateRelatedItems('Sound System', ['Microphone', 'Speakers']);
      updateRelatedItems('Stage', ['Stage Backdrop', 'Stage Lights']);

      return updatedFacilities;
    });
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLightingOption(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    setTimeout(async () => {

      const response = await fetch('/api/dashboard/reservation/ppo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: acknowledgedId,
          equipment_needed: facilityNeeded,
          presentation_equipment: presentationEquipment,
          stage_options: stageOptions,
          lighting_options: lightingOption,
        }),
      });

      setIsSubmitting(false);
      setFormStep(3);
      setAcknolwedgeId('');
      getNotifications();
    }, 1000);
  };

  const goToReview = () => {
    setFormStep(2);
  };

  const goToFacilities = () => {
    setFormStep(1);
  };

  const startNewReservation = () => {
    setFacilityNeeded([]);
    setPresentationEquipment([]);
    setStageOptions([]);
    setLightingOption('');
    setFormStep(1);
  };

  // Prevent rendering until after client-side hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-blue-600 border-blue-200 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-8xl mx-auto">

        <ProgressBar currentStep={formStep} totalSteps={3} steps={['Select Facilities', 'Review & Submit', 'Confirmation']} />

        <div>
          {formStep === 1 && (
            <>
              <BasicFacilities facilityNeeded={facilityNeeded} onFacilityChange={handleCheckboxChange} />
              <PresentationEquipment facilityNeeded={facilityNeeded} onFacilityChange={handleCheckboxChange} />
              <StageOptions facilityNeeded={facilityNeeded} onFacilityChange={handleCheckboxChange} />
              <LightingOptions lightingOption={lightingOption} onLightingChange={handleRadioChange} />
              <div className="flex justify-end mt-8 gap-x-3">
              <button
                  type="button"
                  onClick={() => { startNewReservation(); setAcknolwedgeId(''); }}
                  className="cursor-pointer text-black outline py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={goToReview}
                  className="cursor-pointer bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Review Reservation
                </button>
              </div>
            </>
          )}
          {formStep === 2 && (
            <ReviewStep
              facilityNeeded={facilityNeeded}
              lightingOption={lightingOption}
              presentationEquipment={presentationEquipment}
              stageOptions={stageOptions}
              onBack={goToFacilities}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
          {formStep === 3 && (
            <ConfirmationStep onNewReservation={startNewReservation} />
          )}
        </div>
      </div>
    </div>
  );
};
