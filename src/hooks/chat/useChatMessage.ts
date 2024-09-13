import { useCallback, useEffect, useState } from 'react';
import { MentionedMessageTemplate, MessageSelected, MessageTemplate } from 'types/chat/Chat_Types';

export const useChatMessage = () => {
    const [messages, setMessages] = useState<MessageTemplate[]>([]);
    const [markedMessages, setMarkedMessages] = useState<MessageTemplate[]>([]);
    const [limitMessagesReached, setLimitMessagesReached] = useState<boolean>(false);
    const [currentMentionedMessage, setCurrentMentionedMessage] = useState<MentionedMessageTemplate | undefined>(undefined);
    const [page, setPage] = useState<number>(0);

    const increasePage = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, []);

    const handlePage = useCallback((page: number) => {
        setPage(page);
    }, []);

    const handleCurrentMentionedMessage = (selectedMessage: MessageSelected) => {
        const mentionedMessage: MentionedMessageTemplate = {
            content: selectedMessage.content,
            _id: selectedMessage.messageId,
            senderId: selectedMessage.senderId,
            senderName: selectedMessage.senderName,
            senderType: selectedMessage.senderType,
            hasAudio: selectedMessage.hasAudio
        }
        console.log("Mentioned message template: ", mentionedMessage);
        setCurrentMentionedMessage(mentionedMessage);
    }
    
    const clearCurrentMentionedMessage = () => {
        setCurrentMentionedMessage(undefined);
    }

    useEffect(() => {
        console.log("MENSAGEM MENCIONADA:::: ", currentMentionedMessage);
    }, [currentMentionedMessage]);

    useEffect(() => {
        console.log("Pagina atualizada: ", page);
    }, [page])

    return {
        messages,
        page,
        limitMessagesReached,
        markedMessages,
        currentMentionedMessage,
        handleCurrentMentionedMessage,
        clearCurrentMentionedMessage,
        setMessages,
        setMarkedMessages,
        setPage,
        increasePage,
        handlePage,
        setLimitMessagesReached
    };
};