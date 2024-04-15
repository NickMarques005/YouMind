
import { Tokens, LoginData, RegisterData, LogoutData, ValidateOTPData, Request_LoginArgs, Request_RegisterArgs, Request_ValidateOTPArgs } from '../../types/auth/Auth_Types';
import { MakeRequest } from '../Request';


export const AuthenticationServices = {

    loginUser: async (credentials: Request_LoginArgs, type: string) => {
        return MakeRequest<LoginData>(
            'auth/login',
            'POST',
            { ...credentials, type },
        );
    },
    registerUser: async (credentials: Request_RegisterArgs, type: string) => {
        return MakeRequest<RegisterData>(
            'auth/register',
            'POST',
            { ...credentials, type },
            
        );
    },
    logoutUser: async (type: string, tokens: Tokens) => {
        return MakeRequest<LogoutData>(
            'auth/logout',
            'POST',
            { type },
            tokens.accessToken
        );
    },
    validateOTP: async (otpArgs: Request_ValidateOTPArgs, type: string) => {
        return MakeRequest<ValidateOTPData>(
            'auth/verify-email',
            'POST',
            { ...otpArgs, type }
        );
    }
};

