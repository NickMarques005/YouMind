import { AuthenticationService } from '../../services/auth/AuthenticationServices';
import { Request_LoginArgs, Request_RegisterArgs, Request_ValidateOTPArgs, Tokens } from '../../types/auth/Auth_Types';
import { SetLoading } from '../../types/loading/Loading_Types';
import { UseRequest } from './UseRequest';

export const UseAuthService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performLogin = (args: Request_LoginArgs, type: string) => {
        return HandleRequest(AuthenticationService.loginUser, setLoading, args, type);
    }

    const performRegister = (args: Request_RegisterArgs, type: string) => {
        return HandleRequest(AuthenticationService.registerUser, setLoading, args, type);
    }

    const performLogout = (tokens: Tokens, type: string) => {
        return HandleRequest(AuthenticationService.logoutUser, setLoading, type, tokens);
    }

    const performValidateOTP = (args: Request_ValidateOTPArgs, type: string) => {
        return HandleRequest(AuthenticationService.validateOTP, setLoading, args, type);
    }

    return { performLogin, performRegister, performLogout, performValidateOTP }
}

