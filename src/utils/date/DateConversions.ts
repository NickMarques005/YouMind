import { DateTime } from 'luxon';
import { MedicationDuration, MedicationFrequency } from 'types/app/patient/health/Medicine_Types';
const timeZone = 'America/Sao_Paulo';

export const ConvertFromISOToNormalDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().substring(2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const ConvertFromISOToTimeHours = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const isExpired = (isoDateString?: string): boolean => {
    if (!isoDateString) return false;
    const currentDate = DateTime.now().setZone(timeZone);
    const expirationDate = DateTime.fromISO(isoDateString);
    const expired = currentDate > expirationDate;
    return expired;
};

export const ConvertHoursToDateString = (hours: number): string => {
    if (hours >= 24 * 30) {
        const months = Math.floor(hours / (24 * 30));
        return `${months} mês(es)`;
    } else if (hours >= 24 * 7) {
        const weeks = Math.floor(hours / (24 * 7));
        return `${weeks} semana(s)`;
    } else if (hours >= 24) {
        const days = Math.floor(hours / 24);
        return `${days} dia(s)`;
    } else {
        return `${hours} hora(s)`;
    }
}

export const ConvertDaysToDateForm = (days: number) => {
    if (days >= 30) {
        const months = Math.floor(days / 30);
        return `${months} mês(es)`;
    } else if (days >= 7) {
        const weeks = Math.floor(days / 7);
        return `${weeks} semana(s)`;
    } else {
        return `${days} dia(s)`;
    }
}


export const convertFrequencies = (hours: number): MedicationFrequency => {
    if (hours >= 24 * 30) {
        return 'Meses';
    } else if (hours >= 24 * 7) {
        return 'Semanas';
    } else {
        return 'Dias';
    }
}

export const convertDurationToDays = (duration: string, durationType: MedicationDuration): number => {
    const durationValue = parseInt(duration, 10);
    if (isNaN(durationValue)) {
        return 0;
    }

    switch (durationType) {
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

export const calculateDaysBetweenDates = (start: string, end: string): number => {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const differenceInTime = endDate - startDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
};