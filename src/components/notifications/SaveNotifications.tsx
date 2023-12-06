import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { NotificationData, UseNotifications } from '../../contexts/NotificationsContext';



export const saveNotifications = () => {
    const { addNotification } = UseNotifications();

    useEffect(() => {

        const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
            console.log("Notificação Recebida: ", notification);

            const date_notification = new Date(notification.date);
            const isoDateNotify = date_notification.toISOString();

            const parsedData = typeof notification.request.content.data === 'string'
                ? JSON.parse(notification.request.content.data)
                : notification.request.content.data;

            const newMsg: NotificationData = {
                title: notification.request.content.title ?? "",
                body: notification.request.content.body ?? "",
                data: parsedData ?? undefined,
                date: isoDateNotify,
            }
            await addNotification(newMsg);
        });

        return () => {
            Notifications.removeNotificationSubscription(
                subscription!
            );
        }

    }, []);

}