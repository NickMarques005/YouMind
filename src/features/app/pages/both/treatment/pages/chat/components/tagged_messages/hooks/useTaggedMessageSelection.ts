import { useEffect, useState } from 'react';
import { MessageSelected } from 'types/chat/Chat_Types';

interface UseTaggedMessagesSelection {
    handleSelectTaggedMessageScrolling: (_id: string) => void;
}

export const useTaggedMessagesSelection = ({ handleSelectTaggedMessageScrolling }: UseTaggedMessagesSelection) => {
    const [markedSelectedMessages, setMarkedSelectedMessages] = useState<MessageSelected[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);

    const handleAddMessageSelection = (message: MessageSelected) => {
        if (!markedSelectedMessages.some(selected => selected.messageId === message.messageId)) {
            setMarkedSelectedMessages(prev => [...prev, message]);
        }
    };

    const handleRemoveMessageSelection = (messageSelected: MessageSelected) => {
        setMarkedSelectedMessages(prev => prev.filter(currentMessage => currentMessage.messageId !== messageSelected.messageId));
    };

    const handleLongPressMessage = (message: MessageSelected) => {
        if (!isSelecting) {
            setIsSelecting(true);
        }
        handleAddMessageSelection(message);
    };

    const handleTapMessage = (message: MessageSelected) => {
        if (isSelecting) {
            if (markedSelectedMessages.some(selected => selected.messageId === message.messageId)) {
                handleRemoveMessageSelection(message);
            } else {
                handleAddMessageSelection(message);
            }
        }
        else {
            handleSelectTaggedMessageScrolling(message.messageId);
        }
    };

    const clearSelection = () => {
        setMarkedSelectedMessages([]);
        setIsSelecting(false);
    };

    useEffect(() => {
        if (markedSelectedMessages.length === 0 && isSelecting) {
            clearSelection();
        }
    }, [markedSelectedMessages]);

    return {
        markedSelectedMessages,
        isSelecting,
        handleLongPressMessage,
        clearSelection,
        handleTapMessage
    };
};