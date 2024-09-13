import { calculateDaysBetweenDates, convertFrequencies } from "@utils/date/DateConversions";
import { useState } from "react";
import { Medication, MedicationDurationType, MedicationFrequencyType } from "types/app/patient/health/Medicine_Types";

interface UseMedicationFormBehaviorProps {
    currentMedication?: Medication;
}

export type MedicationFormModal = 'Schedules' | 'Frequencies' | 'ReminderTimes' | 'AlarmDuration' | 'Start' | 'Duration';

export const useMedicationFormBehavior = ({ currentMedication }: UseMedicationFormBehaviorProps) => {
    const initialFrequency: MedicationFrequencyType = currentMedication && currentMedication.frequency ? convertFrequencies(currentMedication.frequency) : "Dias";
    const initialDuration: MedicationDurationType = 'Dias';
    const [suggestions, setSuggestions] = useState<string[] | undefined>([]);
    const [frequencyType, setFrequencyType] = useState<MedicationFrequencyType>(initialFrequency);
    const [activeModal, setActiveModal] = useState<MedicationFormModal | null>(null);
    const [currentScheduleIndex, setCurrentScheduleIndex] = useState<number | undefined>(undefined);
    const [currentSchedule, setCurrentSchedule] = useState<string | undefined>(undefined);
    const [alarmDuration, setAlarmDuration] = useState<number | undefined>(currentMedication?.alarmDuration);
    const [reminderTimes, setReminderTimes] = useState<number | undefined>(currentMedication?.reminderTimes);
    const [startDateText, setStartDateText] = useState<string>("Hoje");
    const [durationType, setDurationType] = useState<MedicationDurationType>(initialDuration);
    const [duration, setDuration] = useState<string>(currentMedication && currentMedication.start && currentMedication.expiresAt ? calculateDaysBetweenDates(currentMedication.start, currentMedication.expiresAt).toString() : '');
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const handleStartDateSelect = (date: string) => {
        setStartDateText(date);
    };

    const clearActiveModal = () => {
        if (currentSchedule) setCurrentSchedule(undefined);
        if (currentScheduleIndex) setCurrentScheduleIndex(undefined);
        setActiveModal(null);
    }

    const showFormModal = (modalType: MedicationFormModal) => setActiveModal(modalType);

    const handleFrequency = (frequency: MedicationFrequencyType) => {
        setFrequencyType(frequency);
    }

    const handleDurationType = (durationType: MedicationDurationType) => {
        setDurationType(durationType);
    }

    const handleShowCalendar = () => {
        setShowCalendar(prev => !prev);
    }

    const handleDurationChange = (value: string) => {
        setDuration(value);
    }

    return {
        suggestions,
        setSuggestions,
        handleFrequency,
        frequencyType,
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
        handleDurationType,
        handleShowCalendar,
        showCalendar,
        duration,
        handleDurationChange
    }
}