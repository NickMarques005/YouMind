import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { NotificationData } from 'types/notification/Notification_Types';

type NotificationAction =
    | { type: 'ADD_NOTIFICATION'; payload: NotificationData }
    | { type: 'REMOVE_NOTIFICATION'; payload: string }
    | { type: 'REMOVE_NOTIFICATIONS'; payload: string[] }
    | { type: 'SET_NOTIFICATIONS'; payload: NotificationData[] };

interface NotificationState {
    notifications: NotificationData[];
}

const initialNotifications: NotificationData[] = [];

const initialState: NotificationState = {
    notifications: initialNotifications,
};

const NotificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return { ...state, notifications: [...state.notifications, action.payload] };
        case 'REMOVE_NOTIFICATION':
            return { ...state, notifications: state.notifications.filter(notification => notification._id !== action.payload) };
        case 'REMOVE_NOTIFICATIONS': 
            return {
                ...state,
                notifications: state.notifications.filter(notification => !action.payload.includes(notification._id))
            };
        case 'SET_NOTIFICATIONS':
            return { ...state, notifications: action.payload };
        default:
            return state;
    }
};

interface NotificationContextType {
    state: NotificationState;
    dispatch: React.Dispatch<NotificationAction>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(NotificationReducer, initialState);

    return (
        <NotificationContext.Provider value={{ state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const UseNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('Context precisa ser dentro do provider! (UseNotifications)');
    }
    return context;
};