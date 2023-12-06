import React, { createContext, useState, useContext, ReactNode } from 'react';

export type User = {
    name: string;
    email: string;
};

export type CurrentChat = {
    members: User[];
};

type ChatContextProps = {
    currentChat: CurrentChat | null;
    setCurrentChat: (chat: CurrentChat) => void;
};

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);

    return (
        <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
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