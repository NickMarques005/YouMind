
import { Priority } from '@features/app/providers/bridge/PriorityProvider';
import { UseMedicationService } from '@hooks/api/UseMedicationService';
import { useEffect, useRef, useState } from 'react';
import { Vibration } from 'react-native';
import { SharedValue, runOnJS, withSpring } from 'react-native-reanimated';
import { MedicationPending } from 'types/app/patient/health/Medicine_Types';
import { MessageIconTypeKey } from 'types/icon/Icon_Types';
import { SetLoading } from 'types/loading/Loading_Types';
import { AppScreenName } from 'types/navigation/Navigation_Types';

interface AlarmHandlingProps {
    isConfirming: boolean;
    confirmed: boolean;
    declined: boolean;
    medicationPending?: MedicationPending;
    confirmProgress: SharedValue<number>;
    setDeclined: React.Dispatch<React.SetStateAction<boolean>>;
    setIsConfirming: (value: React.SetStateAction<boolean>) => void;
    setLoading: SetLoading;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIconTypeKey) => void;
    setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
    clearMedicationPending: () => void;
    removePriority: (priority: Priority) => void
}

export const useAlarmHandling = ({
    confirmProgress,
    medicationPending,
    setLoading,
    HandleResponseAppError,
    setIsConfirming,
    setConfirmed,
}: AlarmHandlingProps) => {
    const { performConfirmMedicationAlert } = UseMedicationService(setLoading);

    const handleSwipeEnd = () => {
        setIsConfirming(true);
        confirmProgress.value = withSpring(1, {
            damping: 20,
            stiffness: 90,
            mass: 1,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        });
        handleConfirmAlarm();
    };

    const handleConfirmAlarm = async () => {
        if (!medicationPending) return;

        try {
            const response = await performConfirmMedicationAlert(medicationPending.medicationHistoryId);
            if (response.success) {
                setConfirmed(true);
            } else {
                HandleResponseAppError(response.error || "Erro ao confirmar alarme.");
            }

        } catch (err) {
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
        finally {
            setIsConfirming(false);
        }
    }

    return { handleSwipeEnd };
};