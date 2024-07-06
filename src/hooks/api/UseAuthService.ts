import { AuthenticationService } from '@api/services/auth/AuthenticationServices';
import { LoginBackendDataResponse, Request_ForgotPassArgs, Request_LoginArgs, Request_RegisterArgs, Request_RenewOTPArgs, Request_ValidateOTPArgs, Token } from 'types/auth/Auth_Types';
import { SetLoading } from 'types/loading/Loading_Types';
import { UseRequest } from './UseRequest';
import { FB_LoginWithEmail, FB_Logout } from '../../__firebase__/services/FirebaseAuthServices';
import { Response } from 'types/service/Request_Types';
import { ExpoPushToken } from 'expo-notifications';

export const UseAuthService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performLogin = async (args: Request_LoginArgs, type: string): Promise<Response<LoginBackendDataResponse | any>> => {
        const firebaseLogin = async (res: Response<LoginBackendDataResponse>) => {
            const email = res.data?.email;
            const password = res.data?.password;
            if (email && password) {
                return await FB_LoginWithEmail(email, password);
            }
            return res;
        }

        return HandleRequest({ serviceFunction: AuthenticationService.loginUser, setLoading, firebaseFunction: firebaseLogin, params: [args, type] });
    }

    const performRegister = (args: Request_RegisterArgs, type: string) => {
        return HandleRequest({ serviceFunction: AuthenticationService.registerUser, setLoading, params: [args, type] });
    }

    const performLogout = async (pushToken?: ExpoPushToken) => {
        return HandleRequest({ serviceFunction: AuthenticationService.logoutUser, setLoading, params: [pushToken] });
    }

    const performValidateOTP = (args: Request_ValidateOTPArgs, type: string) => {
        return HandleRequest({ serviceFunction: AuthenticationService.validateOTP, setLoading, params: [args, type] });
    }

    const performRenewOTP = (args: Request_RenewOTPArgs, type: string) => {
        return HandleRequest({ serviceFunction: AuthenticationService.renewOTP, setLoading, params: [args, type] });
    }

    const performForgotPass = (args: Request_ForgotPassArgs, type: string) => {
        return HandleRequest({ serviceFunction: AuthenticationService.forgotPassword, setLoading, params: [args, type] });
    }

    return { performLogin, performRegister, performLogout, performValidateOTP, performRenewOTP, performForgotPass }
}

