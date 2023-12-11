import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Treatment } from './TreatmentContext';

export type User = {
    name: string;
    email: string;
};

export type CurrentChat = {
    members: User[];
};

type ChatContextProps = {
    currentChat: CurrentChat | null;
    setCurrentChat: (chat: CurrentChat | null) => void;
    redirectChat: Treatment | null;
    handleRedirectChat: (value: Treatment | null) => void;

};

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
    const [redirectChat, setRedirectChat] = useState<Treatment | null>(null);

    const handleRedirectChat = (value: Treatment | null) => {
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