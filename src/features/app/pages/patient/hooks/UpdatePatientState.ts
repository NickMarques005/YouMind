import { UseQuestionnaire } from "@features/app/providers/patient/QuestionariesProvider";
import { useGetPatientInitialData } from "./UseGetPatientInitialData";
import { useQuestionPerformance } from "@features/app/providers/patient/QuestionPerformanceProvider";
import { UsePerformProps } from "types/service/Request_Types";

export const useUpdatePatientState = ({ setLoading, HandleConnectionAppError}: UsePerformProps) => {

    const { getPatientInitialData } = useGetPatientInitialData({ setLoading, HandleConnectionAppError});
    const { dispatch: questionnaireDispatch } = UseQuestionnaire();
    const { clearQuestionPerformance } = useQuestionPerformance();

    const handleInitiateTreatmentData = async () => {
        console.log("Iniciar Tratamento (Paciente)")
        try
        {
            await getPatientInitialData();
        }
        catch (err){
            const error = err as Error;
            console.log(error);
        }
    }

    const handleRemoveTreatmentData = async () => {
        try{
            questionnaireDispatch({ type: 'CLEAR_QUESTIONNAIRES' });
            clearQuestionPerformance();
        }
        catch (err)
        {
            const error = err as Error;
            console.error(error);
        }
    }

    return { handleInitiateTreatmentData, handleRemoveTreatmentData };
}