import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export interface PushNotificationState {
    pushToken?: Notifications.ExpoPushToken;
    notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowAlert: true,
        })
    });

    console.log("Notifications Configuration");

    const [pushToken, setPushToken] = useState<Notifications.ExpoPushToken | undefined>();

    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Device.isDevice) {
            const { status: existStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existStatus;

            if (existStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log("USUARIO NÃO CONCEDEU PERMISSÃO PARA NOTIFICAÇÕES!");
                return;
            }

            console.log("NOTIFY GRANTED");

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas.projectId,
            });
        }
        else {
            alert('Deve ser um dispositivo físico para funcionar as notificações.');
        }

        if(Platform.OS === 'android')
        {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F2C',
            })
        }

        return token;
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            console.log("Registro de token para PushNotifications...");
            setPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log("NOVA NOTIFICAÇÃO!!!");
            console.log(notification);
            setNotification(notification);
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

    return {
        pushToken,
        notification
    }
};

export const OnPushNotificationOpenedApp = () => {

}