import { MakeRequest } from "@api/services/Request";
import { GetAccessToken } from "@utils/token/GetAccessToken";
import { AllHistoryResponse, HistoryMedicationsResponse, HistoryQuestionnairesResponse, LatestHistoryResponse, QuestionPerformanceResponse } from "types/history/PatientHistory_Types";

export const PatientHistoryService = {
    getAllHistory: async () => {
        const token = await GetAccessToken();
        return MakeRequest<AllHistoryResponse>(
            'treatment/history/doctor/all',
            'GET',
            undefined,
            token
        );
    },
    getLatestHistory: async () => {
        const token = await GetAccessToken();
        return MakeRequest<LatestHistoryResponse>(
            'treatment/history/doctor/latest',
            'GET',
            undefined,
            token
        );
    },
    getQuestionPerformance: async () => {
        const token = await GetAccessToken();
        return MakeRequest<QuestionPerformanceResponse>(
            'treatment/history/patient/questions',
            'GET',
            undefined,
            token
        );
    },
    getHistoryQuestionnairesForCurrentPatient: async (page: number, treatment: string) => {
        const token = await GetAccessToken();
        const queryParams = { page, treatment };
        return MakeRequest<HistoryQuestionnairesResponse>(
            'treatment/history/doctor/questionnaires',
            'GET',
            undefined,
            token,
            queryParams
        );
    },
    getHistoryMedicationsForCurrentPatient: async (page: number, treatment: string) => {
        const token = await GetAccessToken();
        const queryParams = { page, treatment };
        return MakeRequest<HistoryMedicationsResponse>(
            'treatment/history/doctor/medications',
            'GET',
            undefined,
            token,
            queryParams
        );
    }
};