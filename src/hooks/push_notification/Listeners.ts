import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import * as Notifications from 'expo-notifications';


const Listeners = () => {

    const notificationListener = useRef<Notifications.Subscription | null>(null);
    const responseListener = useRef<Notifications.Subscription | null>(null);
    

    useEffect(() => {

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log("NOVA NOTIFICAÇÃO!!!");
            console.log(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("ABERTO COM PUSH NOTIFICATION");
            console.log(response);

        })

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            );

            Notifications.removeNotificationSubscription(
                responseListener.current!
            );
        }
    }, []);

}

export default Listeners;