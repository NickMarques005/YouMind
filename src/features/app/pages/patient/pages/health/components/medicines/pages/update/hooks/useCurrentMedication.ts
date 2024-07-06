import { Medication } from "types/app/patient/health/Medicine_Types";


interface UseCurrentMedicationProps{
    params: {
        currentMedication: Medication | undefined,
    }
}

export const UseCurrentMedication = ({ params }: UseCurrentMedicationProps) => {
    
    const currentMedication: Medication | undefined = params.currentMedication;

    return { currentMedication }
}