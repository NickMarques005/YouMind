import { useState } from 'react';
import { Alert } from 'react-native';
import { FetchData } from './fetchUtils/APIUtils';
import USE_ENV from './server_url/ServerUrl';
import { Token, Tokens } from '../contexts/AuthContext';
import { UseAuth } from '../contexts/AuthContext';
import { ApiResponse } from './APIService';

interface AccessTokenResponse {
    accessToken: Token | undefined;
}

export const UseAuthentication = () => {
    const { fullApiServerUrl } = USE_ENV();
    const { signOut, loadAccessToken } = UseAuth();
    const [loading, setLoading] = useState(false);

    const HandleAuthentication = async (
        route: string,
        method: string,
        data: Record<string, any>,
        errorMessage: string
    ) => {
        try {
            setLoading(true);

            const requestData = {
                route,
                method,
                data
            }

            const response = await FetchData(requestData, undefined, fullApiServerUrl);

            if (response.success) {
                console.log(response.message);
                setLoading(false);
                return {
                    success: response.success,
                    data: response.data,
                    message: response.message
                };
            }
            else {
                setLoading(false);
                console.log(`Erro no ${method.toLowerCase()}: `, response);
                let new_error = '';

                if (response.errors) {
                    new_error = response.errors.map((error: string) => error).join(" | ");
                    console.log(new_error);
                    return {
                        success: response.success,
                        errors: new_error
                    }
                }
                else {
                    new_error = "Erro não especificado";
                    return {
                        success: response.success,
                        errors: new_error
                    }
                }
            }
        }
        catch (err) {
            setLoading(false);
            console.log(`Erro ao ${method.toLowerCase()}: `, err);
            Alert.alert(errorMessage, "Tente novamente");
        }
    };

    const LoginUser = async (userData: Record<string, any>, userType: string) => {
        const route_login = `loginUser`;
        const login_response = await HandleAuthentication(
            route_login,
            'POST',
            { ...userData, type: userType },
            "Erro ao entrar com seu usuário"
        )
        try {

            if (!login_response) {
                console.log("Houve um erro na requisição do login");
                return;
            }

            if (login_response?.success) {
                console.log("Usuário encontrado!");
                const tokens = login_response.data;
                console.log("TOKENS: ", tokens);
                return {
                    tokens
                };
            }

            console.log("Erro no login: ", login_response);

            if (login_response.errors) {
                console.log("ERROS: ", login_response.errors);
                Alert.alert("Houve um erro ao autenticar usuário!", login_response.errors);
                return {
                    errors: login_response.errors
                }
            }

        }
        catch (err) {
            console.error('Erro ao entrar com o usuário: ', err);
            Alert.alert("Houve um erro ao fazer login!", "Tente Novamente");
        }
    }

    const RegisterUser = async (userData: Record<string, any>, userType: string, verifyAccount: (data: any) => void) => {
        const route_register = `createUser`;
        const register_response = await HandleAuthentication(
            route_register,
            'POST',
            { ...userData, type: userType },
            "Erro ao registrar usuário"
        )

        try {
            

            if (!register_response) {
                console.log("Houve um erro na requisição do login");
                return;
            }

            if (register_response.success) {
                console.log("USUÁRIO REGISTRADO!");
                const registerData = register_response.data;
                verifyAccount(registerData);
            }
            else {
                console.log("Erro no cadastro: ", register_response);
                let errors;
                if (register_response.errors) {
                    console.log("ERROS: ", register_response.errors);
                    errors = register_response.errors;
                }
                else {

                    console.log("Erro não especificado");
                    errors = "Erro não especificado";
                }
                Alert.alert("Houve um erro ao cadastrar usuário!", errors);
            }

        }
        catch (err) {
            console.error('Erro ao registrar usuário: ', err);
            Alert.alert("Houve um erro ao cadastrar usuário!", "Tente Novamente");
        }
    }

    const LogoutUser = async (tokens: Tokens | undefined, type: string | undefined) => {
        if (!type) {
            console.log("Houve algum erro! Tipo de usuário não especificado para deslogar");
            return;
        }
        else if (!tokens || !tokens.accessToken) {
            console.log("Houve algum erro! AccessToken não especificado para deslogar");
            return;
        }

        console.log("AccessToken para deslogar: ", tokens.accessToken);

        const requestData = {
            method: 'POST',
            route: 'logoutUser',
            data: {
                type: type
            }
        }

        const logoutResponse = await FetchData(requestData, tokens, fullApiServerUrl);

        if (logoutResponse.success) {
            signOut();
            console.log(`Usuário deslogado com sucesso!`);
        }
        else {
            console.error('Houve um erro ao deslogar usuário: ', logoutResponse.errors);
        }
    }

    const ValidateOTP = async (otp: string, userId: string | undefined, type: string | undefined) => {
        if (!userId || !type) {
            Alert.alert("Erro", "Dados insuficientes para validação.");
            return;
        }

        console.log("DADOS: ", otp, userId, type);
        
        const route_verifyEmail = `verifyEmail`;
        const otpValidationResponse = await HandleAuthentication(
            route_verifyEmail,
            'POST',
            { userId, otp, type },
            "Erro ao validar OTP"
        );

        try{
            if(!otpValidationResponse)
            {
                console.log("Houve um erro na validação do OTP");
                Alert.alert("Falha na requisição. Problema de conexão..");
                return;
            }

            if(!otpValidationResponse.success)
            {
                console.log("Erro na validação do OTP: ", otpValidationResponse.errors);
                Alert.alert("Erro na validação", otpValidationResponse.errors);
                return;
            }

            console.log("OTP validado com sucesso!");
            Alert.alert("Sucesso", "Sua conta foi verificada com sucesso!");
        }
        catch (err)
        {
            console.error('Erro ao validar OTP: ', err);
            Alert.alert("Erro", "Houve um erro na validação. Tente novamente.");
        }
    }

    return { loading, LoginUser, RegisterUser, LogoutUser, ValidateOTP}
}


