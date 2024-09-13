import { Medication } from "types/app/patient/health/Medicine_Types";

export const useCurrentMedicationAlert = () => {

    const calculateNextDose = (medication: Medication, currentDate: Date): Date | null => {
        const { start, expiresAt, frequency, schedules } = medication;
        if (!start || !expiresAt || !frequency || !schedules) { 
            console.log("Algum dos dados ao calcular a próxima dose está inválido");
            return null;
        }

        const startDate = new Date(start);
        const endDate = new Date(expiresAt);

        // Verifica se a data atual está dentro do período do medicamento
        if (currentDate > endDate) {
            return null;
        }

        // Calcula o número de dias desde o início do medicamento
        const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        
        // Lista para armazenar as próximas doses
        let upcomingDoses: Date[] = [];

        // Cálculo do próximo dia de dose
        const nextDoseDay = Math.floor(daysSinceStart / frequency) * frequency + frequency;

        // Ajusta a data para o próximo dia de dose
        const nextDoseDate = new Date(startDate);
        nextDoseDate.setDate(startDate.getDate() + nextDoseDay);

        // Verificar doses no dia atual e no próximo dia de dose
        for (let schedule of schedules) {
            const [hours, minutes] = schedule.split(':').map(Number);

            // Horário de dose para hoje
            const nextDoseTimeToday = new Date(currentDate);
            nextDoseTimeToday.setHours(hours, minutes, 0, 0);

            // Se o horário de hoje for futuro, adiciona
            if (nextDoseTimeToday > currentDate && daysSinceStart % frequency === 0) {
                upcomingDoses.push(nextDoseTimeToday);
            }

            // Horário de dose para o próximo dia de dose
            const nextDoseTimeFuture = new Date(nextDoseDate);
            nextDoseTimeFuture.setHours(hours, minutes, 0, 0);

            if (nextDoseTimeFuture >= startDate && nextDoseTimeFuture <= endDate) {
                upcomingDoses.push(nextDoseTimeFuture);
            }
        }

        // Ordena as doses e retorna a próxima dose após o horário atual
        upcomingDoses.sort((a, b) => a.getTime() - b.getTime());

        return upcomingDoses.find(dose => dose > currentDate) || null;
    };
    
    return { calculateNextDose } 
}