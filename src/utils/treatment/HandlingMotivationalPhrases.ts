import { formatDateToInitialDate, formatDateToISO } from "@utils/date/DateFormatting";
import { DailyMotivationalPhrase } from "types/motivational_phrase/MotivationalPhrase_Types";

export const verifyUnviewedPhrase = (phrases: DailyMotivationalPhrase[]) => {
    console.log("Verificação de Frase Motivacional!");
    const today = new Date();
    const initialDateToday = formatDateToInitialDate(today);
    const startOfDay = formatDateToISO(initialDateToday);
    const hasUnviewedPhrase = phrases.some(
        (phrase) => {
            console.log(phrase.usedAt);
            const phraseDate = new Date(phrase.usedAt);
            const phraseDateIso = formatDateToISO(phraseDate);
            return phraseDateIso === startOfDay && !phrase.viewed
        }
    );
    return hasUnviewedPhrase;
}