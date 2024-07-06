import * as Notifications from 'expo-notifications';
import { NotificationData } from 'types/notification/Notification_Types';

export const SaveNotifications = async (addNotification: (msg: NotificationData) => Promise<void>) => {
    const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
        console.log("Notificação Recebida: ", notification);

        const isoDateNotify = new Date(notification.date).toISOString();
        const data = notification.request.content.data;
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

        const { _id, ...restOfData } = parsedData;

        const newMsg: NotificationData = {
            _id: _id ?? "",
            title: notification.request.content.title ?? "",
            body: notification.request.content.body ?? "",
            data: restOfData ?? undefined,
            updatedAt: isoDateNotify,
        };

        console.log("Nova mensagem: ", newMsg);
        await addNotification(newMsg);
    });

    return () => Notifications.removeNotificationSubscription(subscription);
};