import { QuestionnaireService } from "@api/services/health/questionnaire/QuestionnaireService";
import { UseRequest } from "./UseRequest";
import { SetLoading } from "types/loading/Loading_Types";
import { Request_SendAnswersArgs } from "types/app/patient/health/Question_Types";

export const UseQuestionnaireService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetQuestionnaires = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: QuestionnaireService.GetQuestionnaires,
            setLoading,
            params: [],
            stopLoading,
        });
    };

    const performGetQuestionnaireTemplateById = async (id: string) => {
        return HandleRequest({
            serviceFunction: QuestionnaireService.GetQuestionnaireTemplateById,
            setLoading,
            params: [id]
        });
    };

    const performSendAnswers = async (args: Request_SendAnswersArgs) => {
        return HandleRequest({
            serviceFunction: QuestionnaireService.SendAnswers,
            setLoading,
            params: [args]
        });
    };

    return { performGetQuestionnaires, performGetQuestionnaireTemplateById, performSendAnswers };
};