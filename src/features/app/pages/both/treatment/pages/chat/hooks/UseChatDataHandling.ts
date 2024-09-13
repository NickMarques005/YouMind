import { UseSocket } from "@features/app/providers/bridge/SocketProvider";
import { UseTreatment } from "@features/app/providers/sub/TreatmentProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatUser, MessageTemplate } from "types/chat/Chat_Types";
import { UserData } from "types/user/User_Types";

interface UseGetMessagesProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    user?: UserData;
    chat?: ChatUser;
}

export const UseChatDataHandling = ({ setLoading, chat, user }: UseGetMessagesProps) => {
    const { socket } = UseSocket();
    const { decrementMessageNotRead } = UseTreatment();
    const [messages, setMessages] = useState<MessageTemplate[]>([]);
    const [page, setPage] = useState<number>(0);

    const handleAddNewMessage = useCallback((message: MessageTemplate) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
    }, []);

    const handleUpdateMessageReadBy = useCallback(({ messageId, userId }: { messageId: string, userId: string }) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg._id === messageId ? { ...msg, readBy: Array.from(new Set([...(msg.readBy || []), userId])) } : msg
            )
        );
    }, []);

    const handleReceiveMessage = useCallback(({ newMessage, tempId }: {newMessage: MessageTemplate, tempId: string }) => {
        setMessages((prevMessages) =>
            prevMessages.some((msg) => msg._id === tempId)
                ? prevMessages.map((msg) => (msg._id === tempId ? newMessage : msg))
                : [newMessage, ...prevMessages]
        );
    }, []);

    const handleAddPreviousMessages = useCallback((data: MessageTemplate[]) => {
        setMessages((prevMessages) => {
            const newMessagesSet = new Set(prevMessages.map((msg) => msg._id));
            return [...prevMessages, ...data.filter((msg) => !newMessagesSet.has(msg._id))];
        });
    }, []);

    const handleAddAllMessages = useCallback((data: MessageTemplate[]) => {
        setMessages(data);
    }, []);

    const handleSocket = async (chatId: string) => {
        console.log("Socket Chat: ", chatId);
        socket?.emit('joinRoom', { room: chatId });

        socket?.on('receiveMessage', (data: { newMessage: MessageTemplate, tempId: string }) => {
            console.log("Nova mensagem do SOCKET: ", data.newMessage);
            handleReceiveMessage(data);
        });

        socket?.on('messagesLoaded', (data: MessageTemplate[]) => {
            if (data.length === 0) {
                return;
            }

            handleAddPreviousMessages(data);
            increasePage();
        });

        socket?.on('updateMessageStatus', ({ messageId, userId }) => {
            handleUpdateMessageReadBy({ messageId, userId });
        });
    }

    const increasePage = () => {
        setPage(prevPage => prevPage + 1);
    }

    const getMessages = async (conversationId: string, page: number) => {
        console.log("Page: ", page);
        socket?.emit('getMessages', { conversationId, page });
    }

    const handleReadMessage = (message: MessageTemplate, user?: UserData) => {
        if (user && !message.readBy?.includes(user._id)) {
            socket?.emit('messageRead', { message, userId: user._id });
            chat && chat._id && decrementMessageNotRead(chat._id);
        }
    }

    const handleStartChat = async (chatId: string) => {
        setLoading(true);
        try {
            await handleSocket(chatId);
            await getMessages(chatId, page);
        }
        catch (err) {
            const error = err as Error;
            console.log("Houve um erro ao entrar na conversa: ", error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (chat && chat._id) {
            console.log("Chat: ", chat);
            handleStartChat(chat._id);
        }

        return () => {
            console.log("Removendo chat: ", chat);
            socket?.emit('leaveRoom', { room: chat?._id });
            socket?.off('receiveMessage');
            socket?.off('messagesLoaded');
            socket?.off('messageRead');
            socket?.off('updateMessageStatus');
            setPage(0);
            setMessages([]);
        }
    }, [user?.email, chat]);

    return {
        socket, messages, getMessages, page,
        handleReadMessage, handleAddAllMessages,
        handleAddNewMessage, handleAddPreviousMessages
    }
}