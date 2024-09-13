import { DefaultIconTypeKey, MessageIconTypeKey } from "types/icon/Icon_Types";
import { SolicitationType } from "types/solicitation/Solicitation_Types";
import { UserType } from "types/user/User_Types";

export interface SenderParams {
    name: string;
    email?: string;
    _id?: string;
    avatar?: string;
    type: UserType;
    birth?: string;
    gender?: string;
    uid: string;
}

export interface SolicitationParams {
    email: string,
    avatar?: string,
    type: UserType,
    solicitationId: string,
    solicitationType: SolicitationType
}

export interface RedirectParams {
    screen: string;
    menu_option: string;
    page?: string;
}

export type NotifyType = 'treatment' | 'chat' | 'update' | 'ble';
export type NotifyFunction = 'solicitation' | 'message_alert';
export interface NotifyButtons {
    button_accept?: string;
    button_decline?: string;
};

export interface NotificationContentData {
    notify_type: NotifyType;
    notify_function: NotifyFunction;
    buttons?: NotifyButtons;
    sender_params?: SenderParams;
    solicitation_params?: SolicitationParams;
    redirect_params?: RedirectParams;
    show_modal: boolean;
    has_decline?: boolean;
    icon?: DefaultIconTypeKey | MessageIconTypeKey;
    group?: GroupNotification;
    createdAt?: string;
    updatedAt?: string;
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
    savePushDate?: string;
}

export interface TypeNotification {
    typeName: string;
    isOn: boolean;
    type: string;
}
