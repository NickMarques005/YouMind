import { Tokens } from "../../types/auth/Auth_Types";
import { MakeRequest } from "../Request";
import {
    MessageTemplate,
    Request_GetConversationTreatmentArgs,
    Request_GetMessagesArgs,
    Request_SaveNewMessageArgs
} from "../../types/chat/Chat_Types";
import { Response } from "../../types/service/Request_Types";


export const ChatService = {

    GetConversationTreatment: async (getTreatmentData: Request_GetConversationTreatmentArgs, tokens: Tokens | undefined): Promise<Response<string>> => {
        return MakeRequest<string>(
            'chat/get-conversation',
            'GET',
            undefined,
            tokens?.accessToken,
            tokens?.refreshToken,
            { ...getTreatmentData}
        );
    },

    SaveNewMessage: async (newMessageData: Request_SaveNewMessageArgs, tokens: Tokens | undefined): Promise<Response<MessageTemplate>> => {
        return MakeRequest<MessageTemplate>(
            'chat/save-message',
            'POST',
            newMessageData,
            tokens?.accessToken,
            tokens?.refreshToken
        );
    },

    GetMessages: async (getMessagesData: Request_GetMessagesArgs, tokens: Tokens | undefined): Promise<Response<MessageTemplate[]>> => {
        return MakeRequest<MessageTemplate[]>(
            'chat/get-messages',
            'GET',
            undefined,
            tokens?.accessToken,
            tokens?.refreshToken,
            { ...getMessagesData }
        );
    }
}
