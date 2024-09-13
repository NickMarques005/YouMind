import { UserGender, UserType } from "types/user/User_Types";

export interface SearchUserTreatmentInfo {
    name: string;
    avatar?: string;
    email?: string;
    private?: boolean;
}

export interface SearchUserData {
    _id: string;
    uid: string;
    name: string;
    avatar?: string;
    type: string;
    phone?: string;
    email?: string;
    gender?: UserGender;
    birth?: string;
    private?: boolean;
    total_treatments?: SearchUserTreatmentInfo[];
    doctor?: SearchUserTreatmentInfo;
    is_treatment_running?: boolean;
}