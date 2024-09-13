import { SolicitationServices } from "@api/services/solicitation/SolicitationServices";
import { UseRequest } from "./UseRequest"
import { SetLoading } from "types/loading/Loading_Types";
import { Request_CreateSolicitationArgs, Request_DeclineSolicitationArgs } from "types/solicitation/Solicitation_Types";


export const UseSolicitationService = (setLoading: SetLoading) => {
    const { HandleRequest }= UseRequest();

    const performCreateSolicitation = async (args: Request_CreateSolicitationArgs, type: string) => {
        return HandleRequest({
            serviceFunction: SolicitationServices.CreateSolicitation,
            setLoading,
            params: [args, type]
        });
    }

    const performDeclineSolicitation = async (args: Request_DeclineSolicitationArgs) => {
        return HandleRequest({
            serviceFunction: SolicitationServices.DeclineSolicitation,
            setLoading,
            params: [args]
        })
    }

    return { performCreateSolicitation, performDeclineSolicitation };
}