import { UserChat } from "types/chat/Chat_Types";
import { UserGender } from "types/user/User_Types";

export interface Request_InitializeTreatmentArgs {
    email_1: string;
    email_2: string;
}

export interface Request_EndTreatmentArgs {
    treatmentId: string;
}

export interface Request_WelcomeTreatment {
    treatmentId: string;
}

export interface NewTreatment {
    _id: string;
    doctorId: string;
    patientId: string;
}

export type TreatmentStatus = "active" | "completed" | "expired";

export interface TreatmentInfoTemplate {
    _id: string;
    uid?: string;
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    birth?: string;
    avatar?: string;
    online?: boolean;
    chat?: UserChat;
    status?: StatusTreatment;
    sessions?: TreatmentSession[];
    startedAt?: string;
    private_treatment?: boolean;
    treatmentStatus: TreatmentStatus;
}

export interface StatusTreatment {
    medications?: number;
    questionnaires?: number;
    twatch_time?: number;
    currentPerformance?: number;
}

export interface TreatmentSession {
    _id: string,
    engagedDoctor: {
        uid: string;
        name: string;
        avatar?: string;
        gender?: UserGender;
    };
    period: {
        start: string;
        end?: string;
    };
    finalPerformance?: number;
}

export interface EndTreatmentResponse {
    treatmentToUpdate: TreatmentInfoTemplate;
}