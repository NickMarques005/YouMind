import { Tokens } from '../../types/auth/Auth_Types';
import { PushNotificationDataResponse } from '../../types/notification/PushNotification_Types';
import { Response } from '../../types/service/Request_Types';
import { MakeRequest } from '../Request';
import { ExpoPushToken } from 'expo-notifications';

export const PushNotificationService = {
    RegisterPushToken: async (expoToken: ExpoPushToken, tokens: Tokens | undefined) => {
        return MakeRequest<PushNotificationDataResponse>(
            '/notifications/push/register',
            'POST',
            { pushToken: expoToken.data },
            tokens?.accessToken,
            tokens?.refreshToken
        )
    }
}