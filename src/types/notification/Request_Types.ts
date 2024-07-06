export interface Request_DeleteNotificationArgs {
    notificationId: string;
}

export interface Request_DeleteNotificationsArgs {
    notificationIds: string[];
}

export interface Request_NotificationTreatmentSolicitationArgs{
    receiver_email: string;
}

export interface NotificationTemplate {
    _id: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    title: string;
    body: string;
    data: any;
}

export interface DeleteNotificationResponse {
    notificationId: string;
}

export interface DeleteNotificationsResponse {
    notificationIds: string[];
}

export type NotificationTreatmentSolicitationResponse = undefined;