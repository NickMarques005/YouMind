import { convertDurationToDays, convertFrequencies } from "@utils/date/DateConversions";
import { useState } from "react";
import { Medication, MedicationDuration, MedicationFrequency } from "types/app/patient/health/Medicine_Types";
import { DateTime } from 'luxon';

interface UseMedicationFormBehaviorProps {
    currentMedication?: Medication;
}

export type MedicationFormModal = 'Schedules' | 'Frequencies' | 'ReminderTimes' | 'AlarmDuration' | 'Start' | 'Duration';

export const useMedicationFormBehavior = ({ currentMedication }: UseMedicationFormBehaviorProps) => {
    const initialFrequency: MedicationFrequency = currentMedication ? convertFrequencies(currentMedication.frequency) : "Dias";
    const initialduration: MedicationDuration = 'Dias';
    const [suggestions, setSuggestions] = useState<string[] | undefined>([]);
    const [frequencyType, setFrequencyType] = useState<MedicationFrequency>(initialFrequency);
    const [activeModal, setActiveModal] = useState<MedicationFormModal | null>(null);
    const [currentScheduleIndex, setCurrentScheduleIndex] = useState<number | undefined>(undefined);
    const [currentSchedule, setCurrentSchedule] = useState<string | undefined>(undefined);
    const [alarmDuration, setAlarmDuration] = useState<number | undefined>(currentMedication?.alarmDuration);
    const [reminderTimes, setReminderTimes] = useState<number | undefined>(currentMedication?.reminderTimes);
    const [startDateText, setStartDateText] = useState<string>("Hoje");
    const [durationType, setDurationType] = useState<MedicationDuration>(initialduration);

    const handleStartDateSelect = (date: string) => {
        setStartDateText(date);
    };

    const clearActiveModal = () => {
        if (currentSchedule) setCurrentSchedule(undefined);
        if (currentScheduleIndex) setCurrentScheduleIndex(undefined);
        setActiveModal(null);
    }

    const showFormModal = (modalType: MedicationFormModal) => setActiveModal(modalType);

    const handleFrequency = (frequency: MedicationFrequency) => {
        setFrequencyType(frequency);
    }

    const handleDuration = (duration: MedicationDuration) => {
        setDurationType(duration);
    }

    const formatFrequency = (frequency: number, frequencyType: string): number => {
        const durationValue = frequency;
        if (isNaN(durationValue)) {
            return 0;
        }

        switch (frequencyType) {
            case 'Dias':
                return durationValue;
            case 'Semanas':
                return durationValue * 7;
            case 'Meses':
                return durationValue * 30;
            default:
                return durationValue;
        }
    };

    const calculateExpiresAt = (start: Date, durationInDays: number, frequencyInDays: number): Date => {
        const startDate = DateTime.fromJSDate(start);
        let currentDate = startDate;
        let daysCovered = 0;
    
        daysCovered += durationInDays;
        currentDate = currentDate.plus({ days: durationInDays });
    
        while (currentDate.diff(startDate, 'days').days % frequencyInDays !== 0) {
            currentDate = currentDate.plus({ days: 1 });
        }
    
        return currentDate.toJSDate();
    };

    const formatExpiresAt = (start: Date, duration: string, durationType: MedicationDuration, frequency: number): Date => {
        const durationInDays = convertDurationToDays(duration, durationType);
        return calculateExpiresAt(start, durationInDays, frequency);
    }

    return {
        suggestions,
        setSuggestions,
        formatFrequency,
        handleFrequency,
        frequencyType,
        formatExpiresAt,
        activeModal,
        showFormModal,
        clearActiveModal,
        currentSchedule,
        currentScheduleIndex,
        setCurrentSchedule,
        setCurrentScheduleIndex,
        reminderTimes,
        setReminderTimes,
        alarmDuration,
        setAlarmDuration,
        startDateText,
        handleStartDateSelect,
        durationType,
        handleDuration
    }
}