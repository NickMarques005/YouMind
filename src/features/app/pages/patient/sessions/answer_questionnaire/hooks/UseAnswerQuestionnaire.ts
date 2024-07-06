import { QuestionnaireTemplate } from "types/app/patient/health/Question_Types";

interface UseAnswerQuestionnaireProps{
    params: {
        template: QuestionnaireTemplate,
        questionnaireId: string;
    }
}

export const useAnswerQuestionnaire = ({ params }: UseAnswerQuestionnaireProps) => {


    const template: QuestionnaireTemplate = params.template;
    const questionnaireId: string = params.questionnaireId;

    return { template, questionnaireId }
}