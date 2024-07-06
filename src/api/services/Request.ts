import { Token } from 'types/auth/Auth_Types';
import { Response } from "types/service/Request_Types";
import USE_ENV from '../constants/server_url/ServerUrl';


const makeHeaders = (token?: Token) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

export const MakeRequest = async <T>(
    endpoint: string, 
    method: string = 'GET', 
    data?: object, 
    token?: Token, 
    queryParams?: Record<string, string | number>,
    pathParams?: string
): Promise<Response<T>> => {
    const { fullApiServerUrl } = USE_ENV();

    let url = pathParams ? `${fullApiServerUrl}/${endpoint}/${pathParams}` : `${fullApiServerUrl}/${endpoint}`;

    if (queryParams) {
        const query = new URLSearchParams();
        for (const key in queryParams) {
            const value = queryParams[key];
            console.log(value);
            if (value !== undefined) { 
                query.append(key, value.toString());
            }
        }
        url += `?${query.toString()}`;
    }

    const headers = makeHeaders(token);

    const requestOptions: RequestInit = {
        method,
        headers,
        body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
    };

    console.log("URL da Requisição: ", url);

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            console.log(`HTTP ERROR! Status: ${response.status}`);
        }
        const responseData: Response<T> = await response.json();

        return { ...responseData };
    } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        return { success: false, error: (error as Error).message };
    }
}