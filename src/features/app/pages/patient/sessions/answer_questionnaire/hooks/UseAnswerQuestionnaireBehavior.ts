import { UseBridgeNavigation } from "@features/app/hooks/navigation/UseBridgeNavigation";
import { Priority } from "@features/app/providers/bridge/PriorityProvider";
import { useEffect, useState } from "react";
import { AnswerQuestionnaire, FormattedAnswer, Question, QuestionnaireTemplate } from "types/app/patient/health/Question_Types";

interface UseAnswerQuestionnaireBehaviorParams {
    answerQuestionnaire?: AnswerQuestionnaire;
    removePriority: (priority: Priority) => void;
}

export const useAnswerQuestionnaireBehavior = ({ answerQuestionnaire, removePriority }: UseAnswerQuestionnaireBehaviorParams) => {
    const [ currentAnswerQuestionnaire, setCurrentAnswerQuestionnaire ] = useState<AnswerQuestionnaire | undefined>(answerQuestionnaire);
    const initialAnswers: FormattedAnswer[] | undefined = currentAnswerQuestionnaire?.template ? currentAnswerQuestionnaire?.template.questions.map(question => {
        const subAnswers = question.sub_questions
            ? Array(question.sub_questions.length).fill({ answer: '', type: 'bom' })
            : undefined;
        return {
            questionId: question._id,
            answer: '',
            type: 'bom',
            subAnswers: subAnswers
        };
    })
    : undefined;

    const [answers, setAnswers] = useState<FormattedAnswer[]>(initialAnswers || []);
    const [questions, setQuestions] = useState<Question[]>(currentAnswerQuestionnaire?.template.questions || []);
    const [confirmBackToApp, setConfirmBackToApp] = useState(false);
    const [introduction, setIntroduction] = useState(true);

    const { navigateToAppStackScreen } = UseBridgeNavigation();

    const handleConfirmBackToAppModal = () => {
        setConfirmBackToApp(prev => !prev);
    }

    const handleIntroduction = () => {
        setIntroduction(prev => !prev);
    }

    const handleLeaveAnswerQuestionnaire = () => {
        removePriority('questionnaireAnswer');
    }

    useEffect(() => {
        if(answerQuestionnaire)
        {
            setCurrentAnswerQuestionnaire(answerQuestionnaire);
        }
    }, []);

    return {
        answerQuestionnaire,
        answers,
        introduction,
        confirmBackToApp,
        questions,
        setQuestions,
        setAnswers,
        handleConfirmBackToAppModal,
        handleLeaveAnswerQuestionnaire,
        handleIntroduction
    }
}