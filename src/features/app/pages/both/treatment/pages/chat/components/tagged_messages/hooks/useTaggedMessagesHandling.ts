import { MessageSelected } from 'types/chat/Chat_Types';

interface UseTaggedMessagesHandlingParams {
    handleDeleteMessages: (selectedMessages: MessageSelected[]) => void;
    handleMarkMessages: (selectedMessages: MessageSelected[], isMarked: boolean) => void;
    clearSelection: () => void;
}

export const useTaggedMessagesHandling = ({
    handleDeleteMessages, handleMarkMessages, 
    clearSelection
}: UseTaggedMessagesHandlingParams) => {
    
    const deleteSelectedMessages = (selectedMessages: MessageSelected[]) => {
        handleDeleteMessages(selectedMessages);
        clearSelection();
    };

    const unmarkSelectedMarkedMessages = (selectedMessages: MessageSelected[], isMarked: boolean) => {
        handleMarkMessages(selectedMessages, isMarked);
        clearSelection();
    };

    return {
        deleteSelectedMessages,
        unmarkSelectedMarkedMessages
    };
};