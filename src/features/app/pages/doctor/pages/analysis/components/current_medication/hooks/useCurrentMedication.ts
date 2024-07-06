import { HistoryMedication, PatientHistory } from "types/history/PatientHistory_Types";


interface UseCurrentQuestionnaireProps{
    params: {
        patientHistory: PatientHistory;
        medication: HistoryMedication;
        latest?: boolean;
    }
}

export const UseCurrentMedication = ({ params }: UseCurrentQuestionnaireProps) => {
    
    const { medication, patientHistory, latest } = params;
    return { medication, patientHistory, latest };
}