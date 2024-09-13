import { DeleteNotificationResponse, DeleteNotificationsResponse, NotificationTemplate, Request_DeleteNotificationArgs, Request_DeleteNotificationsArgs } from "types/notification/Request_Types";
import { MakeRequest } from "../Request";
import { GetAccessToken } from "@utils/token/GetAccessToken";

export const NotificationService = {
    GetNotifications: async () => {
        const token = await GetAccessToken();
        return MakeRequest<NotificationTemplate[]>(
            'notifications/user/all',
            'GET',
            undefined,
            token
        )
    },
    DeleteNotification: async (deleteNotificationData: Request_DeleteNotificationArgs) => {
        const token = await GetAccessToken();
        return MakeRequest<DeleteNotificationResponse>(
            'notifications/user/delete',
            'DELETE',
            { ...deleteNotificationData },
            token
        )
    },
    DeleteNotifications: async (deleteNotificationsData: Request_DeleteNotificationsArgs) => {
        const token = await GetAccessToken();
        return MakeRequest<DeleteNotificationsResponse>(
            'notifications/user/delete-many',
            'DELETE',
            { ...deleteNotificationsData },
            token
        )
    }
}