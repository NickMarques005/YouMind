import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess"
import { UseAnalysisNavigation } from "../../../hooks/useAnalysisNavigation";
import { PatientHistory } from "types/history/PatientHistory_Types";


export const useCurrentQuestionnaireBehavior = () => {
    const { analysisNavigateOnSuccess } = UseNavigateOnSuccess();
    const { navigateToAnalysisScreen } = UseAnalysisNavigation();

    const handleAnalysisNavigation = (patientHistory: PatientHistory, latest?: boolean) => {
        if(latest)
        {
            navigateToAnalysisScreen('main_analysis');
        }
        else{
            analysisNavigateOnSuccess('history_patient_questionnaires', { patientHistory })
        }
    }

    return { handleAnalysisNavigation }
}