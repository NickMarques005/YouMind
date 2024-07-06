import { useState } from 'react';
import { useMedicationPending } from '@features/app/providers/patient/MedicationPendingProvider';
import { UseAppNavigation } from '@features/app/hooks/UseAppNavigation';
import { AppStackNavigation } from 'types/navigation/Navigation_Types';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

interface MedicationPendingBehavior {
    medicationPending: any; 
    navigateToAppScreen: (screenName: keyof AppStackNavigation) => void;
    isConfirming: boolean;
    confirmed: boolean;
    setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
    translateX: SharedValue<number>;
    confirmProgress: SharedValue<number>;
    declined: boolean;
    setDeclined: React.Dispatch<React.SetStateAction<boolean>>;
    clearMedicationPending: () => void;
}

export const useMedicationPendingBehavior = (): MedicationPendingBehavior => {
    const { medicationPending, clearMedicationPending } = useMedicationPending();
    const { navigateToAppScreen } = UseAppNavigation();
    const [isConfirming, setIsConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [declined, setDeclined]= useState(false);
    const translateX = useSharedValue(0);
    const confirmProgress = useSharedValue(0);

    
    return { 
        medicationPending, 
        navigateToAppScreen,
        isConfirming,
        setIsConfirming,
        confirmed,
        setConfirmed,
        translateX,
        confirmProgress,
        declined,
        setDeclined,
        clearMedicationPending
    };
};