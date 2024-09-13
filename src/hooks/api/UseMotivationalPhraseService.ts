
import { MotivationalPhraseService } from "@api/services/treatment/MotivationalPhraseServices";
import { UseRequest } from "./UseRequest";
import { SetLoading } from "types/loading/Loading_Types";

export const UseMotivationalPhraseService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetAllMotivationalPhrasesFromPatient = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: MotivationalPhraseService.GetAllMotivationalPhrasesFromPatient,
            setLoading,
            params: [],
            stopLoading
        });
    };

    const performVerifyViewing = async (phraseId: string) => {
        return HandleRequest({
            serviceFunction: MotivationalPhraseService.VerifyViewing,
            setLoading,
            params: [phraseId]
        });
    };

    return { 
        performGetAllMotivationalPhrasesFromPatient, 
        performVerifyViewing 
    };
}