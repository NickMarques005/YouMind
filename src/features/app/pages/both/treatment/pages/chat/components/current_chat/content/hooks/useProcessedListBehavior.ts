
import { UseChat } from "@features/app/providers/bridge/ChatProvider";
import { responsiveSize } from "@utils/layout/Screen_Size";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { ProcessedMessageItem } from "types/chat/Chat_Types";

interface UseProcessedListBehaviorParams {
    currentMessageScrollingId?: string;
    processedMessages: ProcessedMessageItem[];
    flatListRef: React.RefObject<FlatList<any>>;
    clearCurrentMessageScrollingId: () => void;

}

export const useProcessedListBehavior = ({
    currentMessageScrollingId, processedMessages,
    flatListRef, clearCurrentMessageScrollingId
}: UseProcessedListBehaviorParams) => {
    const { handleFindMessage, page } = UseChat();

    const scrollMessageOffset = responsiveSize * 0.2;
    const scrollToMessage = (messageId: string) => {
        const messageIndex = processedMessages.findIndex((item) => item.type === 'message' && item.data._id === messageId);
        console.log("Message Index: ", messageIndex);
        if (messageIndex !== -1 && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: messageIndex, animated: true, viewOffset: scrollMessageOffset })
        }
    };

    const scrollToIndexFailed = (error: { index: number; averageItemLength: number }) => {
        if (flatListRef.current) {
            const offset = error.averageItemLength * error.index;
            flatListRef.current.scrollToOffset({ offset, animated: true });
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({ 
                    index: error.index, 
                    animated: true, 
                    viewOffset: scrollMessageOffset 
                });
            }, 100);
        }
    };

    const handleSelectedMessageScrolling = (messageId: string) => {
        console.log(messageId);
        const messageIndex = processedMessages.findIndex((item) => item.type === 'message' && item.data._id === messageId);
        if (messageIndex === -1) {
            console.log("\n####Mensagem não está no array!!! Buscar mensagem... #####\n");
            handleFindMessage(messageId, page);
        }
        else {
            scrollToMessage(messageId);
            clearCurrentMessageScrollingId();
        }
    }

    useEffect(() => {
        if (currentMessageScrollingId) {
            handleSelectedMessageScrolling(currentMessageScrollingId);
        }
    }, [currentMessageScrollingId, processedMessages]);

    return {
        scrollToIndexFailed
    }
}