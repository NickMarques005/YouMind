
import { GetAccessToken } from '@utils/token/GetAccessToken';
import { MakeRequest } from '../Request';
import { 
    LoginBackendDataResponse, 
    RegisterDataResponse, 
    LogoutDataResponse, 
    ValidateOTPDataResponse, 
    Request_LoginArgs, 
    Request_RegisterArgs, 
    Request_ValidateOTPArgs, 
    Request_RenewOTPArgs, 
    RenewOTPDataResponse,
    Request_ForgotPassArgs, 
    Token} from 'types/auth/Auth_Types';
import { ExpoPushToken } from 'expo-notifications';

export const AuthenticationService = {

    loginUser: async (credentials: Request_LoginArgs, type: string) => {
        return MakeRequest<LoginBackendDataResponse>(
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
    logoutUser: async (pushToken?: ExpoPushToken) => {
        const token = await GetAccessToken();

        return MakeRequest<LogoutDataResponse>(
            'auth/logout',
            'POST',
            { pushToken: pushToken?.data },
            token
        );
    },
    validateOTP: async (otpArgs: Request_ValidateOTPArgs, type: string) => {
        return MakeRequest<ValidateOTPDataResponse>(
            'auth/verify-email',
            'POST',
            { ...otpArgs, type }
        );
    },
    renewOTP: async (otpArgs: Request_RenewOTPArgs, type: string) => {
        return MakeRequest<RenewOTPDataResponse>(
            'auth/renew-otp',
            'POST',
            {...otpArgs, type}
        )
    },
    forgotPassword: async (forgotPassArgs: Request_ForgotPassArgs,type: string) => {
        return MakeRequest(
            'auth//forgot-password',
            'POST',
            {...forgotPassArgs, type}
        )
    }
};

