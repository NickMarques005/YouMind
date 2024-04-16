
import { Tokens, LoginDataResponse, RegisterDataResponse, LogoutDataResponse, ValidateOTPDataResponse, Request_LoginArgs, Request_RegisterArgs, Request_ValidateOTPArgs } from '../../types/auth/Auth_Types';
import { MakeRequest } from '../Request';


export const AuthenticationService = {

    loginUser: async (credentials: Request_LoginArgs, type: string) => {
        return MakeRequest<LoginDataResponse>(
            'auth/login',
            'POST',
            { ...credentials, type },
        );
    },
    registerUser: async (credentials: Request_RegisterArgs, type: string) => {
        return MakeRequest<RegisterDataResponse>(
            'auth/register',
            'POST',
            { ...credentials, type },
            
        );
    },
    logoutUser: async (type: string, tokens: Tokens) => {
        return MakeRequest<LogoutDataResponse>(
            'auth/logout',
            'POST',
            { type },
            tokens.accessToken
        );
    },
    validateOTP: async (otpArgs: Request_ValidateOTPArgs, type: string) => {
        return MakeRequest<ValidateOTPDataResponse>(
            'auth/verify-email',
            'POST',
            { ...otpArgs, type }
        );
    }
};

