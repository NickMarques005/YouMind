import { ChatProvider } from '@providers/ChatProvider';
import { NotificationProvider } from '@providers/NotificationProvider';
import { TreatmentProvider } from '@providers/TreatmentProvider';
import { UserProvider } from '@providers/UserProvider';
import React, { ReactNode } from 'react';
import { DefaultProviderProps } from 'types/providers/Provider_Types';

const AppProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <NotificationProvider>
            <UserProvider>
                <TreatmentProvider>
                    <ChatProvider>
                        {children}
                    </ChatProvider>
                </TreatmentProvider>
            </UserProvider>
        </NotificationProvider>
    );
};

export default AppProvider;