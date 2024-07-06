import React, { createContext, useContext, useState, useRef, useCallback, ReactNode, useEffect } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

interface PushNotificationContextType {
    pushToken?: Notifications.ExpoPushToken | undefined;
    tokenKey?: string | undefined;
    notification?: Notifications.Notification | undefined;
    setNotification: React.Dispatch<React.SetStateAction<Notifications.Notification | undefined>>;
    handleTokenKey: (value?: string) => void;
}

const PushNotificationContext = createContext<PushNotificationContextType>({
    pushToken: undefined,
    tokenKey: undefined,
    notification: undefined,
    setNotification: () => {},
    handleTokenKey: () => {}
});

interface PushTokenProviderProps {
    children: ReactNode;
}

export const PushTokenProvider: React.FC<PushTokenProviderProps> = ({ children }) => {
    const [pushToken, setPushToken] = useState<Notifications.ExpoPushToken | undefined>(undefined);
    const [tokenKey, setTokenKey] = useState<string | undefined>(undefined);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

    const initializePushTokenService = async () => {
        if (!Device.isDevice) {
            alert('Precisa utilizar um dispositivo real para poder usar Push Notifications.');
            return;
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log("USER DID NOT GRANT PERMISSIONS!");
            return;
        }

        const token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas.projectId,
        });

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F2C',
            });
        }
        
        return token;
    };

    const handleTokenKey = (value?: string) => {
        console.log("TOKEN KEY: ", value);
        setTokenKey(value);
    }

    useEffect(() => {
        console.log("***InitializeTokenService")
        initializePushTokenService().then((token: Notifications.ExpoPushToken | undefined) => {
            console.log("Push Token salvo!!", token);
            setPushToken(token);
        });
    }, []);

    const providerValues: PushNotificationContextType = {
        pushToken,
        notification,
        setNotification,
        handleTokenKey
    };

    return (
        <PushNotificationContext.Provider value={providerValues}>
            {children}
        </PushNotificationContext.Provider>
    );
};

export const UsePushToken = () => {
    const context = useContext(PushNotificationContext);
    if (!context) {
        throw new Error('Context deve ser usado dentro do Provider! (UsePushToken)');
    }
    return context;
}