import { Questionnaire, QuestionnaireTemplate } from "types/app/patient/health/Question_Types";


interface UseVisualizeQuestionsProps{
    params: {
        questionnaire: Questionnaire | undefined,
        template: QuestionnaireTemplate | undefined,
        questionnaireId: string
    }
}

export const UseVisualizeQuestions = ({ params }: UseVisualizeQuestionsProps) => {
    
    const { questionnaire, template, questionnaireId } = params;
    return { questionnaire, template, questionnaireId };
}