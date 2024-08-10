import { useState } from "react";
import { FormattedAnswer, Question_Metadata, QuestionnaireTemplate } from "types/app/patient/health/Question_Types";

interface UseAnswerQuestionnaireProps {
    params: {
        template: QuestionnaireTemplate,
        questionnaireId: string;
    }
}

export const useAnswerQuestionnaire = ({ params }: UseAnswerQuestionnaireProps) => {


    const template: QuestionnaireTemplate = params.template;
    const questionnaireId: string = params.questionnaireId;
    const initialAnswers: FormattedAnswer[] = template.questions.map(question => {
        const subAnswers = question.sub_questions
            ? Array(question.sub_questions.length).fill({ answer: '', type: 'bom' })
            : undefined;
        return {
            questionId: question._id,
            answer: '',
            type: 'bom',
            subAnswers: subAnswers
        };
    });     

    const [answers, setAnswers] = useState<FormattedAnswer[]>(initialAnswers);

    return { template, questionnaireId, answers, setAnswers };
}