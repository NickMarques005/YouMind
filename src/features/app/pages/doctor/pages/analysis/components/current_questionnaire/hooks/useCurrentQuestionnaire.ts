import { HistoryQuestionnaire, PatientHistory } from "types/history/PatientHistory_Types";


interface UseCurrentQuestionnaireProps{
    params: {
        patientHistory: PatientHistory;
        questionnaire: HistoryQuestionnaire;
        latest?: boolean;
    }
}

export const UseCurrentQuestionnaire = ({ params }: UseCurrentQuestionnaireProps) => {
    
    const { questionnaire, patientHistory, latest } = params;
    return { questionnaire, patientHistory, latest };
}