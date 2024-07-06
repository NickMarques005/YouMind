export type Token = string | null;

export interface Request_LoginArgs {
    email?: string;
    password?: string;
}

export interface Request_RegisterArgs {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    doctor_crm?: string;
}

export interface Request_ValidateOTPArgs {
    otp: string;
    userId: string;
}

export interface Request_RenewOTPArgs {
    userId: string;
}

export interface Request_ForgotPassArgs {
    email?: string;
}

export interface LoginBackendDataResponse {
    email?: string;
    password?: string;
}

export interface LoginFirebaseDataResponse {
    email: string;
    uid: string;
}

export interface RegisterDataResponse {
    _id: string;
    type: string;
}

export type LogoutDataResponse = undefined;
export type ValidateOTPDataResponse = undefined;
export type RenewOTPDataResponse = undefined;
export type ForgotPassResponse = undefined;

