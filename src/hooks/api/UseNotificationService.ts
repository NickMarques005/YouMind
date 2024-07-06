import { NotificationService } from "@api/services/notification/NotificationServices";
import { UseRequest } from "./UseRequest";
import { Request_DeleteNotificationArgs, Request_DeleteNotificationsArgs, Request_NotificationTreatmentSolicitationArgs  } from "types/notification/Request_Types";
import { SetLoading } from "types/loading/Loading_Types";

export const UseNotificationService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetNotifications = async () => {
        return HandleRequest({
            serviceFunction: NotificationService.GetNotifications,
            setLoading,
            params: []
        });
    }

    const performDeleteNotification = async (args: Request_DeleteNotificationArgs) => {
        return HandleRequest({
            serviceFunction: NotificationService.DeleteNotification,
            setLoading,
            params: [args]
        });
    }

    const performDeleteNotifications = async (args: Request_DeleteNotificationsArgs) => {
        return HandleRequest({
            serviceFunction: NotificationService.DeleteNotifications,
            setLoading,
            params: [args]
        });
    }

    const performTreatmentSolicitation = async (args: Request_NotificationTreatmentSolicitationArgs, type: string) => {
        return HandleRequest({
            serviceFunction: NotificationService.TreatmentSolicitation,
            setLoading,
            params: [args, type]
        });
    }

    return { performGetNotifications, performDeleteNotification, performTreatmentSolicitation, performDeleteNotifications };
}


