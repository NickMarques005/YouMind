import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess"
import { PatientHistory } from "types/history/PatientHistory_Types";


export const useCurrentPatientBehavior = () => {
    const { analysisNavigateOnSuccess } = UseNavigateOnSuccess();

    const navigateToCurrentPatientQuestionnaires = (patientHistory?: PatientHistory) => {
        if (patientHistory) {
            analysisNavigateOnSuccess('history_patient_questionnaires', { patientHistory });
        }

    }

    const navigateToCurrentPatientMedications = (patientHistory?: PatientHistory) => {
        if (patientHistory) {
            analysisNavigateOnSuccess('history_patient_medications', { patientHistory });
        }
    }

    return { navigateToCurrentPatientMedications, navigateToCurrentPatientQuestionnaires }
}