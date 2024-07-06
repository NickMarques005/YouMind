import { TreatmentService } from "@api/services/treatment/TreatmentServices";
import { UseRequest } from "./UseRequest";
import { SetLoading } from "types/loading/Loading_Types";
import { Request_EndTreatmentArgs, Request_InitializeTreatmentArgs } from "types/treatment/Treatment_Types";

export const UseTreatmentService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performInitializeTreatment = async (args: Request_InitializeTreatmentArgs, type: string) => {
        
        return HandleRequest({
            serviceFunction: TreatmentService.InitializeTreatment,
            setLoading,
            params: [args, type]
        });
    };

    const performGetTreatment = async (type: string) => {
        
        return HandleRequest({
            serviceFunction: TreatmentService.GetTreatment,
            setLoading,
            params: [type]
        });
    };

    const performEndTreatment = async (args: Request_EndTreatmentArgs, type: string) => {
        
        return HandleRequest({
            serviceFunction: TreatmentService.EndTreatment,
            setLoading,
            params: [args, type]
        });
    };

    return { performInitializeTreatment, performGetTreatment, performEndTreatment };
}


