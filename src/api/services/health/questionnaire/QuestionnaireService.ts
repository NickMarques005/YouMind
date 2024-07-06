import { MakeRequest } from "@api/services/Request";

import { Questionnaire, QuestionnaireItem, QuestionnaireTemplate, Request_GetQuestionnairesArgs, Request_SendAnswersArgs } from "types/app/patient/health/Question_Types";
import { GetAccessToken } from "@utils/token/GetAccessToken";

export const QuestionnaireService = {
    GetQuestionnaires: async () => {
        const token = await GetAccessToken();
        return MakeRequest<QuestionnaireItem[]>(
            'health/questionnaire',
            'GET',
            undefined,
            token
        );
    },
    GetQuestionnaireTemplateById: async (id: string) => {
        const token = await GetAccessToken();
        return MakeRequest<QuestionnaireTemplate>(
            `health/questionnaire/template/${id}`,
            'GET',
            undefined,
            token
        );
    },
    SendAnswers: async (args: Request_SendAnswersArgs) => {
        const token = await GetAccessToken();
        return MakeRequest<QuestionnaireItem>(
            'health/questionnaire/answers/add',
            'POST',
            args,
            token
        );
    }
};