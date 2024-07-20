import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notice, NoticeType } from 'types/notice/Notice_Types';
import { UserData } from 'types/user/User_Types';

interface NoticeContextType {
    selectedNotice: Notice | null;
    handleSelectedNotice: (notice: Notice) => void
    handleClearSelectedNotice: () => void;
}

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export const NoticeProvider: React.FC<{ children: React.ReactNode; userData?: UserData }> = ({ children, userData }) => {
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    const handleClearSelectedNotice = () => {
        setSelectedNotice(null);
    };

    const handleSelectedNotice = (notice: Notice) => {
        setSelectedNotice(notice);
    }

    return (
        <NoticeContext.Provider
            value={{
                selectedNotice,
                handleSelectedNotice,
                handleClearSelectedNotice
            }}
        >
            {children}
        </NoticeContext.Provider>
    );
};

export const useNotice = (): NoticeContextType => {
    const context = useContext(NoticeContext);
    if (context === undefined) {
        throw new Error('Contexto precisa ser utilizado dentro do provider (UseNotice)');
    }
    return context;
};