import { TreatmentService } from "../../services/treatment/TreatmentServices";
import { UseRequest } from "./UseRequest";
import { Tokens } from "../../types/auth/Auth_Types";
import { SetLoading } from "../../types/loading/Loading_Types";
import { Request_DeleteTreatmentArgs, Request_InitializeTreatmentArgs } from "../../types/treatment/Treatment_Types";


export const UseTreatmentService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performInitializeTreatment = (args: Request_InitializeTreatmentArgs, type: string, tokens: Tokens) => {
        return HandleRequest(TreatmentService.InitializeTreatment, setLoading, args, type, tokens);
    };

    const performGetTreatment = (type: string, tokens: Tokens) => {
        return HandleRequest(TreatmentService.GetTreatment, setLoading, type, tokens);
    };

    const performDeleteTreatment = (args: Request_DeleteTreatmentArgs, type: string, tokens: Tokens) => {
        return HandleRequest(TreatmentService.DeleteTreatment, setLoading, args, type, tokens);
    }

    return { performInitializeTreatment, performGetTreatment, performDeleteTreatment};
}


