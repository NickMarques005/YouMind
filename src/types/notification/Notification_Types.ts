export interface Request_DeleteNotificationArgs {
    notificationId: string;
}


export interface Request_NotificationTreatmentSolicitationArgs{
    destinatary_user_email: string;
    destinatary_user_type: string;
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

export type NotificationTreamtmentSolicitationResponse = undefined;