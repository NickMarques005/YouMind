import { useEffect, useState } from "react";
import { UseHandleActiveChat } from "./UseHandleActiveChat";
import { ChatUser, CurrentChat } from "types/chat/Chat_Types";
import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";

interface UseChatHandlingProps {
    currentChat: CurrentChat | null;
    redirectChat: TreatmentInfoTemplate | null;
}

export const UseChatBehavior = ({ currentChat, redirectChat }: UseChatHandlingProps) => {

    const [singleMember, setSingleMember] = useState<ChatUser | undefined>(undefined);

    useEffect(() => {
        if (currentChat) {
            if (currentChat.members.length === 1) {
                console.log(currentChat);
                setSingleMember(currentChat.members[0])
            }
            else {
                console.log("Mais de um membro");
                console.log(currentChat);
                setSingleMember(undefined);
            }
        }
        else{
            if(redirectChat)
            {
                console.log("REDIRECT CHAT: ", redirectChat);
                setSingleMember(redirectChat);
            }
        }

    }, [currentChat, redirectChat]);

    return { singleMember }
}