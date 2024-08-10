import { SearchUserTreatmentInfo } from "types/treatment/Search_Types";

export type UserType = 'patient' | 'doctor' | undefined;

export type GenderType = 'Masculino' | 'Feminino' | 'Prefiro não informar' | 'Outro';

export type UserGender = 'Masculino' | 'Feminino' | 'Prefiro não informar' | string;

export interface FilterUserPatient {
    _id: string;
    name: string;
    email: string;
    phone: number;
    type: string;
    avatar: string;
    gender?: UserGender;
    birth?: string;
    doctor?: SearchUserTreatmentInfo;
    is_treatment_running: boolean;
}

export interface FilterUserDoctor {
    _id: string;
    name: string;
    email: string;
    phone: number;
    type: string;
    avatar: string;
    gender?: UserGender;
    birth?: string;
    total_treatments: SearchUserTreatmentInfo[];
}

export type FilteredUser = FilterUserPatient | FilterUserDoctor;

export interface UserDoctor {
    _id: string;
    name: string;
    email: string;
    phone: number;
    type: string;
    avatar: string;
    doctor_crm: string;
    birth?: string;
    gender?: UserGender;
    total_treatments: Array<string>;
}

export interface UserPatient {
    _id: string;
    name: string;
    email: string;
    phone: number;
    type: string;
    avatar: string;
    birth?: string;
    gender?: UserGender;
    is_treatment_running: boolean;
}

export type UserData = UserDoctor | UserPatient;

export type UpdateUserData = (data: UserData | undefined) => void;

//Requests:

export interface Request_GetUserDataArgs {

}

export interface Request_FilterUsersArgs {
    search: string;
}

export interface Request_UpdateUserAvatar {
    avatar: string;
}

export interface Request_UpdateUserDetails {
    name?: string;
    phone?: number;
    birth?: string;
    gender?: UserGender;
}

//Responses:

export interface UserAvatarResponse {
    avatar: string;
}

export interface UserDetailsResponse {
    name?: string;
    phone?: number;
    birth?: string;
    gender?: UserGender;
}

