import { convertFrequencies } from '@utils/date/DateConversions';
import { formatMedicationDateString } from '@utils/date/DateFormatting';
import { useEffect, useState } from 'react';
import { MedicationFormType, MedicationFrequency } from 'types/app/patient/health/Medicine_Types';

interface UseMedicationFormProps {
    initialState: MedicationFormType;
    fetchMedications: (query: string) => Promise<never[] | undefined>;
    handleFrequency?: (frequency: MedicationFrequency) => void;
}

export const useMedicationForm = ({ initialState, fetchMedications, handleFrequency }: UseMedicationFormProps) => {
    const [form, setForm] = useState(initialState);
    const [suggestionSelected, setSuggestionSelected] = useState<string | undefined>(undefined);


    const handleReminderTimesForm = (reminderTimes: number) => {
        setForm((prevForm) => ({
            ...prevForm,
            reminderTimes,
        }));
    };

    const handleAlarmDurationForm = (duration: number) => {
        setForm((prevForm) => ({
            ...prevForm,
            alarmDuration: duration,
        }));
    };

    const handleStartDate = (start: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            start: start,
        }));
    }

    const addScheduleToForm = (schedule: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            schedules: [...prevForm.schedules, schedule],
        }));
    };

    const updateScheduleForm = (schedule: string, index: number) => {
        setForm((prevForm) => {
            const updatedSchedules = [...prevForm.schedules];
            updatedSchedules[index] = schedule;
            return {
                ...prevForm,
                schedules: updatedSchedules,
            };
        });
    }

    const deleteScheduleForm = (index: number) => {
        setForm((prevForm) => ({
            ...prevForm,
            schedules: prevForm.schedules.filter((_, i) => i !== index),
        }));
    }

    const handleExpiresAtForm = (expiresAt: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            expiresAt: expiresAt
        }));
    }

    const handleInputChange = (field: keyof MedicationFormType, value: string) => {
        let newValue = value;

        console.log(newValue);
        if (['expiresAt', 'frequency', 'dosage'].includes(field)) {
            if (field === 'dosage') {
                newValue = value.replace(/[^0-9.]/g, '');
            } else {
                
                newValue = value.replace(/[^0-9]/g, '');
            }
        }

        if (field === 'frequency') {
            newValue = newValue.replace(/\D/g, '');
            if (newValue === '0') {
                return;
            }
        }


        if (field === 'name') {
            if (suggestionSelected) {
                if (value !== suggestionSelected) {
                    setSuggestionSelected(undefined);
                }
            }

            if (value.length > 50) {
                return;
            }
            if (!suggestionSelected || value !== suggestionSelected) {
                fetchMedications(value);
            }
        }

        setForm({
            ...form,
            [field]: newValue,
        });
    };

    const handleSuggestionSelection = (value: string) => {
        setSuggestionSelected(value);
        setForm((prevForm) => ({
            ...prevForm,
            name: value,
        }));
    };

    const dosageUnits: { [key: string]: string } = {
        Líquido: 'ml',
        Comprimido: 'mg',
        Cápsula: 'mg',
    };

    return {
        form,
        handleInputChange,
        setForm,
        dosageUnits,
        addScheduleToForm,
        deleteScheduleForm,
        updateScheduleForm,
        handleAlarmDurationForm,
        handleReminderTimesForm,
        handleStartDate,
        handleExpiresAtForm,
        handleSuggestionSelection
    };
};