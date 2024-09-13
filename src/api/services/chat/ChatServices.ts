import { MakeRequest } from "../Request";
import {
    MessageTemplate,
    Request_AddMessagesToNoteArgs,
    Request_GetConversationTreatmentArgs,
    Request_GetMessagesArgs,
    Request_SaveNewMessageArgs
} from "types/chat/Chat_Types";
import { Response } from "types/service/Request_Types";
import { GetAccessToken } from "@utils/token/GetAccessToken";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";


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
    },

    AddMessagesToNote: async (addMessagesData: Request_AddMessagesToNoteArgs): Promise<Response<NoteTemplate>> => {
        const token = await GetAccessToken();
        return MakeRequest<NoteTemplate>(
            'chat/add-messages-to-note',
            'POST',
            addMessagesData,
            token,
        );
    }
}
