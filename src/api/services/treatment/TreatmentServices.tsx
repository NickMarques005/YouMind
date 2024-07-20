import { MakeRequest } from "../Request";
import { EndTreatmentResponse, NewTreatment, Request_EndTreatmentArgs, Request_InitializeTreatmentArgs, TreatmentInfoTemplate } from "types/treatment/Treatment_Types";
import { GetAccessToken } from "@utils/token/GetAccessToken";
import { Notice } from "types/notice/Notice_Types";

export const TreatmentService = {
    InitializeTreatment: async (initializeTreatmentData: Request_InitializeTreatmentArgs, type: string) => {
        const token = await GetAccessToken();
        return MakeRequest<NewTreatment>(
            'treatment/initialize',
            'POST',
            { ...initializeTreatmentData, type },
            token
        )
    },
    GetTreatment: async (type: string) => {
        const token = await GetAccessToken();
        return MakeRequest<TreatmentInfoTemplate[]>(
            'treatment/',
            'GET',
            undefined,
            token,
            { type }
        )
    },
    EndTreatment: async (treatmentToEnd: Request_EndTreatmentArgs, type: string) => {
        const token = await GetAccessToken();
        return MakeRequest<EndTreatmentResponse>(
            'treatment/end',
            'POST',
            { ...treatmentToEnd, type },
            token
        )
    },
    WelcomeTreatment: async (type: string) => {
        const token = await GetAccessToken();
        return MakeRequest<Notice>(
            'treatment/welcome',
            'POST',
            { type },
            token
        );
    },
    RemoveWelcomeTreatment: async (type: string) => {
        const token = await GetAccessToken();
        return MakeRequest<undefined>(
            'treatment/removeWelcome',
            'POST',
            { type },
            token
        );
    }
}



