import { Tokens } from "../../types/auth/Auth_Types";
import { MakeRequest } from "../Request";
import { DeleteTreatmentResponse, NewTreatment, Request_DeleteTreatmentArgs, Request_InitializeTreatmentArgs, TreatmentInfoTemplate } from "../../types/treatment/Treatment_Types";

export const TreatmentService = {
    InitializeTreatment: async (initializeTreatmentData: Request_InitializeTreatmentArgs, type: string, tokens: Tokens) => {
        return MakeRequest<NewTreatment>(
            'treatment/initialize',
            'POST',
            { ...initializeTreatmentData, type },
            tokens?.accessToken,
            tokens?.refreshToken,
        )
    },
    GetTreatment: async (type: string, tokens: Tokens) => {
        return MakeRequest<TreatmentInfoTemplate[]>(
            'treatment/',
            'GET',
            undefined,
            tokens?.accessToken,
            tokens?.refreshToken,
            { type }
        )
    },
    DeleteTreatment: async (treatmentToDelete: Request_DeleteTreatmentArgs, type: string, tokens: Tokens) => {
        return MakeRequest<DeleteTreatmentResponse>(
            'treatment/delete',
            'POST',
            { ...treatmentToDelete, type },
            tokens?.accessToken,
            tokens?.refreshToken
        )
    }
}



