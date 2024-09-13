import { SearchUserData, SearchUserTreatmentInfo } from "types/treatment/Search_Types";

export type UserType = 'patient' | 'doctor' | undefined;

export type GenderType = 'Masculino' | 'Feminino' | 'Prefiro não informar' | 'Outro';

export type UserGender = 'Masculino' | 'Feminino' | 'Prefiro não informar' | string;

export type FilteredUser = SearchUserData;

export interface UserDoctor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    type: string;
    avatar: string;
    doctor_crm: string;
    birth?: string;
    gender?: UserGender;
    private?: boolean;
    private_treatment?: boolean;
    total_treatments: Array<string>;
}

export interface UserPatient {
    _id: string;
    name: string;
    email: string;
    phone: string;
    type: string;
    avatar: string;
    birth?: string;
    gender?: UserGender;
    private?: boolean;
    private_treatment?: boolean;
    is_treatment_running: boolean;
}

export type UserData = UserDoctor | UserPatient;

export type UpdateUserData = (data: UserData | undefined) => void;

//Requests:

export interface Request_FilterUsersArgs {
    search: string;
}

export interface Request_FetchSelectedUserDataArgs {
    selectedUserId: string;
    type?: string;
}

export interface Request_UpdateUserAvatar {
    avatar: string;
}

export interface Request_UpdateUserDetails {
    name?: string;
    phone?: string;
    birth?: string;
    gender?: UserGender;
}

export interface Request_HandleProfileRestrictionArgs {
    
}

//Responses:

export interface UserAvatarResponse {
    avatar: string;
}

export interface UserDetailsResponse {
    name?: string;
    phone?: string;
    birth?: string;
    gender?: UserGender;
}

export interface HandleProfileRestrictionResponse {
    private: boolean;
}