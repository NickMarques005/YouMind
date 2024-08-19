import { DateTime, Settings } from 'luxon';
Settings.defaultLocale = 'pt-BR';
const timeZone = 'America/Sao_Paulo';

export const FormatDate = (date?: DateTime) => {
    if (!date) {
        date = DateTime.local();
    }

    const formattedDate = date.toFormat('dd \'de\' LLLL');
    return formattedDate;
}

export const FormatISOToStringDate = (isoDate?: string) => {
    if (!isoDate) return '';
    const date = DateTime.fromISO(isoDate);
    if (!date.isValid) {
        return "Data inválida";
    }
    return date.toFormat('dd/MM/yyyy');
}

export const FormatStringToISODate = (strDate?: string) => {
    if (!strDate) return '';
    const [day, month, year] = strDate.split("/");
    const date = DateTime.fromObject({
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
    }, { zone: 'UTC-3' });

    return date.toISO() || undefined;
}

export const FormatRelativeDate = (date: DateTime) => {
    const today = DateTime.local();
    const diff = Math.round(date.diff(today, 'days').days);

    switch (diff) {
        case 0:
            return "Hoje";
        case 1:
            return "Amanhã";
        case -1:
            return "Ontem";
        default:
            if (diff > 1) {
                return `${diff} dias depois`
            }
            else if (diff < -1) {
                return `${Math.abs(diff)} dias atrás`;
            }
            else {
                return ''
            }
    }
}

export const FormatRelativeMessageDate = (date: DateTime) => {
    const today = DateTime.local().startOf('day');
    const messageDate = date.startOf('day');
    const diffDays = today.diff(messageDate, 'days').days;

    if (diffDays === 0) {
        return "Hoje";
    } else if (diffDays === 1) {
        return "Ontem";
    } else {
        return date.toFormat('dd \'de\' LLLL');
    }
}

export const formatDateMessage = (isoDate: string) => {
    const date = DateTime.fromISO(isoDate);
    if (!date.isValid) {
        return "Data inválida";
    }

    return FormatRelativeMessageDate(date);

}


export const formatDateForChat = (isoDate: string): string => {
    const date = DateTime.fromISO(isoDate);
    const today = DateTime.now().startOf('day');
    const yesterday = today.minus({ days: 1 });

    if (date >= today) {
        return date.toFormat('HH:mm');
    } else if (date >= yesterday) {
        return "Ontem";
    } else {
        return date.toFormat('dd/MM/yyyy');
    }
};

export const formatRelativeTime = (isoDate: string) => {
    const date = DateTime.fromISO(isoDate);
    if (!date.isValid) return "Data inválida";

    const now = DateTime.local();
    const diff = now.diff(date, ['years', 'months', 'days', 'hours', 'minutes']);

    if (diff.years >= 1) {
        const years = Math.floor(diff.years);
        return `Há ${years} ano${years > 1 ? 's' : ''} atrás`;
    } else if (diff.months >= 1) {
        const months = Math.floor(diff.months);
        return `Há ${months} mês${months > 1 ? 'es' : ''} atrás`;
    } else if (diff.days >= 1) {
        const days = Math.floor(diff.days);
        return days === 1 ? 'Ontem' : `${days} dias atrás`;
    } else if (diff.hours >= 1) {
        const hours = Math.floor(diff.hours);
        return `Há ${hours} hora${hours > 1 ? 's' : ''} atrás`;
    } else if (diff.minutes >= 1) {
        const minutes = Math.floor(diff.minutes);
        return `Há ${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    } else {
        return 'Agora mesmo';
    }
}

export const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const formatAudioDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = String(minutes).padStart(1, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
};

export const formatMedicationDateString = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, '').slice(0, 8);

    let day = '';
    let month = '';
    let year = '';

    if (cleanedText.length >= 2) {
        day = cleanedText.slice(0, 2);
    } else {
        day = cleanedText;
    }

    if (cleanedText.length >= 4) {
        month = cleanedText.slice(2, 4);
    } else if (cleanedText.length > 2) {
        month = cleanedText.slice(2);
    }

    if (cleanedText.length > 4) {
        year = cleanedText.slice(4);
    }

    if (day.length === 2 && parseInt(day, 10) > 31) {
        day = '31';
    }
    if (month.length === 2 && parseInt(month, 10) > 12) {
        month = '12';
    }

    let formattedText = '';
    if (day) {
        formattedText += day;
    }
    if (month) {
        formattedText += `/${month}`;
    }
    if (year) {
        formattedText += `/${year}`;
    }

    return formattedText;
};

export const formatDateToString = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const formatDateToISO = (date: Date) => {
    const timeZoneDate = DateTime.fromJSDate(date).setZone(timeZone, { keepLocalTime: true });
    const isoTimeZone =  timeZoneDate.toISO() || "";
    return isoTimeZone;
}

export const formatStringToDate = (strDate: string): Date | null => {
    const [day, month, year] = strDate.split('/').map(Number);
    if (!day || !month || !year) {
        return null;
    }
    return new Date(year, month - 1, day);
};

export const formatISOToDate = (isoDate: string): Date | null => {
    const date = DateTime.fromISO(isoDate, { zone: 'America/Sao_Paulo' });

    return date.toUTC().toJSDate();
};

export const formatDateToJustADay = (date: Date): string => {
    return date.getDate().toString();
};

export const getDayweekInitial = (date: Date): string => {
    const dayInitials: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    return dayInitials[date.getDay()];
};

export const FormatDateToSpeakDate = (date?: Date) => {
    const dateTime = date ? DateTime.fromJSDate(date) : DateTime.local();
    return dateTime.toFormat('dd \'de\' LLLL');
};

export const calculateDurationInDays = (start: Date, end: Date) => {
    const diffTime = end.getTime() - start.getTime();
    return diffTime / (1000 * 3600 * 24);
}

export const validateAndFormatISODate = (isoDate: string | undefined): string => {
    if (!isoDate) return "";

    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[\+\-]\d{2}:\d{2})?$/;
    if (isoDateRegex.test(isoDate)) {
        return isoDate.split('T')[0];
    }

    return "";
};

export const formatDateToInitialDate = (date: Date): Date => {
    const initialDate = DateTime.fromJSDate(date, { zone: timeZone })
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        
    return initialDate.toJSDate();
};