import React, { createContext, useContext, useState, useEffect } from 'react';
import { UseAuth } from './AuthContext';
import { FetchData } from '../services/fetchUtils/APIUtils';
import USE_ENV from '../services/server_url/ServerUrl';

export interface NotificationData {
    _id: string;
    title: string;
    body: string;
    data?: NotificationContentData | undefined;
    updatedAt: string;
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
    removeNotification: (_id: string) => Promise<NotificationData[] | undefined>;
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
    const { authData, handleAuthError } = UseAuth();
    const { fullApiServerUrl } = USE_ENV();

    const getNotificationsInDB = async (authToken: string) => {
        const requestData = {
            route: 'getNotifications',
            method: 'GET',
        }

        const response = await FetchData(requestData, authToken, fullApiServerUrl);
        console.log("FETCH NOTIFICATIONS RESPONSE: ", response);
        return response;
    }

    const deleteNotificationInDB = async (authToken: string, notification: NotificationData) => {
        const requestData = {
            route: 'deleteNotification',
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
        if(!authData.accessToken?.token)
        {
            console.error("Houve um erro. Não há access Token definido");
            return;
        }
        const response = await getNotificationsInDB(authData.accessToken?.token)
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

    const removeNotification = async (_id: string) => {
        const notificationToDelete = notifications.find(notification => notification._id === _id);

        if(!notificationToDelete)
        {
            console.error("Notificação não encontrada");
            return;
        }

        console.log("NOTIFICATION TO DELETE: ", notificationToDelete);

        if(!authData.accessToken?.token)
        {
            console.error("Houve um erro. Não há access Token definido");
            return;
        }

        const response = await deleteNotificationInDB(authData.accessToken?.token, notificationToDelete);
        if (response.success) {
            try {
                const updatedNotifications = notifications.filter(notification => notification._id !== _id);
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

    useEffect(() => {
        loadNotifications();
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, loadNotifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
} 