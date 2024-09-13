import { useState, useEffect, useCallback } from 'react';
import { ProcessedMessageItem, MessageTemplate } from 'types/chat/Chat_Types';
import { UserData } from 'types/user/User_Types';

interface UseMessageHandlingProps {
    messages: MessageTemplate[];
    userData: UserData | undefined;
    handleReadMessage: (message: MessageTemplate, user?: UserData) => void;
    preprocessMessages: (messages: MessageTemplate[]) => ProcessedMessageItem[];
}

export const useProcessedMessageHandling = ({
    messages,
    userData,
    handleReadMessage,
    preprocessMessages,
}: UseMessageHandlingProps) => {
    const [processedMessages, setProcessedMessages] = useState<ProcessedMessageItem[]>([]);

    useEffect(() => {
        const updatedMessages = preprocessMessages(messages);
        console.log("Novas mensagens processadas: ", updatedMessages.length);

        if(updatedMessages.length > 0)
        {
            setProcessedMessages(updatedMessages);
        }
        
    }, [messages]);

    const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        viewableItems.forEach((viewableItem: any) => {
            if (viewableItem.item.type !== 'dateLabel') {
                const ownMessage = viewableItem.item.data.sender === userData?._id;
                if (!ownMessage && userData && !viewableItem.item.data.readBy?.includes(userData?._id)) {
                    handleReadMessage(viewableItem.item.data, userData);
                }
            }
        });
    }, [handleReadMessage, userData]);

    return {
        processedMessages,
        handleViewableItemsChanged,
    };
};