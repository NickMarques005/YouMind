import { useCallback } from 'react';
import { UseQuestionnaire } from '@features/app/providers/patient/QuestionariesProvider';
import { QuestionnaireItem } from 'types/app/patient/health/Question_Types';

const UseQuestionnairesSocket = () => {
    const { dispatch } = UseQuestionnaire();

    const handleQuestionnaireAdd = useCallback((data: QuestionnaireItem) => {
        console.log("Novo questionário: ", data);
        dispatch({ type: 'ADD_QUESTIONNAIRE', payload: data });
    }, [dispatch]);

    return { handleQuestionnaireAdd };
};

export default UseQuestionnairesSocket;