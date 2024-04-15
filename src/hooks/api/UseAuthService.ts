import { AuthenticationServices } from '../../services/auth/AuthenticationServices';
import {  Tokens } from '../../types/auth/Auth_Types';
import { UseRequest } from './UseRequest';

export const UseAuthService = () => {
    const { HandleRequest } = UseRequest();

    const fetchLogin = (credentials: Record<string, any>, type: string) =>
        HandleRequest('login', AuthenticationServices.loginUser, credentials, type);

    const fetchRegister = (credentials: Record<string, any>, type: string) => 
        HandleRequest('register', AuthenticationServices.registerUser, credentials, type);

    const fetchLogout = (tokens: Tokens, type: string) => 
        HandleRequest('logout', AuthenticationServices.logoutUser, tokens, type);

    const fetchValidateOTP = (otp: string, userId: string, type: string) => 
        HandleRequest('otpValidation', AuthenticationServices.validateOTP, otp, userId, type);

    return { fetchLogin, fetchRegister, fetchLogout, fetchValidateOTP }
}

