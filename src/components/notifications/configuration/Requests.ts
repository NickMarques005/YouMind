import { FetchData } from "../../../services/fetchUtils/APIUtils";


export async function getNotifications(authToken: any) {
    const requestData = {
        url: '/api/getNotifications',
        method: 'GET',
    };

    const response = await FetchData(requestData, authToken);
    return response;
}