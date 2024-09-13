
export interface DailyMotivationalPhrase {
    _id: string;
    patientId: string;
    phraseId: string;
    text: string;
    viewed: boolean;
    usedAt: string;
}