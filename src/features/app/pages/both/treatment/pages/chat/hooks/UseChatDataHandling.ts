import USE_ENV from "@api/constants/server_url/ServerUrl";
import UseSocketService from "@api/socket/SocketService";
import { UseSocket } from "@features/app/providers/sub/SocketProvider";
import { UseChatService } from "@hooks/api/UseChatService";
import { useEffect, useRef, useState } from "react";
import { ChatUser, MessageTemplate } from "types/chat/Chat_Types";
import { UserData } from "types/user/User_Types";

interface UseGetMessagesProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    user?: UserData;
    member?: ChatUser;
}

export const UseChatDataHandling = ({ setLoading, member, user }: UseGetMessagesProps) => {
    const { performGetConversationTreatment } = UseChatService(setLoading);
    const { socket } = UseSocket();
    const [messages, setMessages] = useState<MessageTemplate[]>([]);
    const [conversation, setConversation] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);

    const conversationRef = useRef(conversation);
    conversationRef.current = conversation;

    const handleSocket = async (conversationId: string) => {
        console.log("Socket Conversation");
        socket?.emit('joinRoom', {room: conversationId});

        socket?.on('receiveMessage', (data: MessageTemplate) => {
            console.log("Nova mensagem do SOCKET: ", data);
            console.log("NOVA MENSAGEM: ", data);
            console.log("MENSAGENS: ", messages);
            setMessages((prevMessages) => [data, ...prevMessages]);
        });

        socket?.on('messagesLoaded', (data: MessageTemplate[]) => {
            console.log("Mensagens buscadas: ", data);
            if (data.length === 0) {
                return;
            }

            setMessages(prevMessages => {
                const newMessagesSet = new Set(prevMessages.map(msg => msg._id));
                return [...prevMessages, ...data.filter(msg => !newMessagesSet.has(msg._id))];
            }
            );
            increasePage();
        });

        socket?.on('updateMessageStatus', ({ messageId, userId }) => {
            setMessages(prevMessages => prevMessages.map(msg =>
                msg._id === messageId ? { ...msg, readBy: Array.from(new Set([...(msg.readBy || []), userId])) } : msg
            ));
        });
    }

    const increasePage = () => {
        setPage(prevPage => prevPage + 1);
    }

    const getMessages = async (conversationId: string, page: number) => {
        console.log("Get Messages");
        console.log("Page: ", page);
        socket?.emit('getMessages', { conversationId, page });
    }

    const handleReadMessage = (message: MessageTemplate, user?: UserData) => {
        if (user && !message.readBy?.includes(user._id)) {
            socket?.emit('messageRead', { message, userId: user._id });
        }
    }

    const fetchChatData = async () => {

        try {
            const response = await performGetConversationTreatment({ email_1: user?.email, email_2: member?.email });
            if (response.success) {
                console.log("ID Conversation: ", response.data);
                const conversationId = response.data as string;
                console.log(conversationId);
                await handleSocket(conversationId);
                setConversation(conversationId);
            }
            else {
                console.log("Erro ao buscar dados de conversa: ", response);
            }
        }
        catch (err) {
            console.log("Deu erro ao buscar dados de conversa...", err);
        }
    }

    useEffect(() => {
        if (member) {
            fetchChatData();
        }

        return () => {
            console.log("Removendo conversationId: ", conversation);
            socket?.emit('leaveRoom', { room: conversationRef.current});
            socket?.off('receiveMessage');
            socket?.off('messagesLoaded');
            socket?.off('messageRead');
            socket?.off('updateMessageStatus');
            setConversation(null);
            setPage(0);
            setMessages([]);
        }
    }, [user?.email, member]);

    return { socket, messages, conversation, getMessages, page, handleReadMessage }
}