import { useEffect } from 'react';
import { ApiRequest } from '../services/APIService';
import { AuthData, UseAuth } from '../contexts/AuthContext';
import { ExpoPushToken } from 'expo-notifications';

const registerPushToken = async (authData: AuthData, pushToken: ExpoPushToken | undefined, serverUrl: string | undefined ) => {

    console.log("REGISTRO DE NOTIFICAÇÕES...");

    if (authData && pushToken) {
        const url_Data = `${serverUrl}registerPushNotification`;

        const notify_data = {
            push_token: pushToken.data
        };

        const response = await ApiRequest(url_Data, 'POST', notify_data, authData.token);

        try {
            console.log(pushToken);
            if (response.success) {
                console.log(response);
            } else {
                console.log(response);
                console.log("Houve algum erro durante o registro");
            }
        } catch (err) {
            console.log("Houve um erro: ", err);
            console.log("Não foi possível buscar os dados");
        }
    }
};

const UseRegisterPushToken = (authData: AuthData, pushToken: ExpoPushToken | undefined, serverUrl: string | undefined) => {

    useEffect(() => {
        registerPushToken(authData, pushToken, serverUrl);

    }, [pushToken]);
}

export default UseRegisterPushToken;