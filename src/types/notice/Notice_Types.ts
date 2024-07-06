import { MessageIcon } from "@components/modals/message/types/type_message_modal";

export type NoticeType = 'welcome' | 'questionary' | 'medicine' | 'update';

export interface Notice {
    message?: string;
    type?: NoticeType;
    messageType?: MessageIcon;
}