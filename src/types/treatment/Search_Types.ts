import { UserGender } from "types/user/User_Types";

export interface SearchUserData {
    name: string;
    phone: number;
    email: string;
    type: string;
    avatar?: string;
    gender?: UserGender;
    birth?: string;
    total_treatments?: string[];
    is_treatment_running?: boolean;
}