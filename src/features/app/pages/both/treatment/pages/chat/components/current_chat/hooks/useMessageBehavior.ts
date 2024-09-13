import { useEffect, useMemo, useState } from "react";
import { MessageSelected, MessageTemplate } from "types/chat/Chat_Types";

interface UseMessageBehaviorParams {
    selectedMessages: MessageSelected[];
    message: MessageTemplate;
}

export const useMessageBehavior = ({ 
    selectedMessages, message
}: UseMessageBehaviorParams) => {

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const selectedMessage = selectedMessages.some(selected => selected.messageId === message._id);
        setIsSelected(selectedMessage);
    }, [selectedMessages]);

    return { isSelected }
}