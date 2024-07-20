import { MessageIcon } from "@components/modals/message/types/type_message_modal";

export type NoticeType = 'welcome' | 'questionary' | 'medicine' | 'update';

export interface Notice {
    message?: string;
    type?: NoticeType;
    dontshow?: boolean;
    icon?: MessageIcon;
    acceptText?: string;
    declineText?: string;
}