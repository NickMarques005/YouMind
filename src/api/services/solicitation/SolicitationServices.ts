import { GetAccessToken } from "@utils/token/GetAccessToken";
import { MakeRequest } from "../Request";
import { Request_DeclineSolicitationArgs, Request_CreateSolicitationArgs } from "types/solicitation/Solicitation_Types";


export const SolicitationServices = {
    CreateSolicitation: async (solicitationData: Request_CreateSolicitationArgs, type: string) => {
        const token = await GetAccessToken();
        return MakeRequest<undefined>(
            'solicitation/create',
            'POST',
            { ...solicitationData, type },
            token
        )
    },
    DeclineSolicitation: async (declineSolicitationData: Request_DeclineSolicitationArgs) => {
        const token = await GetAccessToken();
        return MakeRequest<undefined>(
            'solicitation/decline',
            'POST',
            { ...declineSolicitationData },
            token
        )
    }
}