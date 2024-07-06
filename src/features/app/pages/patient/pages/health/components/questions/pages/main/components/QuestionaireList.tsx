import React from 'react';

import { SharedValue } from 'react-native-reanimated';
import { Questionnaire, QuestionnaireItem, QuestionnaireTemplate } from 'types/app/patient/health/Question_Types';
import QuestionnaireCard from './QuestionaireCard';


type QuestionaireListProps = {
    questionnaires: QuestionnaireItem[];
    activeIndex: SharedValue<number>;
    handleGetQuestionnaireTemplate: (id: string, onSuccess?: ((template: QuestionnaireTemplate, questionnaireId: string, questionnaire?: Questionnaire) => void) | undefined, currentQuestionnaire?: Questionnaire) => Promise<void>;
    answerLoading: boolean;
    visualizeLoading: boolean;
    handleAnswerQuestionnaire: (template: QuestionnaireTemplate, questionnaireId: string) => void
    handleVisualizeCurrentQuestionnaire: (questionnaireId: string, questionnaire?: Questionnaire, template?: QuestionnaireTemplate, ) => void;
};

const QuestionnaireList: React.FC<QuestionaireListProps> = ({ handleVisualizeCurrentQuestionnaire, handleAnswerQuestionnaire, answerLoading, visualizeLoading, handleGetQuestionnaireTemplate, questionnaires, activeIndex }) => {

    return (
        <>
            {
                questionnaires.map((questionnaire, index) => {
                    return (
                        <QuestionnaireCard
                            questionnaire={questionnaire}
                            key={questionnaire.currentQuestionnaire._id.toString()}
                            activeIndex={activeIndex}
                            index={index}
                            totalLength={questionnaires.length - 1}
                            onAnswerPress={handleGetQuestionnaireTemplate}
                            answerLoading={answerLoading}
                            visualizeLoading={visualizeLoading}
                            handleAnswerQuestionnaire={handleAnswerQuestionnaire}
                            handleVisualizeCurrentQuestionnaire={handleVisualizeCurrentQuestionnaire}
                        />
                    )
                })
            }
        </>
    )
};

export default QuestionnaireList;