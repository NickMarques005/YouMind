import { DateTime } from 'luxon';

interface Medicine {
    id: number;
    type: string;
    name: string;
    start_period: string;
    final_period: string;
    last_period: string;
    frequency: string;
    quantity: number;
    value: number | null;
    checked: boolean;
}


export const ShowMedicineOnDate = (medicine: Medicine, date: DateTime): boolean => {
    const { frequency, last_period, start_period, final_period } = medicine;

    if(date < DateTime.fromISO(start_period) || date > DateTime.fromISO(final_period)){
        return false;
    }
    
    const hoursDiff = date.diff(DateTime.fromISO(start_period), 'hours').hours;

    if(hoursDiff % Number(frequency) === 0)
    {
        return true;
    }

    return false;
}

export const FilterMedicineForCurrentDate = (medicines: Medicine[], currentDate: string) => {
    const currentDateTime = DateTime.fromISO(currentDate);
    return medicines.filter(medicine => ShowMedicineOnDate(medicine, currentDateTime))
}