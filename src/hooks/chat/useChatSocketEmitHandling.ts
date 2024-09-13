import { UseTreatment } from '@features/app/providers/sub/TreatmentProvider';
import { useCallback } from 'react';
import { ChatUser, MessageSelected, MessageTemplate } from 'types/chat/Chat_Types';
import { LoadingStructure } from 'types/loading/Loading_Types';
import { UserData } from 'types/user/User_Types';

interface UseChatSocketEmitHandlingParams {
    socket: any;
    currentChat: ChatUser | null;
    fetchMessagesLoading: LoadingStructure;
    limitMessagesReached: boolean;
}

export const useChatSocketEmitHandling = ({
    socket,
    currentChat,
    fetchMessagesLoading,
    limitMessagesReached
}: UseChatSocketEmitHandlingParams) => {
    const { decrementMessageNotRead } = UseTreatment();

    // Função para emitir que a mensagem foi lida
    const handleReadMessage = useCallback((message: MessageTemplate, user?: UserData) => {
        if (socket && currentChat?._id) {
            if (user && !message.readBy?.includes(user._id)) {
                socket?.emit('messageRead', { message, userId: user._id });
                currentChat._id && decrementMessageNotRead(currentChat._id);
            }
        }
    }, [socket, currentChat?._id]);

    // Função para buscar as mensagens do chat atual
    const handleGetMessages = useCallback((page: number) => {
        if (socket &&  currentChat?._id) {
            if(limitMessagesReached || fetchMessagesLoading.loading){ 
                return;
            };
            
            fetchMessagesLoading.setLoading(true);
            socket.emit('getMessages', { conversationId: currentChat._id, page });
        }
    }, [socket,  currentChat?._id, limitMessagesReached, fetchMessagesLoading.loading]);

    //Funçao para enviar mensagem
    const handleSendMessage = (newMessage: MessageTemplate) => {
        if(socket && currentChat?._id){
            socket?.emit("sendMessage", newMessage);
        }
    }

    //Função para remover mensagems
    const handleDeleteMessages = (selectedMessages: MessageSelected[]) => {
        if(socket && currentChat?._id) {
            const messageIds = selectedMessages.map(message => message.messageId);
            socket?.emit("deleteMessages", { conversationId: currentChat._id, messageIds });
        }
    }

    //Função para marcar mensagens
    const handleMarkMessages = (selectedMessages: MessageSelected[], isMarked: boolean) => {
        if(socket && currentChat?._id){
            const messageIds = selectedMessages.map(message => message.messageId);
            socket?.emit('markMessages', { conversationId: currentChat._id, messageIds, isMarked });
        }
    }

    //Função para buscar todas as mensagens marcadas
    const handleGetMarkedMessages = () => {
        if(socket && currentChat?._id){
            socket?.emit('getMarkedMessages', { conversationId: currentChat._id });
        }
    }

    const handleUnmarkAllMessages = () => {
        if(socket && currentChat?._id){
            socket?.emit('unmarkAllMessages', { conversationId: currentChat._id })
        }
    }

    const handleFindMessage = useCallback((messageId: string, page: number) => {
        if (socket && currentChat?._id) {
            socket.emit('findMessage', { conversationId: currentChat._id, messageId, page });
        }
    }, [socket, currentChat?._id]);

    return {
        handleReadMessage,
        handleGetMessages,
        handleSendMessage,
        handleDeleteMessages,
        handleMarkMessages,
        handleGetMarkedMessages,
        handleUnmarkAllMessages,
        handleFindMessage
    };
};