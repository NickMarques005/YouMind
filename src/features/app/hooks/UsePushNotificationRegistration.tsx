import { useState, useEffect, useRef, SetStateAction } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { UsePushToken } from '@features/root/providers/PushTokenProvider';
import { UsePushNotificationService } from '@hooks/api/UsePushNotificationService';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';

interface UsePushNotificationRegistrationProps {
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    HandleConnectionAppError: (value: string) => void;
}

export const UsePushNotificationRegistration = ({ setLoading, HandleConnectionAppError }: UsePushNotificationRegistrationProps) => {
    const { pushToken, setNotification, handleTokenKey, tokenKey } = UsePushToken();
    const { RegisterPushNotification } = UsePushNotificationService(setLoading);
    const { uid } = UseAuth();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowAlert: true,
        })
    });

    const RegisterPushTokenInFirebase = async () => {
        try {

            const response = await RegisterPushNotification(pushToken);
            if (response.success) {
                let key;
                if (response.data) {
                    key = response.data?.tokenKey;
                    console.log("(REGISTER PUSH TOKEN IN FIREBASE) Response: ", response);
                    handleTokenKey(tokenKey);
                }

                return key;
            }
            if (response.error) {
                const error = response.error;
                console.log("(REGISTER PUSH TOKEN IN FIREBASE) Error: ", error);
                HandleConnectionAppError(error);
                console.log("Set Reload Data");
            }

            handleTokenKey(undefined);
            return response.success;
        }
        catch (err) {
            const error = err as Error;
            console.log("(REGISTER PUSH TOKEN IN FIREBASE) Error: ", err);
            console.log("Set Reload Data");
            handleTokenKey(undefined);
            HandleConnectionAppError(error.message);
            return false;
        }
    }

    const setNotificationListeners = () => {
        if (tokenKey || !uid) {
            console.log("(Push notification Registration) Não fazer register, está deslogado");
            return;
        }

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log("NOVA NOTIFICAÇÃO!!!");
            console.log(notification);
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("ABERTO COM PUSH NOTIFICATION");
            console.log(response);
        })
    }

    const returnNotificationListeners = () => {
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            );

            Notifications.removeNotificationSubscription(
                responseListener.current!
            );
        }
    }

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    return { RegisterPushTokenInFirebase, setNotificationListeners, returnNotificationListeners }
};
