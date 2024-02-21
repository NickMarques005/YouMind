//-----APIService.ts-----//

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    errors?: string[];
    message?: string;
}

export const ApiRequest = async <T>(
    url: string,
    method: string = 'POST',
    data?: object,
    token?: string | undefined,
): Promise<ApiResponse<T>> => {
    try {
        const headers: any = {
            'Content-Type': 'application/json',
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
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