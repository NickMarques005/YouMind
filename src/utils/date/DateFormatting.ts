import { DateTime } from 'luxon';

export const FormatDate = (date?: DateTime) => {
    if (!date) {
        date = DateTime.local();
    }

    const formattedDate = date.toFormat('dd \'de\' LLLL');
    return formattedDate;
}

export const FormatISODate = (isoDate: string) => {
    const dateParts = isoDate.split('-');
    if (dateParts.length === 3) {
        const [year, month, day] = dateParts;
        return `${day}/${month}/${year}`;
    }

    return isoDate;
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