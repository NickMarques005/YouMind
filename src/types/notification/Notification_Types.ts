import { UserType } from "types/user/User_Types";

export interface NotificationContentData {
    notify_type: 'treatment' | 'chat' | 'update' | 'ble';
    notify_function: string;
    buttons?: {
        button_accept?: string;
        button_decline?: string;
    };
    sender_params?: {
        name?: string;
        email?: string;
        _id?: string;
        avatar?: string;
        type?: UserType;
        birth?: string;
        gender?: string;
        uid?: string;
    };
    show_modal: boolean;
    redirect_params?: {
        screen: string;
        menu_option: string;
        page?: string;
    };
}

export interface GroupNotification {
    count?: number;
    _ids: string[];
}

export interface NotificationData {
    _id: string;
    title: string;
    body: string;
    data?: NotificationContentData;
    createdAt?: string;
    updatedAt: string;
    titleCancel?: string;
    titleAccept?: string;
    icon?: string;
    group?: GroupNotification
    
}

export interface TypeNotification {
    typeName: string; 
    isOn: boolean; 
    type: string;
}
