import { Tokens } from "../contexts/AuthContext";
import { FetchData } from "./fetchUtils/APIUtils";
import USE_ENV from "./server_url/ServerUrl";

export interface ConversationTreatmentResponse {
    success: boolean;
    data?: string;
    errors?: string[];
}

interface ConversationArgs {
    email_1: string;
    email_2: string;
}

export interface MessageTemplate {
    conversationId: string;
    sender: string;
    content: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface SaveNewMessageResponse {
    success: boolean;
    data?: MessageTemplate;
    errors?: string[];
}

interface SaveNewMessageArgs {
    conversationId: string;
    content: string;
}

interface GetMessagesResponse {
    success: boolean;
    data?: MessageTemplate[];
    errors?: string[];
}

const { fullApiServerUrl } = USE_ENV();

export const ChatService = {

    getConversationTreatment: async (getTreatmentData: ConversationArgs, tokens: Tokens | undefined): Promise<ConversationTreatmentResponse> => {
        try {

            console.log(getTreatmentData);
            const apiRequestData = {
                route: 'getConversationTreatment',
                method: 'POST',
                data: getTreatmentData
            }

            const result = await FetchData(apiRequestData, {accessToken: tokens?.accessToken, refreshToken: tokens?.refreshToken}, fullApiServerUrl);

            if (result.success) {
                console.log("Conversation: ", result.data);
                return { success: true, data: result.data }
            }
            else {
                return { success: false, errors: result.errors }
            }
        }
        catch (err: any) {
            console.error("Erro ao buscar conversa:", err);
            return { success: false, errors: [err.message || 'Erro desconhecido'] };
        }
    },

    saveNewMessage: async (newMessageData: SaveNewMessageArgs, tokens: Tokens | undefined): Promise<SaveNewMessageResponse> => {
        try {
            const apiRequestData = {
                route: 'saveNewMessage',
                method: 'POST',
                data: newMessageData
            }

            const result = await FetchData(apiRequestData, {accessToken: tokens?.accessToken, refreshToken: tokens?.refreshToken}, fullApiServerUrl);

            if (result.success) {
                console.log("Nova Mensagem: ", result.data);
                return { success: true, data: result.data }
            }
            else {
                return { success: false, errors: result.errors }
            }
        }
        catch (err: any) {
            console.error("Erro ao salvar nova mensagem:", err);
            return { success: false, errors: [err.message || 'Erro desconhecido'] };
        }
    },

    getMessages: async (conversationId: string, tokens: Tokens | undefined): Promise<GetMessagesResponse> => {
        try {
            const apiRequestData = {
                route: 'getMessages',
                method: 'POST',
                data: { conversationId }
            }

            const result = await FetchData(apiRequestData, tokens, fullApiServerUrl);

            if (result.success) {
                console.log("Mensagens: ", result.data);
                return { success: true, data: result.data }
            }
            else {
                return { success: false, errors: result.errors }
            }
        }
        catch (err: any) {
            console.error("Erro ao buscar mensagens:", err);
            return { success: false, errors: [err.message || 'Erro desconhecido'] };
        }
    }
}
