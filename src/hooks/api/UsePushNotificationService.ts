import { ExpoPushToken } from "expo-notifications";
import { PushNotificationService } from "../../services/notification/PushNotificationService";
import { Tokens } from "../../types/auth/Auth_Types";
import { SetLoading } from "../../types/loading/Loading_Types";
import { UseRequest } from "./UseRequest";

export const UsePushNotificationService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const RegisterPushNotification = (expoToken: ExpoPushToken, tokens: Tokens) => {
        return HandleRequest(PushNotificationService.RegisterPushToken, setLoading, expoToken, tokens);
    }

    return { RegisterPushNotification };
}

