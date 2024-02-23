import { ApiRequest } from '../APIService';
import { HandleErrors } from '../../components/errors/hooks/UseHandleErrors';
import { Tokens } from '../../contexts/AuthContext';

interface ApiRequestData {
    route: string;
    method: string;
    data?: object;
}

export const FetchData = async (apiRequestData: ApiRequestData, tokens?: Tokens | undefined, serverUrl?: string | undefined) => {
    
    const url_Data = `${serverUrl}${apiRequestData.route}`;
    console.log("(APIUtils) URL: ", url_Data);

    const response = await ApiRequest(url_Data, `${apiRequestData.method}`, apiRequestData.data, tokens?.accessToken, tokens?.refreshToken);

    try {
        if (response.success) {
            const current_data = response.data as any;
            console.log("(APIUtils) CURRENT_DATA: ", current_data);
            if (response.message) {
                return { data: current_data, message: response.message, success: true };
            }
            return { data: current_data, success: true };
        } else {
            console.log("(APIUtils) Houve um erro ao buscar os dados");
            if (response.errors) {
                const errors = response.errors;
                console.log("(APIUtils) ERRORS: ", errors);
                HandleErrors(errors);
                return { errors: response.errors, success: false };
            }

            return { success: false };
        }
    } catch (err) {
        console.log("(APIUtils) Houve um erro: ", err);
        console.log("(APIUtils) Não foi possível buscar os dados");
        return { success: false, error: err };
    }
};