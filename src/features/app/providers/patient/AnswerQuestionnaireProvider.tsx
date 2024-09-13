import React, { createContext, useState, useContext, useEffect } from 'react';
import { AnswerQuestionnaire, QuestionnaireTemplate } from 'types/app/patient/health/Question_Types';

interface AnswerQuestionnaireContextProps {
    answerQuestionnaire: AnswerQuestionnaire | undefined;
    handleAnswerQuestionnaire: (template: QuestionnaireTemplate, questionnaireId: string) => void;
    clearAnswerQuestionnaire: () => void;
}

interface AnswerQuestionnaireProviderProps {
    children: React.ReactNode;
}

const AnswerQuestionnaireContext = createContext<AnswerQuestionnaireContextProps>({
    answerQuestionnaire: undefined,
    handleAnswerQuestionnaire: () => { },
    clearAnswerQuestionnaire: () => {}
});

export const AnswerQuestionnaireProvider: React.FC<AnswerQuestionnaireProviderProps> = ({ children }) => {
    const [answerQuestionnaire, setAnswerQuestionnaire] = useState<AnswerQuestionnaire | undefined>(undefined);

    const handleAnswerQuestionnaire = (template: QuestionnaireTemplate, questionnaireId: string) => {
        const questionnaireToAnswer: AnswerQuestionnaire = {
            template,
            questionnaireId
        }

        setAnswerQuestionnaire(questionnaireToAnswer);
    }

    const clearAnswerQuestionnaire = () => {
        setAnswerQuestionnaire(undefined);
    }

    return (
        <AnswerQuestionnaireContext.Provider value={{ answerQuestionnaire, handleAnswerQuestionnaire, clearAnswerQuestionnaire }}>
            {children}
        </AnswerQuestionnaireContext.Provider>
    );
};

// Hook para usar o contexto
export const useAnswerQuestionnaire = () => {
    const context = useContext(AnswerQuestionnaireContext);
    if (!context) {
        throw new Error('Context precisa ser utilizado dentro do provider (UseAnswerQuestionnaire)');
    }
    return context;
};