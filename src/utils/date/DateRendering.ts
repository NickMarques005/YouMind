import { formatDateToInitialDate } from "./DateFormatting";

/**
 * Retorna um array com 7 dias, começando no domingo da semana da data de hoje.
 * @param weekOffset Quantidade de semanas para se deslocar (+1 para a semana seguinte, -1 para a anterior, etc.).
 * @returns Array de 7 objetos Date.
 */
export const getSevenDaysFrom = (weekOffset: number = 0): Date[] => {

    const days = [];
    const startDate = new Date(); // Hoje
    startDate.setDate(startDate.getDate() - startDate.getDay() + weekOffset * 7);

    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(startDate);
        nextDay.setDate(startDate.getDate() + i);
        const formattedNextDay = formatDateToInitialDate(nextDay);
        days.push(formattedNextDay);
    }

    return days;
};

export const isPastDate = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const dayToCompare = new Date(day);
    dayToCompare.setHours(0, 0, 0, 0); 

    return dayToCompare < today;
}