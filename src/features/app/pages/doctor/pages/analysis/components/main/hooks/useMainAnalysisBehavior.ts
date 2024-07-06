import { usePatientHistory } from "@features/app/providers/doctor/PatientHistoryProvider";
import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess";
import { CurrentPatientItem, HistoryMedication, HistoryQuestionnaire, PatientHistory } from "types/history/PatientHistory_Types";

export const useMainAnalysisBehavior = () => {
    const { state } = usePatientHistory();
    const { analysisNavigateOnSuccess } = UseNavigateOnSuccess();

    const selectPatientToAnalyze = (currentPatient: string) => {

        analysisNavigateOnSuccess('current_patient', { currentPatient });
    }

    const selectLatestQuestionnaire = (questionnaire: HistoryQuestionnaire) => {
        const patientHistory = state.patientHistory.find(history => history.patientId === questionnaire.patientId);

        if (patientHistory) {
            if (!questionnaire.answered) {
                console.log(questionnaire.answered);
                analysisNavigateOnSuccess('history_patient_questionnaires', { patientHistory });

            }
            else {
                analysisNavigateOnSuccess('current_questionnaire', { questionnaire, latest: true, patientHistory });
            }
        } else {
            console.error('Nenhum paciente achado:', questionnaire.patientId);
        }
    }

    const selectLatestMedication = (medication: HistoryMedication) => {
        const patientHistory = state.patientHistory.find(history => history.patientId === medication.patientId);

        if (patientHistory) {
            if (!medication.taken) {
                analysisNavigateOnSuccess('history_patient_medications', { patientHistory });

            }
            else {
                analysisNavigateOnSuccess('current_medication', { medication, latest: true, patientHistory });
            }
        } else {
            console.error('No patient history found for medication with patientId:', medication.patientId);

        }
    }

    return { selectPatientToAnalyze, selectLatestMedication, selectLatestQuestionnaire }
}