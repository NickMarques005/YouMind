
import { PushNotificationDataResponse } from 'types/notification/PushNotification_Types';
import { MakeRequest } from '../Request';
import { ExpoPushToken } from 'expo-notifications';
import { GetAccessToken } from '@utils/token/GetAccessToken';

export const PushNotificationService = {
    RegisterPushToken: async (expoToken: ExpoPushToken | undefined) => {
        const token = await GetAccessToken();
        return MakeRequest<PushNotificationDataResponse>(
            '/notifications/push/register',
            'POST',
            { pushToken: expoToken?.data },
            token
        )
    }
}