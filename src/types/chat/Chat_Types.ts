import { UserData } from "types/user/User_Types";

export interface Request_GetConversationTreatmentArgs {
    email_1?: string;
    email_2?: string;
}

export interface Request_SaveNewMessageArgs {
    conversationId: string;
    content: string;
    audioUrl?: string;
    duration?: string;
}

export interface Request_GetMessagesArgs {
    conversationId: string;
}

export type ProcessedMessageItem =
| { type: 'dateLabel'; date: string }
| { type: 'message'; data: MessageTemplate };

export interface MessageTemplate {
    conversationId: string;
    sender: string;
    content: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    readBy?: string[];
    audioUrl?: string;
    duration?: string;
}

export type ChatUser = {
    _id?: string;
    uid?: string;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    avatar?: string;
    online?: boolean;
};

export type CurrentChat = {
    members: ChatUser[];
};

export type ChatParamList = {
    current_chat: {
        userType?: string;
        userData: UserData;
        member: ChatUser;
    };
};

