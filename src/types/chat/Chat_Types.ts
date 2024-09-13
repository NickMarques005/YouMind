import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";
import { UserData, UserType } from "types/user/User_Types";

export interface UserChat {
    last_msg?: LastMsg;
    msg_count?: number;
}

export interface LastMsg {
    content: string;
    date: string;
}

export interface Request_GetConversationTreatmentArgs {
    email_1?: string;
    email_2?: string;
}

export interface Request_SaveNewMessageArgs {
    conversationId: string;
    content: string;
    audioUrl?: string;
    duration?: string;
    senderType: UserType;
}

export interface Request_GetMessagesArgs {
    conversationId: string;
}

export interface Request_AddMessagesToNoteArgs {
    messages: string[];
    noteId: string;
}

export type ProcessedMessageItem =
    | { type: 'dateLabel'; date: string }
    | { type: 'message'; data: MessageTemplate };

export interface MessageTemplate {
    conversationId: string;
    sender: string;
    senderType: UserType;
    content: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    readBy?: string[];
    audioUrl?: string;
    duration?: string;
    sending?: boolean;
    isMarked?: boolean;
    isRemoved?: boolean;
    mentionedMessageId?: string;
    mentionedMessage?: MentionedMessageTemplate;
}

export interface MentionedMessageTemplate {
    _id: string;
    senderId: string;
    senderName: string;
    senderType: UserType;
    content: string;
    hasAudio?: boolean;
}

export interface MessageSelected {
    messageId: string;
    ownMessage: boolean;
    isMarked?: boolean;
    senderId: string;
    senderName: string;
    senderType: UserType;
    hasAudio?: boolean;
    content: string;
}

export type ChatUser = {
    _id?: string;
    uid?: string;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    birth?: string;
    avatar?: string;
    online?: boolean;
};

export type CurrentChat = TreatmentInfoTemplate;

export type ChatParamList = {
    current_chat: {
        userType?: string;
        userData: UserData;
        member: ChatUser;
    };
};

export interface UpdatedInitialChat {
    chat: UserChat;
    treatmentId: string;
}

export interface SocketInitialChat {
    updatedChat: UpdatedInitialChat;
}

export interface Socket_MarkedMessages {
    messages: MessageTemplate[];
    isMarked: boolean;
}

export interface Socket_AllUnmarkedMessage {
    messageIds: string[];
    isMarked: boolean;
}

export interface Socket_FoundMessage {
    foundMessageId: string;
    messages: MessageTemplate[];
    page: number;
}