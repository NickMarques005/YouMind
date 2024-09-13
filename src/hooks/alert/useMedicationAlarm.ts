import { useEffect, useRef, useState } from "react";
import { Vibration } from "react-native";
import { MedicationPending } from "types/app/patient/health/Medicine_Types";
import { MessageIconTypes } from "types/icon/Icon_Types";

interface UseMedicationAlarm {
    medicationPending?: MedicationPending;
    confirmed: boolean;
    declined: boolean;
    isConfirming: boolean;
    exit: boolean;
    clearMedicationPending: () => void;
    HandleResponseAppSuccess: (message: string, messageType?: keyof MessageIconTypes) => void;
    setDeclined: React.Dispatch<React.SetStateAction<boolean>>;
    setExit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMedicationAlarm = ({
    medicationPending,
    confirmed,
    declined,
    isConfirming,
    exit,
    clearMedicationPending,
    HandleResponseAppSuccess,
    setDeclined,
    setExit
}: UseMedicationAlarm) => {
    const [maxDuration, setMaxDuration] = useState<number | undefined>(undefined);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const exitAlarmTime = useRef<number>(6000);
    const vibrationINTime = useRef<number>(5000);
    const vibrationOUTTime = useRef<number>(1000);

    const startAlarm = () => {
        if (!medicationPending) return;
        const { alarmDuration } = medicationPending.medication;
        const [scheduleHour, scheduleMinute] = medicationPending.currentSchedule.split(':').map(Number);
        const now = new Date();
        const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), scheduleHour, scheduleMinute);

        const timeDifference = alarmTime.getTime() - now.getTime();
        const maxAlarmDurationInSeconds = (timeDifference + (alarmDuration * 1000)) / 1000;
        console.log(maxAlarmDurationInSeconds);
        setMaxDuration(maxAlarmDurationInSeconds);
    };

    const exitAlarm = () => {
        console.log("Confirmed: ", confirmed);
        clearMedicationPending();
        if (confirmed) {
            let message = "Parabéns! Seu alarme foi confirmado, continue assim!"
            HandleResponseAppSuccess(message, "medication");
        }
        else {
            HandleResponseAppSuccess("Alarme não confirmado.", "warning");
        }
    }

    const handleRunningAlarm = async (maxDuration: number) => {
        if (isConfirming || declined || confirmed) {
            clearInterval(intervalRef.current!);
            Vibration.cancel();
            return;
        }

        if (maxDuration <= 0) {
            clearInterval(intervalRef.current!);
            setDeclined(true);
            setExit(true);
            return;
        }

        Vibration.vibrate(vibrationINTime.current);
        await new Promise(resolve => setTimeout(resolve, vibrationINTime.current));
        Vibration.cancel();
        await new Promise(resolve => setTimeout(resolve, vibrationOUTTime.current));
        setMaxDuration(prev => prev && prev - 6);
    }

    useEffect(() => {
        if (isConfirming || declined || confirmed) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }

        if (medicationPending) {
            if (!maxDuration) {
                startAlarm();
            }
            else {
                handleRunningAlarm(maxDuration);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            Vibration.cancel();
        };
    }, [medicationPending, isConfirming, declined, maxDuration, confirmed]);

    useEffect(() => {
        if (confirmed) {
            setExit(true);
        }
    }, [confirmed]);

    useEffect(() => {
        if(exit)
        {
            setTimeout(() => {
                exitAlarm();
            }, exitAlarmTime.current);
        }
    }, [exit]);

    return { exitAlarmTime };
}