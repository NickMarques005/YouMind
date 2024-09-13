import { useCallback } from "react";
import { MessageTemplate, Socket_AllUnmarkedMessage, Socket_MarkedMessages, Socket_FoundMessage } from "types/chat/Chat_Types";

interface UseChatSocketListenersHandlingParams {
    setMessages: React.Dispatch<React.SetStateAction<MessageTemplate[]>>;
    setMarkedMessages: React.Dispatch<React.SetStateAction<MessageTemplate[]>>;
}

export const useChatSocketListenersHandling = ({
    setMessages,
    setMarkedMessages
}: UseChatSocketListenersHandlingParams) => {

    //Função para adicionar nova mensagem
    const handleAddNewMessage = useCallback((message: MessageTemplate) => {
        
        setMessages((prevMessages) => {
            return [message, ...prevMessages]
        });
    }, []);

    //Função para atualizar a mensagem visualizada
    const handleUpdateMessageReadBy = useCallback(({ messageId, userId }: { messageId: string, userId: string }) => {
        setMessages((prevMessages) => {
            // Encontre o índice da mensagem que precisa ser atualizada
            const messageIndex = prevMessages.findIndex((msg) => msg._id === messageId);
    
            // Se a mensagem não foi encontrada ou já foi lida por esse usuário, retorne o estado anterior
            if (messageIndex === -1 || prevMessages[messageIndex].readBy?.includes(userId)) {
                return prevMessages;
            }
    
            // Crie uma nova mensagem com o usuário adicionado ao campo readBy
            const updatedMessage = {
                ...prevMessages[messageIndex],
                readBy: [...(prevMessages[messageIndex].readBy || []), userId],
            };
    
            // Retorne um novo array de mensagens, atualizando apenas a mensagem necessária
            return [
                ...prevMessages.slice(0, messageIndex),  // Mensagens antes da que foi atualizada
                updatedMessage,                          // Mensagem atualizada
                ...prevMessages.slice(messageIndex + 1), // Mensagens após a que foi atualizada
            ];
        });
    }, []);

    //Função para receber mensagem de outro usuário no chat
    const handleReceiveMessage = useCallback(({ newMessage, tempId }: { newMessage: MessageTemplate, tempId: string }) => {
        console.log("TEMP ID: ", tempId);
        setMessages((prevMessages) => {
            const messageIdSet = new Set(prevMessages.map((msg) => msg._id));
            return messageIdSet.has(tempId)
                ? prevMessages.map((msg) => (msg._id === tempId ? newMessage : msg))
                : [newMessage, ...prevMessages];
        });
    }, []);

    //Função para adicionar mensagens anteriores
    const handleAddPreviousMessages = useCallback((data: MessageTemplate[]) => {
        setMessages((prevMessages) => {
            const messageMap = new Map(prevMessages.map((msg) => [msg._id, msg]));
            data.forEach((msg) => {
                if (!messageMap.has(msg._id)) {
                    messageMap.set(msg._id, msg);
                }
            });
            return Array.from(messageMap.values());
        });
    }, []);

    //Função para adicionar as mensagens do chat
    const handleAddAllMessages = useCallback((data: MessageTemplate[]) => {
        setMessages(data);
    }, []);

    //Função para marcar mensagens do chat
    const handleUpdateMarkedMessages = useCallback((data: Socket_MarkedMessages) => {
        if (!data.messages || data.messages.length === 0) return;

        setMessages((prevMessages) => {
            return prevMessages.map((msg) => {
                const updatedMessage = data.messages.find((updatedMsg) => updatedMsg._id === msg._id);
                return updatedMessage ? { ...msg, isMarked: updatedMessage.isMarked } : msg;
            });
        });

        setMarkedMessages((prevMarkedMessages) => {
            if (data.isMarked) {

                const newMarkedMessages = data.messages.filter((msg) => msg.isMarked);

                const mergedMarkedMessages = [
                    ...prevMarkedMessages,
                    ...newMarkedMessages.filter(
                        (newMsg) => !prevMarkedMessages.some((markedMsg) => markedMsg._id === newMsg._id)
                    )
                ];

                return mergedMarkedMessages;
            } else {
                return prevMarkedMessages.filter(
                    (msg) => !data.messages.some((updatedMsg) => updatedMsg._id === msg._id)
                );
            }
        });

        console.log("Mensagens atualizadas como marcadas/desmarcadas.");
    }, []);

    //Função para atualizar mensagens que foram excluidas
    const handleUpdateDeletedMessages = useCallback((data: string[]) => {
        console.log("Atualização da remoção das mensagens: ", data);
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                data.includes(msg._id) ? { ...msg, isRemoved: true } : msg
            )
        );

        setMarkedMessages((prevMarkedMessages) =>
            prevMarkedMessages.filter((msg) => !data.includes(msg._id))
        );
        console.log("Mensagens marcadas como removidas.");
    }, []);

    const handleAddAllMarkedMessages = useCallback((data: MessageTemplate[]) => {
        setMarkedMessages(data);
    }, []);

    //Função para atualizar todas as mensagens que foram desmarcadas
    const handleUpdateAllUnmarkedMessages = useCallback((data: Socket_AllUnmarkedMessage) => {
        const messageIdSet = new Set(data.messageIds);
        setMarkedMessages([]);
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                messageIdSet.has(msg._id) ? { ...msg, isMarked: data.isMarked } : msg
            )
        );
    }, []);

    const handleMessageFound = useCallback((data: Socket_FoundMessage) => {
        handleAddPreviousMessages(data.messages);
        console.log("Novas mensagens adicionadas: ", data.messages.length);
        console.log("> Mensagem para scrollar: ", data.foundMessageId);
    }, []);


    return {
        handleAddNewMessage,
        handleAddAllMessages,
        handleAddPreviousMessages,
        handleReceiveMessage,
        handleUpdateMessageReadBy,
        handleUpdateMarkedMessages,
        handleAddAllMarkedMessages,
        handleUpdateAllUnmarkedMessages,
        handleUpdateDeletedMessages,
        handleMessageFound
    }
}