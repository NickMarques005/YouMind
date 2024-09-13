import { MessageSelected } from "types/chat/Chat_Types";

interface UseMessageHandlingParams {
    handleDeleteMessages: (selectedMessages: MessageSelected[]) => void;
    handleMarkMessages: (selectedMessages: MessageSelected[], isMarked: boolean) => void;
    handleCurrentMentionedMessage: (selectedMessage: MessageSelected) => void;
    clearSelection: () => void;
}

export const useMessageHandling = ({ 
    handleDeleteMessages, handleMarkMessages,
    handleCurrentMentionedMessage,
    clearSelection
}: UseMessageHandlingParams) => {

    const deleteSelectedMessages = (selectedMessages: MessageSelected[]) => {
        handleDeleteMessages(selectedMessages);
        clearSelection();
    }

    const markSelectedMessages = (selectedMessages: MessageSelected[], isMarked: boolean) => {
        handleMarkMessages(selectedMessages, isMarked);
        clearSelection();
    }

    const replySelectedMessage = (selectedMessage: MessageSelected) => {
        handleCurrentMentionedMessage(selectedMessage);
        clearSelection();
    }

    return { 
        deleteSelectedMessages,
        markSelectedMessages,
        replySelectedMessage
    };
}