import { useEffect, useState } from "react";
import { UseHandleActiveChat } from "./UseHandleActiveChat";
import { ChatUser, CurrentChat } from "types/chat/Chat_Types";
import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";

interface UseChatHandlingProps {
    currentChat: CurrentChat | null;
    redirectChat: TreatmentInfoTemplate | null;
}

export const UseChatBehavior = ({ currentChat, redirectChat }: UseChatHandlingProps) => {

    const [chat, setChat] = useState<ChatUser | undefined>(undefined);

    useEffect(() => {
        console.log("SETAR CHAT BEHAVIOR");
        if (currentChat) {
                console.log("CURRENT CHAT: ", currentChat);
                setChat(currentChat);
        }
        else{
            if(redirectChat)
            {
                console.log(" SET REDIRECT CHAT: ", redirectChat);
                setChat(redirectChat);
            }
        }
    }, [currentChat, redirectChat]);

    return { chat }
}