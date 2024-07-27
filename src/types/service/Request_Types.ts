import { Token } from "../auth/Auth_Types";

export interface Response<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    type?: string;
}

export interface RequestData {
    route: string;
    method: string;
    data: Record<string, any>;
    accessToken?: Token;
    refreshToken?: Token;
}

export interface UsePerformProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleConnectionAppError: (value: string) => void;
}

