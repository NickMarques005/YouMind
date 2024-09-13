import { UseSocket } from '@features/app/providers/bridge/SocketProvider';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { useChatMessage } from '@hooks/chat/useChatMessage';
import { useChatSocketEmitHandling } from '@hooks/chat/useChatSocketEmitHandling';
import useChatSocketHandling from '@hooks/chat/useChatSocketHandling';
import { useChatSocketListenersHandling } from '@hooks/chat/useChatSocketListenersHandling';
import { useNoteChatMessage } from '@hooks/chat/useNoteChatMessage';
import { useScrollMessage } from '@hooks/chat/useScrollMessage';
import { UseLoading } from '@hooks/loading/UseLoading';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { ChatUser, MentionedMessageTemplate, MessageSelected, MessageTemplate } from 'types/chat/Chat_Types';
import { LoadingStructure } from 'types/loading/Loading_Types';
import { UserData } from 'types/user/User_Types';
import { UseTreatment } from '../sub/TreatmentProvider';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

type ChatContextProps = {
    currentChat: ChatUser | null;
    setCurrentChat: (chat: ChatUser | null) => void;
    handleActivateCurrentChat: (newChat: ChatUser | null) => void
    messages: MessageTemplate[];
    currentMentionedMessage?: MentionedMessageTemplate;
    markedMessages: MessageTemplate[];
    page: number;
    chatLoading: LoadingStructure;
    fetchMessagesLoading: LoadingStructure;
    currentMessageScrollingId: string | undefined;
    currentChatNote: NoteTemplate | undefined
    handleAddNewMessage: (message: MessageTemplate) => void;
    handleReadMessage: (message: MessageTemplate, user?: UserData) => void;
    handleGetMessages: (page: number) => void;
    handleSendMessage: (newMessage: MessageTemplate) => void;
    handleDeleteMessages: (selectedMessages: MessageSelected[]) => void;
    handleMarkMessages: (selectedMessages: MessageSelected[], isMarked: boolean) => void;
    handleGetMarkedMessages: () => void;
    handleUnmarkAllMessages: () => void;
    handleLeaveChat: () => void;
    handleCurrentMentionedMessage: (selectedMessage: MessageSelected) => void;
    clearCurrentMentionedMessage: () => void;
    handleCurrentMessageScrolling: (id: string) => void;
    clearCurrentMessageScrolling: () => void;
    handleFindMessage: (messageId: string, page: number) => void;
    handleCurrentChatNote: (note: NoteTemplate) => void;
    clearCurrentChatNote: () => void;
};

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentChat, setCurrentChat] = useState<ChatUser | null>(null);
    const [chatRoom, setChatRoom] = useState(false);
    const chatLoading = UseLoading();
    const fetchMessagesLoading = UseLoading();
    const { socket } = UseSocket();
    const { userData } = UseForm();
    const { treatment_state } = UseTreatment();

    const {
        messages,
        markedMessages,
        page,
        limitMessagesReached,
        currentMentionedMessage,
        setMessages,
        setMarkedMessages,
        setPage,
        increasePage,
        handlePage,
        setLimitMessagesReached,
        handleCurrentMentionedMessage,
        clearCurrentMentionedMessage
    } = useChatMessage();

    const {
        currentChatNote,
        handleCurrentChatNote,
        clearCurrentChatNote
    } = useNoteChatMessage();

    const { currentMessageScrollingId, clearCurrentMessageScrolling,
        handleCurrentMessageScrolling } = useScrollMessage();

    const {
        handleReceiveMessage,
        handleUpdateMessageReadBy,
        handleAddPreviousMessages,
        handleAddAllMessages,
        handleAddNewMessage,
        handleUpdateDeletedMessages,
        handleUpdateMarkedMessages,
        handleAddAllMarkedMessages,
        handleUpdateAllUnmarkedMessages,
        handleMessageFound
    } = useChatSocketListenersHandling({ setMessages, setMarkedMessages });

    const {
        handleReadMessage,
        handleGetMessages,
        handleSendMessage,
        handleDeleteMessages,
        handleMarkMessages,
        handleGetMarkedMessages,
        handleUnmarkAllMessages,
        handleFindMessage
    } = useChatSocketEmitHandling({ socket, currentChat, fetchMessagesLoading, limitMessagesReached });

    const { handleSocket, removeSocketListeners } = useChatSocketHandling({
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
    });

    const handleActivateCurrentChat = (newChat: ChatUser | null) => {
        console.log("Current chat: ", newChat);
        setCurrentChat(newChat);
    }

    const handleStartChat = async (chatId: string) => {
        chatLoading.setLoading(true);
        try {
            await handleSocket(chatId);
            setChatRoom(true);
            handleGetMessages(page);
            handleGetMarkedMessages();
        }
        catch (err) {
            const error = err as Error;
            console.log("Houve um erro ao entrar na conversa: ", error);
        }
        finally {
            chatLoading.setLoading(false);
        }
    }

    const handleLeaveChat = () => {
        if (currentChat?._id) {
            console.log("### Saída do chat! ###");
            //Sair da sala socket
            socket?.emit('leaveRoom', { room: currentChat._id });

            // Remover listeners
            removeSocketListeners();

            //limpar chat atual
            setCurrentChat(null);
            setPage(0);
            setMessages([]);
            setLimitMessagesReached(false);
            clearCurrentMentionedMessage();
            setChatRoom(false);
        }
    };

    const updateChatOnlineStatus = (treatments: TreatmentInfoTemplate[]) => {

        const hasCurrentChat = treatments.find(treatment => treatment.uid === currentChat?.uid);
        if (hasCurrentChat) {
            if (currentChat) {
                
                    const updatedCurrentChat = { ...currentChat, online: hasCurrentChat.online };
                    setCurrentChat(updatedCurrentChat);
                
            }
        }
    }

    // Monitorando mudanças no currentChat
    useEffect(() => {
        if (currentChat?._id && !chatRoom) {
            handleStartChat(currentChat._id);
        }

        return () => {
            if(chatRoom)
            {
                console.log("Return leaving chat");
                handleLeaveChat();
            }
        };
    }, [currentChat?._id, socket, userData?.email]);

    useEffect(() => {
        updateChatOnlineStatus(treatment_state.treatments);
    }, [treatment_state.treatments]);

    return (
        <ChatContext.Provider value={{
            currentChat, setCurrentChat,
            handleActivateCurrentChat,
            messages, markedMessages,
            page, currentMentionedMessage,
            chatLoading,
            fetchMessagesLoading,
            currentMessageScrollingId,
            currentChatNote,
            handleAddNewMessage,
            handleReadMessage,
            handleDeleteMessages,
            handleMarkMessages,
            handleSendMessage,
            handleGetMessages,
            handleGetMarkedMessages,
            handleUnmarkAllMessages,
            handleLeaveChat,
            handleCurrentMentionedMessage,
            clearCurrentMentionedMessage,
            clearCurrentMessageScrolling,
            handleCurrentMessageScrolling,
            handleFindMessage,
            handleCurrentChatNote,
            clearCurrentChatNote
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const UseChat = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error('Contexto precisa ser dentro do Provider! (UseChat)');
    }

    return context;
};