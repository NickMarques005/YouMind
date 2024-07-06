import { ExpoPushToken } from "expo-notifications";
import { PushNotificationService } from "@api/services/notification/PushNotificationService";
import { SetLoading } from "types/loading/Loading_Types";
import { UseRequest } from "./UseRequest";
import { GetAccessToken } from "@utils/token/GetAccessToken";

export const UsePushNotificationService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const RegisterPushNotification = async (expoToken: ExpoPushToken | undefined) => {
        return HandleRequest({
            serviceFunction: PushNotificationService.RegisterPushToken,
            setLoading,
            params: [expoToken]
        });
    }

    return { RegisterPushNotification };
}

