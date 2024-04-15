import { Tokens } from "../../types/auth/Auth_Types";
import { MakeRequest } from "../Request";
import { Response } from "../../types/service/Request_Types";

export const TreatmentServices = {
    GetTreatment: async (type: string, tokens: Tokens) => {
        return MakeRequest(
            '/treatment/',
            'GET',
            undefined,
            tokens?.accessToken,
            tokens?.refreshToken,
            { type }
        )
    }
}



