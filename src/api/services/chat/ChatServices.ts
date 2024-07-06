import { MakeRequest } from "../Request";
import {
    MessageTemplate,
    Request_GetConversationTreatmentArgs,
    Request_GetMessagesArgs,
    Request_SaveNewMessageArgs
} from "types/chat/Chat_Types";
import { Response } from "types/service/Request_Types";
import { GetAccessToken } from "@utils/token/GetAccessToken";


export const ChatService = {

    GetConversationTreatment: async (getConversationData: Request_GetConversationTreatmentArgs): Promise<Response<string>> => {
        const token = await GetAccessToken();
        return MakeRequest<string>(
            'chat/get-conversation',
            'GET',
            undefined,
            token,
            { ...getConversationData}
        );
    },

    SaveNewMessage: async (newMessageData: Request_SaveNewMessageArgs): Promise<Response<MessageTemplate>> => {
        const token = await GetAccessToken();
        return MakeRequest<MessageTemplate>(
            'chat/save-message',
            'POST',
            newMessageData,
            token,
        );
    },

    GetMessages: async (getMessagesData: Request_GetMessagesArgs): Promise<Response<MessageTemplate[]>> => {
        const token = await GetAccessToken();
        return MakeRequest<MessageTemplate[]>(
            'chat/get-messages',
            'GET',
            undefined,
            token,
            { ...getMessagesData }
        );
    }
}
