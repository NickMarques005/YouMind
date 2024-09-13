import { useEffect } from 'react';
import { useMedicationPending } from '@features/app/providers/patient/MedicationPendingProvider';
import { useSharedValue } from 'react-native-reanimated';
import { Priority } from '@features/app/providers/bridge/PriorityProvider';
interface MedicationPendingBehaviorParams {
    removePriority: (priority: Priority) => void;
}

export const useMedicationPendingBehavior = ({ removePriority }: MedicationPendingBehaviorParams) => {
    const { 
        medicationPending, 
        clearMedicationPending,
        isConfirming,
        setIsConfirming,
        confirmed,
        setConfirmed,
        declined,
        setDeclined,
        formattedTime,
        exitAlarmTime,
        exit
    } = useMedicationPending();
    
    const translateX = useSharedValue(0);
    const confirmProgress = useSharedValue(0);

    const handleLeaveAlert = () => {
        removePriority('medicationPending');
    }

    useEffect(() => {
        if(exit)
        {
            setTimeout(() => {
                handleLeaveAlert();
            }, exitAlarmTime.current * 0.7);
        }
    }, [exit]);
    
    return { 
        medicationPending,
        isConfirming,
        setIsConfirming,
        confirmed,
        setConfirmed,
        translateX,
        confirmProgress,
        declined,
        setDeclined,
        clearMedicationPending,
        handleLeaveAlert,
        formattedTime
    };
};