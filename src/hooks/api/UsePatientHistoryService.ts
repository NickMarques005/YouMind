import { UseRequest } from "./UseRequest";
import { SetLoading } from "types/loading/Loading_Types";
import { PatientHistoryService } from "@api/services/treatment/HistoryService";

export const UsePatientHistoryService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetAllHistory = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: PatientHistoryService.getAllHistory,
            setLoading,
            params: [],
            stopLoading
        });
    };

    const performGetLatestHistory = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: PatientHistoryService.getLatestHistory,
            setLoading,
            params: [],
            stopLoading
        });
    };

    const performGetQuestionPerformance = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: PatientHistoryService.getQuestionPerformance,
            setLoading,
            params: [],
            stopLoading
        });
    };

    const performGetHistoryQuestionnairesForCurrentPatient = async (page: number, treatment: string) => {
        return HandleRequest({
            serviceFunction: PatientHistoryService.getHistoryQuestionnairesForCurrentPatient,
            setLoading,
            params: [page, treatment]
        });
    };

    const performGetHistoryMedicationsForCurrentPatient = async (page: number, treatment: string) => {
        return HandleRequest({
            serviceFunction: PatientHistoryService.getHistoryMedicationsForCurrentPatient,
            setLoading,
            params: [page, treatment]
        });
    };

    return {
        performGetAllHistory,
        performGetLatestHistory,
        performGetQuestionPerformance,
        performGetHistoryMedicationsForCurrentPatient,
        performGetHistoryQuestionnairesForCurrentPatient
    };
};