import { UserGender } from "types/user/User_Types";

export interface SearchUserTreatmentInfo {
    name: string;
    avatar?: string;
    email: string;
}

export interface SearchUserData {
    name: string;
    phone: number;
    email: string;
    type: string;
    avatar?: string;
    gender?: UserGender;
    birth?: string;
    total_treatments?: SearchUserTreatmentInfo[];
    doctor?: SearchUserTreatmentInfo;
    is_treatment_running?: boolean;
}