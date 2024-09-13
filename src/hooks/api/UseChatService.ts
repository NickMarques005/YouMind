import { ChatService } from "@api/services/chat/ChatServices"
import { Request_AddMessagesToNoteArgs, Request_GetConversationTreatmentArgs, Request_GetMessagesArgs, Request_SaveNewMessageArgs } from "types/chat/Chat_Types";
import { SetLoading } from "types/loading/Loading_Types";
import { UseRequest } from "./UseRequest"

export const UseChatService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetConversationTreatment = async (args: Request_GetConversationTreatmentArgs) => {
        
        return HandleRequest({
            serviceFunction: ChatService.GetConversationTreatment,
            setLoading,
            params: [args]
        });
    }

    const performSaveNewMessage = async (args: Request_SaveNewMessageArgs) => {
        
        return HandleRequest({
            serviceFunction: ChatService.SaveNewMessage,
            setLoading,
            params: [args]
        });
    }

    const performGetMessages = async (args: Request_GetMessagesArgs) => {

        return HandleRequest({
            serviceFunction: ChatService.GetMessages,
            setLoading,
            params: [args]
        });
    }

    const performAddMessagesToNote = async (args: Request_AddMessagesToNoteArgs) => {
        return HandleRequest({
            serviceFunction: ChatService.AddMessagesToNote,
            setLoading,
            params: [args]
        });
    }

    return { 
        performGetConversationTreatment, 
        performSaveNewMessage, 
        performGetMessages,
        performAddMessagesToNote
    };
}