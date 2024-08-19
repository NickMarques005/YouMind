import { convertDurationToDays } from "@utils/date/DateConversions";
import { formatISOToDate } from "@utils/date/DateFormatting";
import { DateTime } from "luxon";
import { MarkedDates } from "react-native-calendars/src/types";
import { MedicationDurationType, MedicationFrequencyType } from "types/app/patient/health/Medicine_Types";
import { CalculateMarkedDates } from "types/calendar/Calendar_Types";

export const convertFrequencyToNumber = (frequency: string): number| undefined => {
    if(frequency === "") return undefined;
    const parsedFrequency = parseInt(frequency, 10);
    if (isNaN(parsedFrequency)) {
        console.error(`Valor inválido para frequência: ${frequency}`);
        return 0; 
    }
    return parsedFrequency;
};

export interface FormatExpiresAtParams {
    start: string;
    frequency?: number;
    frequencyType: MedicationFrequencyType;
    durationType: MedicationDurationType;
    duration?: string;
    onError?: (error: string) => void;
}

export const formatFrequency = (frequency: number, frequencyType: string): number => {
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

export const calculateExpiresAt = (start: Date, durationInDays: number, frequencyInDays: number): Date => {
    console.log("Calcular expiresAt");
    const startDate = DateTime.fromJSDate(start, { zone: 'America/Sao_Paulo' });
    let currentDate = startDate;

    if (durationInDays === 0) {
        currentDate = currentDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
        console.log("End Date calculado (mesmo dia): ", currentDate.toJSDate());
        return currentDate.toJSDate();
    }

    currentDate = currentDate.plus({ days: durationInDays });

    if (frequencyInDays === 0) {
        currentDate = currentDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
        console.log("End Date calculado (sem frequência): ", currentDate.toJSDate());
        return currentDate.toJSDate();
    }

    while (currentDate.diff(startDate, 'days').days % frequencyInDays !== 0) {
        currentDate = currentDate.plus({ days: 1 });
    }

    currentDate = currentDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

    const endDate = currentDate.toJSDate();
    console.log("End Date calculado: ", endDate);
    return endDate;
};

export const formatExpiresAt = (
    { start,frequency, frequencyType, durationType, duration, onError }: FormatExpiresAtParams
): Date | undefined => {

    if(durationType !== 'Hoje') 
    {
        if(!duration || !frequency) return undefined;
    }
        

    const formattedStart = formatISOToDate(start);
    if (!formattedStart) {
        if(onError)
        {
            onError("Data de início inválida");
        }
        return undefined;
    }
    
    let formattedFrequency = 0;
    
    if(durationType === 'Hoje')
    {
        formattedFrequency = 0;
    }
    
    else {
        if(!frequency) return undefined;
        formattedFrequency = formatFrequency(frequency, frequencyType);
    }

    const durationInDays = convertDurationToDays(durationType, duration);
    
    if (durationInDays < formattedFrequency) {
        if(onError)
        {
            onError("A duração do uso do medicamento deve ser maior ou igual à frequência");
        }
        return undefined;
    }

    const expiresAt = calculateExpiresAt(formattedStart, durationInDays, formattedFrequency);
    return expiresAt;
};

export const calculateMedicationMarkedDates = ({ start, expiresAt, frequency, frequencyType, markingType }: CalculateMarkedDates): MarkedDates | {} => {
    const markedDates: { [date: string]: { 
        selected?: boolean,
        startingDay?: boolean, 
        endingDay?: boolean, 
        color: string, 
        textColor?: string, 
        marked?: boolean, 
        dotColor?: string } } = {};
    
    const startDate = DateTime.fromISO(start);
    if (!startDate.isValid) {
        console.error("Data de início inválida fornecida");
        return {};
    }

    const selectedColor = "#6b0e96";
    const frequencyColor = "#8a52a8";
    const periodColor = "#efe9f2"; 
    const dotColor = "white";

    if(!frequency || !expiresAt || expiresAt === start) {
        markedDates[startDate.toISODate()] = { selected: true, marked: true, color: selectedColor };
        return markedDates;
    }

    const endDate = DateTime.fromISO(expiresAt);
    if(!endDate.isValid) {
        console.error("Data de expiração inválida fornecida");
        return markedDates;
    }

    const daysBetween = endDate.diff(startDate, 'days').days;
    const frequencyInDays = formatFrequency(frequency, frequencyType || 'Dias');
    for (let dayOffset = 0; dayOffset < daysBetween; dayOffset++) {
        const currentDate = startDate.plus({ days: dayOffset }).toISODate();

        if (dayOffset === 0) {
            markedDates[currentDate] = { startingDay: true, color: selectedColor, marked: true, textColor: 'white', dotColor };
        } else if (dayOffset % frequencyInDays === 0) {
            markedDates[currentDate] = { color: frequencyColor, textColor: 'white' };
        }
        else {
            markedDates[currentDate] = { color: periodColor };
        }
    }

    markedDates[endDate.toISODate()] = { endingDay: true, color: selectedColor, marked: true, textColor: 'white', dotColor };

    return markedDates;
}

