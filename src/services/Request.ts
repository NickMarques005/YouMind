import { Token } from '../types/auth/Auth_Types';
import { HandleErrors } from "../components/errors/hooks/UseHandleErrors";
import { Response } from "../types/service/Request_Types";
import { UpdateAccessToken } from "./auth/TokenService";
import USE_ENV from "./server_url/ServerUrl";

const isTokenExpiring = (token: Token): boolean => {
    const tokenExp = Date.parse(token.exp) / 1000;
    const now = Date.now() / 1000;
    const threshold = 60;
    return tokenExp - now < threshold;
}

const makeHeaders = (token_data?: Token) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token_data) {
        headers['Authorization'] = `Bearer ${token_data.token}`;
    }
    return headers;
}

export const MakeRequest = async <T>(
    endpoint: string, method: string = 'GET', data?: object, accessToken?: Token, refreshToken?: Token, queryParams?: Record<string, string | number>
): Promise<Response<T>> => {
    const { fullApiServerUrl } = USE_ENV();
    let tokenUsed = accessToken;
    if (accessToken && refreshToken && isTokenExpiring(accessToken)) {
        const updatedToken = await UpdateAccessToken(refreshToken);
        if (updatedToken) {
            tokenUsed = updatedToken;
        }
    }

    let url = `${fullApiServerUrl}/${endpoint}`;
    if (queryParams) {
        const query = new URLSearchParams();
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                query.append(key, queryParams[key].toString()); // Garantindo que o valor é uma string
            }
        }
        url += `?${query.toString()}`;
    }

    const headers = makeHeaders(tokenUsed);

    const requestOptions: RequestInit = {
        method,
        headers,
        body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
    };

    console.log("URL da Requisição: ", url);

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP ERROR! Status: ${response.status}`);
        }
        const responseData: Response<T> = await response.json();

        if (!responseData.success) {
            HandleErrors(responseData.error);
            return { ...responseData, success: false };
        }

        return { ...responseData, success: true };
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        HandleErrors((error as Error).message);
        return { success: false, error: (error as Error).message };
    }
}