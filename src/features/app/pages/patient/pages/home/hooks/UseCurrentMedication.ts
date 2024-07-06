import { Medication } from "types/app/patient/health/Medicine_Types";

export const useCurrentMedicationAlert = () => {

    const calculateNextDose = (medication: Medication, currentDate: Date): Date | null => {
        const { start, expiresAt, frequency, schedules } = medication;
        const startDate = new Date(start);
        const endDate = new Date(expiresAt);
        
        if (currentDate < startDate || currentDate > endDate) {
            return null;
        }
    
        const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        const nextDoseDay = Math.ceil(daysSinceStart / frequency) * frequency;
        const nextDoseDate = new Date(startDate);
        nextDoseDate.setDate(startDate.getDate() + nextDoseDay);
    
        if (nextDoseDate > endDate) {
            return null;
        }
    
        for (let schedule of schedules) {
            const [hours, minutes] = schedule.split(':').map(Number);
            const nextDoseTime = new Date(nextDoseDate);
            nextDoseTime.setHours(hours, minutes, 0, 0);
    
            if (nextDoseTime > currentDate) {
                return nextDoseTime;
            }
        }
    
        return null;
    };

    return { calculateNextDose } 
}