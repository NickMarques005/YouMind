import { Tokens } from "../../types/auth/Auth_Types";
import { DeleteNotificationResponse, NotificationTemplate, NotificationTreamtmentSolicitationResponse, Request_DeleteNotificationArgs, Request_NotificationTreatmentSolicitationArgs } from "../../types/notification/Notification_Types";
import { MakeRequest } from "../Request";

export const NotificationService = {
    GetNotifications: async (tokens: Tokens) => {
        return MakeRequest<NotificationTemplate[]>(
            'notifications/user/all',
            'GET',
            undefined,
            tokens?.accessToken,
            tokens?.refreshToken,
        )
    },
    DeleteNotification: async (deleteNotificationData: Request_DeleteNotificationArgs, type: string, tokens: Tokens) => {
        return MakeRequest<DeleteNotificationResponse>(
            'notifications/user/delete',
            'POST',
            { ...deleteNotificationData, type },
            tokens?.accessToken,
            tokens?.refreshToken
        )
    },
    TreatmentSolicitation: async (treatmentSolicitationData: Request_NotificationTreatmentSolicitationArgs, type: string, tokens: Tokens) => {
        return MakeRequest<NotificationTreamtmentSolicitationResponse>(
            'notifications/treatment/solicitation',
            'POST',
            { ...treatmentSolicitationData },
            tokens?.accessToken,
            tokens?.refreshToken
        )
    },
}