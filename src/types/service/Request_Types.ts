import { Token } from "../auth/Auth_Types";

export interface Response<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface RequestData {
    route: string;
    method: string;
    data: Record<string, any>;
    accessToken?: Token;
    refreshToken?: Token;
}

