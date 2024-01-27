import React, { createContext, useContext, useState, useEffect } from 'react';
import { UseAuth } from './AuthContext';
import { FetchData } from '../services/fetchUtils/APIUtils';
import USE_ENV from '../services/server_url/ServerUrl';

export interface NotificationData {
    _id: string;
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
    sender_params: {
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
    removeNotification: (index: number) => Promise<NotificationData[] | undefined>;
    loadNotifications: () => void;
    setNotifications: (value: React.SetStateAction<NotificationData[]>) => void
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
    const { authData } = UseAuth();
    const { fullApiServerUrl } = USE_ENV();

    const getNotificationsInDB = async (authToken: string) => {
        const requestData = {
            url: 'getNotifications',
            method: 'GET',
        }

        const response = await FetchData(requestData, authToken, fullApiServerUrl);
        console.log("FETCH NOTIFICATIONS RESPONSE: ", response);
        return response;
    }

    const deleteNotificationInDB = async (authToken: string, notification: NotificationData) => {
        const requestData = {
            url: 'deleteNotification',
            method: 'DELETE',
            data: {
                notificationId: notification._id
            }
        }

        const response = await FetchData(requestData, authToken, fullApiServerUrl);
        console.log("FETCH NOTIFICATION DELETED: ", response);
        return response;
    }

    const loadNotifications = async () => {
        const response = await getNotificationsInDB(authData.token)
        if (response.success) {
            setNotifications(response.data);
        }
        else {
            console.log("Houve algum erro ao buscar as notificações: ", response);
        }
    }

    const addNotification = async (new_notification: NotificationData) => {
        try {
            setNotifications((prevNotifications) => [...prevNotifications, new_notification]);
        }
        catch (err) {
            console.error("Erro ao adicionar notificação: ", err);
        }

    }

    const removeNotification = async (index: number) => {
        const notificationToDelete = notifications[index];
        const response = await deleteNotificationInDB(authData.token, notificationToDelete);
        if (response.success) {
            try {
                const updatedNotifications = [...notifications];
                updatedNotifications.splice(index, 1);
                return updatedNotifications;
            }
            catch (err) {
                console.error("Erro ao remover notificação: ", err);
                return undefined;
            }
        }
        else {
            console.error("Houve um erro ao deletar notificação no banco de dados: ", response);
            return undefined;
        }
    }

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, loadNotifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
} 