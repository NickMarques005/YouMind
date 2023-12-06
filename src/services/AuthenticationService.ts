import { useState } from 'react';
import { Alert } from 'react-native';
import { ApiRequest } from '../services/APIService';
import USE_ENV from './server_url/ServerUrl';

export const UseAuthentication = () => {
    const { fullApiServerUrl } = USE_ENV();
    const [loading, setLoading] = useState(false);

    const HandleAuthentication = async (
        url: string,
        method: string,
        data: Record<string, any>,
        errorMessage: string
    ) => {
        try {
            setLoading(true);

            const response = await ApiRequest(url, method, data);

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
        const url_user = `${fullApiServerUrl}loginUser`;
        console.log("URL! ", url_user);
        const login_response = await HandleAuthentication(
            url_user,
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
                const authToken = login_response.data as string;
                console.log("TOKEN: ", authToken);
                return {
                    token: authToken,
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

    const RegisterUser = async (userData: Record<string, any>, userType: string, turnToLogin: () => void) => {
        const url_user = `${fullApiServerUrl}createUser`;
        console.log(url_user);
        const register_response = await HandleAuthentication(
            url_user,
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
                turnToLogin();
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

    return { loading, LoginUser, RegisterUser }
}


