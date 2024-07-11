import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CurrentChat } from 'types/chat/Chat_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

type ChatContextProps = {
    currentChat: CurrentChat | null;
    setCurrentChat: (chat: CurrentChat | null) => void;
    redirectChat: TreatmentInfoTemplate | null;
    handleRedirectChat: (value: TreatmentInfoTemplate | null) => void;
};

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
    const [redirectChat, setRedirectChat] = useState<TreatmentInfoTemplate | null>(null);

    const handleRedirectChat = (value: TreatmentInfoTemplate | null) => {
        console.log("Redirect chat: ", value);
        setRedirectChat(value);
    }

    return (
        <ChatContext.Provider value={{ currentChat, setCurrentChat, redirectChat, handleRedirectChat }}>
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