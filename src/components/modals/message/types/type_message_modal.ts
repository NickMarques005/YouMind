import { UserType } from "types/user/User_Types";

export interface MessageModalProps {
    isVisible: boolean;
    message: string;
    onClose: () => void;
    userType: UserType;
    messageType?: MessageIcon;
}

export type MessageIcon = 'success' | 'email_sent' | 'info' | 'treatment' | 'warning' | 'medication' | 'questionnaire' | undefined;