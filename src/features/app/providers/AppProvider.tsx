import { ChatProvider } from '@providers/ChatProvider';
import { TreatmentProvider } from '@providers/TreatmentProvider';
import { UserProvider } from '@features/app/providers/sub/UserProvider';
import React from 'react';
import { DefaultProviderProps } from 'types/providers/Provider_Types';
import { ResponseProvider } from './sub/ResponseProvider';
import { NotificationProvider } from '../reducers/NotificationReducer';
import { SocketProvider } from './sub/SocketProvider';
import { AudioPlayerProvider } from './sub/AudioPlayerProvider';
import { NoticeProvider } from './sub/NoticeProvider';

const AppProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (

        <ResponseProvider>
            <NoticeProvider>
                <NotificationProvider>
                    <UserProvider>
                        <SocketProvider>
                            <TreatmentProvider>
                                <ChatProvider>
                                    <AudioPlayerProvider>
                                        {children}
                                    </AudioPlayerProvider>
                                </ChatProvider>
                            </TreatmentProvider>
                        </SocketProvider>
                    </UserProvider>
                </NotificationProvider>
            </NoticeProvider>
        </ResponseProvider>
    );
};

export default AppProvider;