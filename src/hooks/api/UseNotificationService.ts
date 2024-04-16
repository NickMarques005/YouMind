import { NotificationService } from "../../services/notification/NotificationServices";
import { Tokens } from "../../types/auth/Auth_Types";
import { UseRequest } from "./UseRequest";
import { Request_DeleteNotificationArgs, Request_NotificationTreatmentSolicitationArgs  } from "../../types/notification/Notification_Types";
import { SetLoading } from "../../types/loading/Loading_Types";

export const UseNotificationService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetNotifications = (tokens: Tokens) => {
        return HandleRequest(NotificationService.GetNotifications, setLoading, tokens);
    }

    const performDeleteNotification = (args: Request_DeleteNotificationArgs, type: string, tokens: Tokens) => {
        return HandleRequest(NotificationService.DeleteNotification, setLoading, args, type, tokens);
    }

    const performTreatmentSolicitation = (args: Request_NotificationTreatmentSolicitationArgs, type: string, tokens: Tokens) => {
        return HandleRequest(NotificationService.TreatmentSolicitation, setLoading, args, type, tokens);
    }

    return { performGetNotifications, performDeleteNotification, performTreatmentSolicitation };
}


