import { DefaultIconTypeKey, MessageIconTypes } from "types/icon/Icon_Types";

export type NoticeType = 'welcome' | 'questionary' | 'medicine' | 'update';

export interface Notice {
    message?: string;
    type?: NoticeType;
    dontshow?: boolean;
    icon?: DefaultIconTypeKey;
    acceptText?: string;
    declineText?: string;
}