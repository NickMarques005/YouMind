import { useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { MessageTemplate, Socket_AllUnmarkedMessage, Socket_MarkedMessages, Socket_FoundMessage } from 'types/chat/Chat_Types';
import { LoadingStructure } from 'types/loading/Loading_Types';

interface UseChatSocketHandlingProps {
    socket: Socket | null;
    fetchMessagesLoading: LoadingStructure;
    handleReceiveMessage: (data: { newMessage: MessageTemplate, tempId: string }) => void;
    handleUpdateMessageReadBy: ({ messageId, userId }: { messageId: string, userId: string }) => void;
    handleAddPreviousMessages: (data: MessageTemplate[]) => void;
    handleUpdateMarkedMessages: (data: Socket_MarkedMessages) => void;
    handleUpdateDeletedMessages: (data: string[]) => void;
    handleAddAllMessages: (data: MessageTemplate[]) => void;
    handleAddAllMarkedMessages: (data: MessageTemplate[]) => void;
    handleUpdateAllUnmarkedMessages: (data: Socket_AllUnmarkedMessage) => void;
    handleMessageFound: (data: Socket_FoundMessage) => void;
    increasePage: () => void;
    handlePage: (page: number) => void;
    setLimitMessagesReached: React.Dispatch<React.SetStateAction<boolean>>;
}

const useChatSocketHandling = ({
    socket,
    fetchMessagesLoading,
    handleReceiveMessage,
    handleUpdateMessageReadBy,
    handleAddPreviousMessages,
    handleUpdateDeletedMessages,
    handleUpdateMarkedMessages,
    handleAddAllMessages,
    handleAddAllMarkedMessages,
    handleUpdateAllUnmarkedMessages,
    handleMessageFound,
    increasePage,
    handlePage,
    setLimitMessagesReached
}: UseChatSocketHandlingProps) => {
    const handleSocket = useCallback(async (chatId: string) => {
        console.log("Entrando no chat:", chatId);
        console.log("Socket Chat: ", chatId);
        socket?.emit('joinRoom', { room: chatId });

        // Listener para nova mensagem recebida
        socket?.on('receiveMessage', (data: { newMessage: MessageTemplate, tempId: string }) => {
            console.log("Nova mensagem do SOCKET: ", data.newMessage);
            handleReceiveMessage(data);
        });

        // Listener para mensagens carregadas ao scrollar para cima
        socket?.on('messagesLoaded', (data: MessageTemplate[]) => {
            fetchMessagesLoading.setLoading(false);

            if (data.length === 0) {
                setLimitMessagesReached(true);
                return;
            }

            handleAddPreviousMessages(data);
            increasePage();
        });

        socket?.on('messagesDeleted', (deletedMessageIds: string[]) => {
            handleUpdateDeletedMessages(deletedMessageIds);
        });

        socket?.on('messagesMarked', (markedMessages: Socket_MarkedMessages) => {
            handleUpdateMarkedMessages(markedMessages);
        });

        socket?.on('markedMessagesLoaded', (data: MessageTemplate[]) => {
            handleAddAllMarkedMessages(data);
        });

        socket?.on('allMessagesUnmarked', (unmarkedMessages: Socket_AllUnmarkedMessage) => {
            handleUpdateAllUnmarkedMessages(unmarkedMessages);
        });

        socket?.on('messageFound', (data: Socket_FoundMessage) => {
            console.log("Mensagem encontrada!!");
            fetchMessagesLoading.setLoading(false);
            handleMessageFound(data);
            handlePage(data.page);
        });

        // Listener para atualizar o status de leitura das mensagens
        socket?.on('updateMessageStatus', ({ messageId, userId }: { messageId: string, userId: string }) => {
            handleUpdateMessageReadBy({ messageId, userId });
        });
        console.log("Conectado a sala de chat!");
    }, [socket, handleReceiveMessage, handleAddPreviousMessages, handleUpdateMessageReadBy, increasePage]);

    const removeSocketListeners = useCallback(() => {
        socket?.off('receiveMessage');
        socket?.off('messagesLoaded');
        socket?.off('messagesDeleted');
        socket?.off('messagesMarked');
        socket?.off('markedMessagesLoaded');
        socket?.off('allMessagesUnmarked');
        socket?.off('messageFound');
        socket?.off('updateMessageStatus');
    }, [socket]);

    return {
        handleSocket,
        removeSocketListeners,
    };
};

export default useChatSocketHandling;