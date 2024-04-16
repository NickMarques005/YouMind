export interface Token {
    token: string;
    exp: string;
}

export interface AccessTokenResponse {
    accessToken: Token | undefined;
}

export interface Tokens {
    accessToken: Token | undefined;
    refreshToken: Token | undefined;
}

export interface AuthData {
    accessToken: Token | undefined;
    refreshToken: Token | undefined;
    type: "patient" | "doctor" | undefined;
}

export interface Request_LoginArgs {
    email: string;
    password: string;
}

export interface Request_RegisterArgs {
    name: string;
    email: string;
    password: string;
    phone: string;
    doctor_crm?: string;
}

export interface Request_ValidateOTPArgs {
    otp: string;
    userId: string;
}

export type LoginDataResponse = Tokens;

export interface RegisterDataResponse {
    _id: string;
    type: string;
}

export type LogoutDataResponse = undefined;
export type ValidateOTPDataResponse = undefined;

