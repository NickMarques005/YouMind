import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NotificationData {
    title: string;
    body: string;
    data?: NotificationContentData | undefined;
    date: string;
}

export interface NotificationContentData {
    notify_type: 'treatment' | 'chat' | 'update';
    notify_function: string;
    buttons?: {
        button_accept?: string,
        button_decline?: string
    };
    sender_params:{
        name?: string;
        email?: string;
        id?: string;
    };
    show_modal: boolean;
    redirect_params?: {
        screen: string;
        menu_option: string;
    }
}

interface NotificationContextType {
    notifications: NotificationData[];
    addNotification: (notification: NotificationData) => void;
    removeNotification: (index: number) => void;
}

interface NotificationProviderProps {
    children: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const UseNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotificationContext deve ser usado dentro de NotificationProvider! ');
    }
    return context;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                console.log("Load Notifications...");
                const storedNotifications = await AsyncStorage.getItem('notifications');
                if (storedNotifications) {
                    setNotifications(JSON.parse(storedNotifications));
                }
            }
            catch (err) {
                console.error("Erro ao carregar notificações: ", err);
            }
        }

        loadNotifications();
    }, []);

    const addNotification = async (new_notification: NotificationData) => {
        try {
            const storedNotifications = await AsyncStorage.getItem('notifications');
            const parsedNotifications: NotificationData[] = storedNotifications ? JSON.parse(storedNotifications) : [];

            const updatedNotifications = [...parsedNotifications, new_notification];
            console.log("UPDATE NOTIFY: ", updatedNotifications);

            setNotifications(updatedNotifications);
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));

        }
        catch (err) {
            console.error("Erro ao adicionar notificação: ", err);
        }
    }

    const removeNotification = async (index: number) => {
        try{
            const updatedNotifications = [...notifications];
            updatedNotifications.splice(index, 1);
            setNotifications(updatedNotifications);
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        }
        catch (err)
        {
            console.error("Erro ao remover notificação: ", err);
        }
    }

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    )
} 