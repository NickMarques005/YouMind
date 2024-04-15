export interface Request_GetConversationTreatmentArgs {
    email_1: string;
    email_2: string;
}

export interface Request_SaveNewMessageArgs {
    conversationId: string;
    content: string;
}

export interface Request_GetMessagesArgs {
    conversationId: string;
}

export interface MessageTemplate {
    conversationId: string;
    sender: string;
    content: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}