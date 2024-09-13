import React from 'react';
import { PriorityProvider } from './PriorityProvider';
import { RedirectProvider } from './RedirectProvider';
import { SocketProvider } from './SocketProvider';
import { ChatProvider } from './ChatProvider';

export const BridgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PriorityProvider>
            <RedirectProvider>
                <SocketProvider>
                    <ChatProvider>
                        {children}
                    </ChatProvider>
                </SocketProvider>
            </RedirectProvider>
        </PriorityProvider>
    );
};