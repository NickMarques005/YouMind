import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';
import { useState } from 'react';
import { Medication } from 'types/app/patient/health/Medicine_Types';

export const useScheduleBehavior = () => {
    const [currentMedication, setCurrentMedication] = useState<Medication | undefined>(undefined);
    const { medicationNavigateOnSuccess} = UseNavigateOnSuccess();

    const handleSelectedMedication = (medication: Medication) => {
        console.log("Go to current Medication...");
        medicationNavigateOnSuccess('update_medication', { currentMedication: medication})
    }

    const handleCurrentMedication = (medication: Medication) => {
        setCurrentMedication(medication);
    }

    const clearCurrentMedication = () => {
        setCurrentMedication(undefined);
    }

    return {
        currentMedication,
        clearCurrentMedication,
        handleCurrentMedication,
        handleSelectedMedication
    };
};