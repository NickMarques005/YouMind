//-----APIService.ts-----//

import { Token } from "../contexts/AuthContext";
import { UpdateAccessToken } from "./TokenService";

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    errors?: string[];
    message?: string;
}

const isTokenExpiring = (token: Token) => {
    const tokenExp = Date.parse(token.exp) / 1000;
    console.log("(isTokenExpiring) Exp: ", tokenExp);
    const now = Date.now() / 1000;
    const threshold = 5;
    return tokenExp - now < threshold;
}

export const ApiRequest = async <T>(
    url: string,
    method: string = 'POST',
    data?: object,
    accessToken?: Token | undefined,
    refreshToken?: Token | undefined
): Promise<ApiResponse<T>> => {
    
    try {

        let serviceToken = accessToken;

        if(serviceToken && refreshToken && isTokenExpiring(serviceToken))
        {
            console.log("AccessToken está para expirar!!");
            const newToken = await UpdateAccessToken(refreshToken);
            if(newToken)
            {
                serviceToken = newToken;
                console.log("(APIService) Novo token a ser utilizado: ", serviceToken);
            }
        }

        const headers: any = {
            'Content-Type': 'application/json',
        }

        if (serviceToken) {
            headers['Authorization'] = `Bearer ${serviceToken.token}`;
        }

        console.log("(APIService) HEADERS: ", headers);
        
        const requestOptions: RequestInit = {
            method,
            headers,
        };

        if (method !== 'GET' && data) {
            console.log("(APIService) DATA A SER ENVIADO: ", data);
            requestOptions.body = JSON.stringify(data);
        }

        console.log("-------\nAPI Service...\n-------");
        const test_request = {
            url: url,
            method: method,
            headers: headers,
            data: data
        }
        console.log("(APIService) REQUEST DATA: ", test_request);

        if (!url) {

            return { success: false, errors: ["Houve um erro, a URL do servidor não foi configurada."] };
        }

        const response = await fetch(url, requestOptions);
        const responseData: ApiResponse<T> = await response.json();

        if (responseData.success) {
            return { success: true, data: responseData.data, message: responseData.message };
        }
        else {
            return { success: false, errors: responseData.errors, message: responseData.message };
        }

    }
    catch (err) {
        console.error("(APIService) Erro ao chamar a API: ", err);
        return { success: false, errors: [`${err}`] };
    }
}