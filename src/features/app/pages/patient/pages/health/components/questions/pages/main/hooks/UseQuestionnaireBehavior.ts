import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess"
import { Questionnaire, QuestionnaireTemplate } from "types/app/patient/health/Question_Types";

export const useQuestionnaireBehavior = () => {

    const { appNavigateOnSuccess, questionNavigateOnSuccess } = UseNavigateOnSuccess();

    const handleAnswerQuestionnaire = (template: QuestionnaireTemplate, questionnaireId: string) => {
        console.log("Answer Questionnaire Template");
        appNavigateOnSuccess('answer_questionnaire', { template, questionnaireId});
    }

    const handleVisualizeCurrentQuestionnaire = (questionnaireId: string, questionnaire?: Questionnaire, template?: QuestionnaireTemplate,) => {
        console.log("Visualize Questionnaire");
        questionNavigateOnSuccess('visualize_question', { questionnaire, template, questionnaireId });
    }

    return { 
        handleAnswerQuestionnaire, 
        handleVisualizeCurrentQuestionnaire 
    }
}