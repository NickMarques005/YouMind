import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { formatDateToISO, formatISOToDate, validateAndFormatISODate } from '@utils/date/DateFormatting';
import { calculateMedicationMarkedDates, convertFrequencyToNumber, FormatExpiresAtParams } from '@utils/health/HandlingMedication';
import { useEffect, useState } from 'react';
import { MarkedDates, MarkingTypes } from 'react-native-calendars/src/types';
import { MedicationDurationType, MedicationFormType, MedicationFrequencyType } from 'types/app/patient/health/Medicine_Types';

interface UseMedicationFormProps {
    initialState: MedicationFormType;
    fetchMedications: (query: string) => Promise<never[] | undefined>;
    duration: string;
    handleDurationChange: (value: string) => void;
    formatExpiresAt: ({ start, frequencyType, durationType, frequency, duration, onError }: FormatExpiresAtParams) => Date | undefined;
    frequencyType: MedicationFrequencyType;
    durationType: MedicationDurationType;
}

export const useMedicationForm = ({
    initialState,
    fetchMedications,
    duration,
    handleDurationChange,
    durationType,
    frequencyType,
    formatExpiresAt

}: UseMedicationFormProps) => {
    const { HandleResponseAppError } = UseGlobalResponse();
    const [form, setForm] = useState<MedicationFormType>(initialState);
    const [suggestionSelected, setSuggestionSelected] = useState<string | undefined>(undefined);
    const [scheduleMarkedDates, setScheduleMarkedDates] = useState<MarkedDates | undefined>(undefined);
    const [hasSchedulePeriodCompleted, setHasSchedulePeriodCompleted] = useState(false);
    const [scheduleMarkingType, setScheduleMarkingType] = useState<MarkingTypes | undefined>(undefined)

    const dosageUnits: { [key: string]: string } = {
        Líquido: 'ml',
        Comprimido: 'mg',
        Cápsula: 'mg',
    };

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

        if (field === 'start') {
            const startDate = formatISOToDate(value);
            if (startDate === null) {
                HandleResponseAppError("Houve um erro inesperado: o início do agendamento sofreu uma formatação equivocada");
                return;
            }
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (startDate < today) {
                HandleResponseAppError("Atenção! A data de início do agendamento do medicamento não pode ser menor que hoje");
                return;
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

    const handleScheduleMarkedDates = (dates: MarkedDates | undefined) => {
        setScheduleMarkedDates(dates);
    }

    useEffect(() => {
        if (form.start) {
            const convertedFrequency = convertFrequencyToNumber(form.frequency);
            let expiresAt = undefined;
            const formattedExpiresAt = formatExpiresAt({
                start: form.start,
                frequency: convertedFrequency,
                frequencyType,
                durationType,
                duration
            });

            if (formattedExpiresAt) {
                expiresAt = validateAndFormatISODate(formatDateToISO(formattedExpiresAt)) 
                console.log("ExpiresAt formatado e validado: ", expiresAt);
                console.log("Start form: ", form.start);
                if(expiresAt === form.start)
                {
                    handleInputChange('frequency', '0');
                    handleDurationChange("0");
                }
                handleExpiresAtForm(expiresAt || "");
            }

            const newMarkedDates: MarkedDates = calculateMedicationMarkedDates({
                start: form.start,
                expiresAt: expiresAt,
                frequency: convertedFrequency,
                frequencyType,
                markingType: scheduleMarkingType
            });

            handleScheduleMarkedDates(newMarkedDates);
        } else {
            handleExpiresAtForm('');
            handleScheduleMarkedDates(undefined);
            setScheduleMarkingType(undefined);
            setHasSchedulePeriodCompleted(false);
        }
    }, [form.start, form.frequency, duration, frequencyType, durationType]);

    useEffect(() => {
        if (scheduleMarkedDates && form.start) {
            const startDate = form.start;
            const endDate = form.expiresAt;
            if (endDate && scheduleMarkedDates[startDate] && scheduleMarkedDates[endDate]) {
                if(startDate !== endDate)
                {
                    setScheduleMarkingType('period');
                }
                else{
                    setScheduleMarkingType(undefined);
                }
                
                setHasSchedulePeriodCompleted(true);
            } else {
                setScheduleMarkingType(undefined);
                setHasSchedulePeriodCompleted(false);
            }
        }
    }, [scheduleMarkedDates, form.start, form.expiresAt]);

    useEffect(() => {
        if(durationType === 'Hoje')
        {
            const today = validateAndFormatISODate(formatDateToISO(new Date()));
            handleInputChange('start', today);
        }
    }, [durationType]);

    return {
        form,
        dosageUnits,
        scheduleMarkedDates,
        hasSchedulePeriodCompleted,
        scheduleMarkingType,
        handleInputChange,
        setForm,
        addScheduleToForm,
        deleteScheduleForm,
        updateScheduleForm,
        handleAlarmDurationForm,
        handleReminderTimesForm,
        handleStartDate,
        handleExpiresAtForm,
        handleSuggestionSelection,
    };
};