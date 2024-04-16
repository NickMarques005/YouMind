import { ChatService } from "../../services/chat/ChatServices"
import { Tokens } from "../../types/auth/Auth_Types";
import { Request_GetConversationTreatmentArgs, Request_GetMessagesArgs, Request_SaveNewMessageArgs } from "../../types/chat/Chat_Types";
import { SetLoading } from "../../types/loading/Loading_Types";
import { UseRequest } from "./UseRequest"

export const UseChatService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetConversationTreatment = (args: Request_GetConversationTreatmentArgs, tokens: Tokens) => {
        return HandleRequest(ChatService.GetConversationTreatment, setLoading, args, tokens);
    }

    const performSaveNewMessage = (args: Request_SaveNewMessageArgs, tokens: Tokens) => {
        return HandleRequest(ChatService.SaveNewMessage, setLoading, args, tokens);
    }

    const performGetMessages = (args: Request_GetMessagesArgs, tokens: Tokens) => {
        return HandleRequest(ChatService.GetMessages, setLoading, args, tokens);
    }

    return { performGetConversationTreatment, performSaveNewMessage, performGetMessages };
}