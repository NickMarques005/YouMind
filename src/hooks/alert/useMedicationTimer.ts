import { useEffect, useRef, useState } from "react";
import { MedicationPending } from "types/app/patient/health/Medicine_Types";

interface UseMedicationTimerParams {
    medicationPending?: MedicationPending;
    confirmed: boolean;
    declined: boolean;
}

export const useMedicationTimer = ({ medicationPending, confirmed, declined }: UseMedicationTimerParams) => {

    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [formattedTime, setFormattedTime] = useState<string>("");
    const intervalTimerRef = useRef<NodeJS.Timeout | null>(null);

    const handleAlarmTimerConfiguration = (medicationPending: MedicationPending) => {
        const { alarmDuration } = medicationPending.medication;
        const [scheduleHour, scheduleMinute] = medicationPending.currentSchedule.split(':').map(Number);
        const now = new Date();
        const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), scheduleHour, scheduleMinute);
        const timeDifference = alarmTime.getTime() - now.getTime();
        const maxAlarmDurationInSeconds = (timeDifference + (alarmDuration * 1000)) / 1000;

        setTimeLeft(maxAlarmDurationInSeconds);
    }

    const updateAlarmTimer = () => {
        intervalTimerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime !== null && prevTime > 1) {
                    return prevTime - 1;
                } else {
                    if (intervalTimerRef.current) clearInterval(intervalTimerRef.current);
                    return 0;
                }
            });
        }, 1000);
    };

    useEffect(() => {
        if (!medicationPending || confirmed || declined) {
            setTimeLeft(null);
            return;
        }

        handleAlarmTimerConfiguration(medicationPending);

        updateAlarmTimer();

        return () => {
            if (intervalTimerRef.current) {
                clearInterval(intervalTimerRef.current);
            }
        };
    }, [medicationPending, confirmed, declined]);

    useEffect(() => {
        if (timeLeft !== null) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = Math.floor(timeLeft % 60);
            setFormattedTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
    }, [timeLeft]);

    return { formattedTime, timeLeft };
};