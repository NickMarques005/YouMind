import { UsePerformProps } from "types/service/Request_Types";
import { useUpdateTreatmentForDoctor } from "./UseGetDoctorInitialData";
import { usePatientHistory } from "@features/app/providers/doctor/PatientHistoryProvider";
import { useLatestMedication } from "@features/app/providers/doctor/LatestMedicationProvider";
import { useLatestQuestionnaire } from "@features/app/providers/doctor/LatestQuestionnaireProvider";

export const useUpdateDoctorState = ({ setLoading, HandleConnectionAppError }: UsePerformProps) => {
    const { dispatch: patientHistoryDispatch } = usePatientHistory();
    const { dispatch: latestMedicationDispatch } = useLatestMedication();
    const { dispatch: latestQuestionnaireDispatch } = useLatestQuestionnaire();
    const { getUpdateDoctorData } = useUpdateTreatmentForDoctor({ setLoading, HandleConnectionAppError })

    const handleInitiateTreatmentData = async () => {
        console.log("Iniciar Tratamento (Doutor)")
        try {
            await getUpdateDoctorData();
        }
        catch (err) {
            const error = err as Error;
            console.log(error);
        }
    }

    const handleRemoveTreatmentData = async (treatmentId?: string) => {
        try {
            if (!treatmentId) return console.error("Id do tratamento não especificado para excluir dados do tratamento");

            patientHistoryDispatch({ type: 'DELETE_PATIENT_HISTORY', payload: treatmentId });
            latestMedicationDispatch({ type: 'DELETE_LATEST_MEDICATIONS', payload: treatmentId });
            latestQuestionnaireDispatch({ type: 'DELETE_LATEST_QUESTIONNAIRES', payload: treatmentId });
        }
        catch (err) {
            const error = err as Error;
            console.error(error);
        }
    }

    return { handleInitiateTreatmentData, handleRemoveTreatmentData };
}