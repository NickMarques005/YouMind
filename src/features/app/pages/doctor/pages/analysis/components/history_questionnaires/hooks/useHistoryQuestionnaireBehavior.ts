import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess";
import { FormatISOToStringDate } from "@utils/date/DateFormatting";
import { HistoryQuestionnaire, PatientHistory } from "types/history/PatientHistory_Types";

interface UseHistoryQuestionnaireBehaviorProps {
    HandleResponseAppError: (value: string) => void;
}

export const useHistoryQuestionnaireBehavior = ({ HandleResponseAppError }: UseHistoryQuestionnaireBehaviorProps) => {
    const { analysisNavigateOnSuccess } = UseNavigateOnSuccess();

    const selectQuestionnaire = (questionnaire: HistoryQuestionnaire, patientHistory: PatientHistory) => {
        if (questionnaire.pending) {
            HandleResponseAppError(`Questionário pendente para hoje, dia ${FormatISOToStringDate(questionnaire.currentQuestionnaire.createdAt)}`)
        }
        else if (!questionnaire.answered) {
            HandleResponseAppError(`O paciente ${patientHistory.patientName} não respondeu ao questionário do dia ${FormatISOToStringDate(questionnaire.currentQuestionnaire.createdAt)}`)
        }
        else {
            analysisNavigateOnSuccess('current_questionnaire', { questionnaire, patientHistory });
        }
    }

    return { selectQuestionnaire };
}