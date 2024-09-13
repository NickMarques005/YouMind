import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { Answer, AnswerType, FormattedAnswer, QuestionnaireTemplate } from "types/app/patient/health/Question_Types";
import { UseQuestionnaireService } from "@hooks/api/UseQuestionnaireService";
import { UseQuestionnaire } from "@features/app/providers/patient/QuestionariesProvider";
import { useEffect } from "react";

interface UseAnswerHandlingProps {
    answers: FormattedAnswer[];
    setAnswers: React.Dispatch<React.SetStateAction<FormattedAnswer[]>>;
    currentQuestionIndex: number;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


export const useAnswerQuestionnaireHandling = ({ answers, setAnswers, currentQuestionIndex, setLoading, HandleResponseAppError, HandleResponseAppSuccess }: UseAnswerHandlingProps) => {
    const { performSendAnswers } = UseQuestionnaireService(setLoading);
    const { dispatch } = UseQuestionnaire();

    useEffect(() => {
        console.log(answers);
    }, [answers]);

    const handleAnswerChange = (template: QuestionnaireTemplate, answer?: string, type?: AnswerType, subAnswer?: Answer, subQuestionIndex?: number) => {
        let updatedAnswers = [...answers];
        const currentAnswer = { ...updatedAnswers[currentQuestionIndex] };
        //console.log(subQuestionIndex);

        if (subAnswer) {
            if (currentAnswer.subAnswers !== undefined && subQuestionIndex !== undefined) {
                console.log("Save SubAnswer");
                currentAnswer.subAnswers[subQuestionIndex] = subAnswer;
            }
        } else {
            currentAnswer.answer = answer;
            currentAnswer.type = type;
            const templateQuestion = template.questions.find(question => question._id === currentAnswer.questionId);
            if (templateQuestion && templateQuestion.answers.some(answer => answer.hasMetadata)) {
                currentAnswer.metadata = currentAnswer.metadata || "";
            }
        }

        updatedAnswers[currentQuestionIndex] = currentAnswer;
        //console.log(updatedAnswers);
        //console.log(updatedAnswers[currentQuestionIndex]);
        setAnswers(updatedAnswers);
    };

    const handleMetadataChange = (questionId: string, newMetadata: string) => {
        setAnswers(prevAnswers =>
            prevAnswers.map(answer =>
                answer.questionId === questionId
                    ? { ...answer, metadata: newMetadata }
                    : answer
            )
        );
    };

    const handleSendAnswers = async (answers: FormattedAnswer[], id: string, onSuccess?: () => void) => {
        try {
            const response = await performSendAnswers({ answers, id });
            if (response.success) {
                if (response.data) {
                    console.log(response.data);
                    dispatch({ type: 'UPDATE_QUESTIONNAIRE', payload: response.data });
                }
                if (response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon);
                }
                if (onSuccess) return onSuccess();
            }

            if (response.error) {
                console.log(response.error);
                HandleResponseAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }

    return { handleAnswerChange, handleMetadataChange, handleSendAnswers }
}