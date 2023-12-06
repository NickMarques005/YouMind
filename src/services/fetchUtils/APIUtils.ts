import { ApiRequest } from '../APIService';

interface ApiRequestData {
    url: string;
    method: string;
    data?: object;
}

export const FetchData = async (apiRequestData: ApiRequestData, authDataToken?: string | undefined, serverUrl?: string | undefined) => {
    
    const url_Data = `${serverUrl}${apiRequestData.url}`;
    console.log("URL: ", url_Data);

    const response = await ApiRequest(url_Data, `${apiRequestData.method}`, apiRequestData.data, authDataToken);

    try {
        if (response.success) {
            const current_data = response.data as any;
            console.log("CURRENT_DATA: ", current_data);
            if (response.message) {
                return { data: current_data, message: response.message, success: true };
            }
            return { data: current_data, success: true };
        } else {
            console.log("Houve um erro ao buscar os dados");
            if (response.errors) {
                console.log("ERRORS: ", response.errors);
                return { errors: response.errors, success: false };
            }

            return { success: false };
        }
    } catch (err) {
        console.log("Houve um erro: ", err);
        console.log("Não foi possível buscar os dados");
        return { success: false, error: err };
    }
};