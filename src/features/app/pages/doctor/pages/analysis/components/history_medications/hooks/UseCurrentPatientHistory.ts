import { PatientHistory } from "types/history/PatientHistory_Types";

interface UseCurrentPatientProps{
    params: {
            patientHistory: PatientHistory | undefined,
    }
}

export const UseCurrentPatientMedications = ({ params }: UseCurrentPatientProps) => {
    
    const currentPatientHistory: PatientHistory | undefined = params.patientHistory;
    return { currentPatientHistory }
}