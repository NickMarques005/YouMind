import { Tokens } from '../../types/auth/Auth_Types';
import { Response } from '../../types/service/Request_Types';
import { MakeRequest } from '../Request';
import { ExpoPushToken } from 'expo-notifications';

export const PushNotificationService = {
    RegisterPushToken: async (expoToken: ExpoPushToken, tokens: Tokens | undefined): Promise<Response<string>> => {

        return MakeRequest<string>(
            '/notifications/register-push-notification',
            'POST',
            { pushToken: expoToken.data },
            tokens?.accessToken,
            tokens?.refreshToken
        )
    }
}