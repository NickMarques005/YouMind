export type UserType = 'patient' | 'doctor' | undefined;

export interface Request_GetUserDataArgs {

}

export interface Request_FilterUsersArgs {
    search: string;
}

export interface FilterUserPatient {
    _id: string;
    name: string;
    email: string;
    phone: number;
    type: string;
    avatar: string;
    is_treatment_running: boolean;
}

export interface FilterUserDoctor {
    _id: string;
    name: string;
    email: string;
    phone: number;
    type: string;
    avatar: string;
    total_treatments: Array<string>;
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
    total_treatments: Array<string>;
}

export interface UserPatient {
    _id: string;
    name: string;
    email: string;
    phone: number;
    type: string;
    avatar: string;
    is_treatment_running: boolean;
}

export type UserData = UserDoctor | UserPatient;