import { DailyMotivationalPhrase } from "types/motivational_phrase/MotivationalPhrase_Types";
import { MakeRequest } from "../Request";
import { GetAccessToken } from "@utils/token/GetAccessToken";

export const MotivationalPhraseService = {
    GetAllMotivationalPhrasesFromPatient: async () => {
        const token = await GetAccessToken();
        return MakeRequest<DailyMotivationalPhrase[]>(
            `treatment/motivational-phrase/all`,
            'GET',
            undefined,
            token
        );
    },
    VerifyViewing: async (phraseId: string) => {
        const token = await GetAccessToken();
        return MakeRequest<DailyMotivationalPhrase>(
            'treatment/motivational-phrase/confirm-viewing',
            'POST',
            { phraseId },
            token
        );
    }
}