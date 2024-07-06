import { UseQuestionnaire } from '@features/app/providers/patient/QuestionariesProvider';
import { UseQuestionnaireService } from '@hooks/api/UseQuestionnaireService';
import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';
import { Questionnaire, QuestionnaireTemplate } from 'types/app/patient/health/Question_Types';

interface UseQuestionnaireHandling {
    HandleResponseAppError: (value: string) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useQuestionnaireHandling = ({ HandleResponseAppError, setLoading }: UseQuestionnaireHandling) => {
    const { questionnaires, dispatch } = UseQuestionnaire(); 
    const { performGetQuestionnaireTemplateById } = UseQuestionnaireService(setLoading);
    
    const handleGetQuestionnaireTemplate = async (id: string, onSuccess?: (template: QuestionnaireTemplate, questionnaireId: string, questionnaire?: Questionnaire) => void, currentQuestionnaire?: Questionnaire) => {
        if (!id) {
            HandleResponseAppError("Questionário não especificado");
            return;
        }

        try {
            const response = await performGetQuestionnaireTemplateById(id);
            if (response.success && response.data) {
                console.log(response);
                if(onSuccess) {
                    if(currentQuestionnaire){
                        onSuccess(response.data, id, currentQuestionnaire);
                        return;
                    }
                    
                    onSuccess(response.data, id);
                }

            } else if (response.error) {
                HandleResponseAppError(response.error);
            }
        }
        catch (err) {
            const error = err as Error;
            console.log(error);
            HandleResponseAppError(error.message);
        }
    }

    return { questionnaires, handleGetQuestionnaireTemplate };
};

export default useQuestionnaireHandling;