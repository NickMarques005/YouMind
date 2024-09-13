import { useAnswerQuestionnaire } from "@features/app/providers/patient/AnswerQuestionnaireProvider";
import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess"
import { Questionnaire, QuestionnaireTemplate } from "types/app/patient/health/Question_Types";

export const useQuestionnaireBehavior = () => {
    const { handleAnswerQuestionnaire } = useAnswerQuestionnaire();
    const { questionNavigateOnSuccess } = UseNavigateOnSuccess();


    const handleSelectQuestionnaireToAnswer = (template: QuestionnaireTemplate, questionnaireId: string) => {
        console.log("Answer Questionnaire Template: ", template);
        handleAnswerQuestionnaire(template, questionnaireId);
    }

    const handleVisualizeCurrentQuestionnaire = (questionnaireId: string, questionnaire?: Questionnaire, template?: QuestionnaireTemplate,) => {
        console.log("Visualize Questionnaire ");
        questionNavigateOnSuccess('visualize_question', { questionnaire, template, questionnaireId });
    }

    return { 
        handleSelectQuestionnaireToAnswer, 
        handleVisualizeCurrentQuestionnaire 
    }
}