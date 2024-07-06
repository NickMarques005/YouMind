import { UseNotifications } from '@features/app/reducers/NotificationReducer';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { NotificationData } from 'types/notification/Notification_Types';



export const UseSaveNotifications = () => {
    const { dispatch } = UseNotifications();

    useEffect(() => {

        const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
            console.log("Notificação Recebida: ", notification);

            const isoDateNotify = new Date(notification.date).toISOString();

            const data = notification.request.content.data;
            const parsedData = typeof data === 'string'
                ? JSON.parse(data)
                : data;

            console.log(parsedData);
            const { _id, ...restOfData } = parsedData;

            const newNotification: NotificationData = {
                _id: _id ?? "",
                title: notification.request.content.title ?? "",
                body: notification.request.content.body ?? "",
                data: restOfData ?? undefined,
                updatedAt: isoDateNotify,
            }

            console.log("(USE SAVE NOTIFICATIONS) newMsg to add: ", newNotification);

            dispatch({
                type: 'ADD_NOTIFICATION',
                payload: newNotification
            });
        });

        return () => {
            Notifications.removeNotificationSubscription(
                subscription!
            );
        }

    }, []);

}