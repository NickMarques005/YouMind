import { Token, Tokens } from "../contexts/AuthContext";
import { ApiResponse } from "./APIService";
import USE_ENV from "./server_url/ServerUrl";

interface AccessTokenResponse {
    accessToken: Token | undefined;
}

export const UpdateAccessToken = async (refreshToken: Token) => {
    
    const { fullApiServerUrl } = USE_ENV();

    if (!refreshToken.token) {
        console.log("Refresh Token não existe");
        return undefined;
    }

    const requestData = {
        method: 'POST',
        route: 'refreshToken',
        data: {
            refreshToken: refreshToken.token
        }
    };

    try {
        const url_Data = `${fullApiServerUrl}${requestData.route}`;

        const headers: any = {
            'Content-Type': 'application/json',
        }

        console.log("(APIService) HEADERS: ", headers);

        const requestOptions: RequestInit = {
            method: requestData.method,
            headers,
        };

        if (requestData.method !== 'GET' && requestData.data) {
            console.log("(APIService) DATA A SER ENVIADO: ", requestData.data);
            requestOptions.body = JSON.stringify(requestData.data);
        }

        const response = await fetch(url_Data, requestOptions);
        const responseData: ApiResponse<AccessTokenResponse> = await response.json();

        if (responseData.success && responseData.data?.accessToken) {
            console.log("(Authentication Service) AccessToken atualizado! TOKEN: ", responseData.data.accessToken);
            const newAccessToken: Token = responseData.data.accessToken;
            return newAccessToken;
        }
        else {
            console.log("(AuthenticationService) Não foi possivel atualizar AccessToken. Deslogando...")
            return undefined;
        }
    }
    catch (err) {
        console.error("Erro ao atualizar o token: ", err);
        
    }
}