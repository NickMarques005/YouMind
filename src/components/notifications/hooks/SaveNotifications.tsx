import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { NotificationData, UseNotifications } from '../../../providers/NotificationProvider';



export const saveNotifications = () => {
    const { addNotification } = UseNotifications();

    useEffect(() => {

        const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
            console.log("Notificação Recebida: ", notification);

            const isoDateNotify = new Date(notification.date).toISOString();
            
            const data = notification.request.content.data;
            const parsedData = typeof data === 'string'
                ? JSON.parse(data)
                : data;
            
            console.log(parsedData);
            const { _id, ...restOfData} = parsedData;

            const newMsg: NotificationData = {
                _id: _id ?? "",
                title: notification.request.content.title ?? "",
                body: notification.request.content.body ?? "",
                data: restOfData ?? undefined,
                updatedAt: isoDateNotify,
            }

            console.log("newMsg to add: ", newMsg);

            await addNotification(newMsg);
        });

        return () => {
            Notifications.removeNotificationSubscription(
                subscription!
            );
        }

    }, []);

}