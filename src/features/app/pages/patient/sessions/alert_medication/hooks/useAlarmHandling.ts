
import { MessageIcon } from '@components/modals/message/types/type_message_modal';
import { useMedicationPending } from '@features/app/providers/patient/MedicationPendingProvider';
import { UseMedicationService } from '@hooks/api/UseMedicationService';
import { useEffect, useRef, useState } from 'react';
import { Vibration } from 'react-native';
import { SharedValue, runOnJS, withSpring } from 'react-native-reanimated';
import { MedicationPending } from 'types/app/patient/health/Medicine_Types';
import { SetLoading } from 'types/loading/Loading_Types';
import { AppStackNavigation } from 'types/navigation/Navigation_Types';

interface AlarmHandlingProps {
    isConfirming: boolean;
    confirmed: boolean;
    declined: boolean;
    setDeclined: React.Dispatch<React.SetStateAction<boolean>>;
    setIsConfirming: (value: React.SetStateAction<boolean>) => void;
    confirmProgress: SharedValue<number>;
    setLoading: SetLoading;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
    medicationPending: MedicationPending;
    navigateToAppScreen: (screenName: keyof AppStackNavigation) => void;
    setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
    clearMedicationPending: () => void;
}

export const useAlarmHandling = ({
    setIsConfirming,
    confirmProgress,
    setLoading,
    isConfirming,
    confirmed,
    declined,
    setDeclined,
    HandleResponseAppError,
    HandleResponseAppSuccess,
    medicationPending,
    navigateToAppScreen,
    setConfirmed,
    clearMedicationPending
}: AlarmHandlingProps) => {
    const { performConfirmMedicationAlert } = UseMedicationService(setLoading);
    const [maxDuration, setMaxDuration] = useState<number | undefined>(undefined);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    const startAlarm = () => {
        const { alarmDuration } = medicationPending.medication;
        const [scheduleHour, scheduleMinute] = medicationPending.currentSchedule.split(':').map(Number);
        const now = new Date();
        const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), scheduleHour, scheduleMinute);

        const timeDifference = alarmTime.getTime() - now.getTime();
        const maxAlarmDurationInSeconds = (timeDifference + (alarmDuration * 1000)) / 1000;
        console.log(maxAlarmDurationInSeconds);
        setMaxDuration(maxAlarmDurationInSeconds);
    };

    const handleRunningAlarm = async (maxDuration: number) => {
        if (isConfirming || declined || confirmed) {
            clearInterval(intervalRef.current!);
            Vibration.cancel();
            return;
        }

        if (maxDuration <= 0) {
            clearInterval(intervalRef.current!);
            setDeclined(true);
            setTimeout(() => {
                exitAlarm();
            }, 6000);
            return;
        }

        Vibration.vibrate(5000);
        await new Promise(resolve => setTimeout(resolve, 5000));
        Vibration.cancel();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMaxDuration(prev => prev && prev - 6);
    }

    const exitAlarm = () => {
        navigateToAppScreen('main_page');
        console.log("Confirmed: ", confirmed);
        clearMedicationPending();
        if (confirmed) {
            let message = "Parabéns! Seu alarme foi confirmado, continue assim!"
            HandleResponseAppSuccess(message, "medication");
        }
        else {
            HandleResponseAppSuccess("Alarme não confirmado.", "warning" );
        }
    }

    const handleConfirmAlarm = async () => {
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

    useEffect(() => {
        if (isConfirming || declined || confirmed) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }

        if (!maxDuration) {
            startAlarm();
        }
        else {
            console.log(maxDuration);
            handleRunningAlarm(maxDuration);
        }


        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            Vibration.cancel();
        };
    }, [isConfirming, declined, maxDuration, confirmed]);

    useEffect(() => {
        if(confirmed)
        {
            setTimeout(() => {
                exitAlarm();
            }, 4000);
        }
    }, [confirmed]);

    return { handleSwipeEnd };
};