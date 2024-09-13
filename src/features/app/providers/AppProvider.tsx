import { TreatmentProvider } from '@features/app/providers/sub/TreatmentProvider';
import { UserProvider } from '@features/app/providers/sub/UserProvider';
import React from 'react';
import { DefaultProviderProps } from 'types/providers/Provider_Types';
import { ResponseProvider } from './sub/ResponseProvider';
import { NotificationProvider } from '../reducers/NotificationReducer';
import { AudioPlayerProvider } from './sub/AudioPlayerProvider';
import { NoticeProvider } from './sub/NoticeProvider';
import { TreatmentEndedProvider } from '@features/app/providers/sub/TreatmentEndedProvider';
import { SearchProvider } from './sub/SearchProvider';

const AppProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (

        <ResponseProvider>
            <NoticeProvider>
                <NotificationProvider>
                    <UserProvider>
                        <TreatmentProvider>
                            <TreatmentEndedProvider>
                                <SearchProvider>
                                    <AudioPlayerProvider>
                                        {children}
                                    </AudioPlayerProvider>
                                </SearchProvider>
                            </TreatmentEndedProvider>
                        </TreatmentProvider>
                    </UserProvider>
                </NotificationProvider>
            </NoticeProvider>
        </ResponseProvider>
    );
};

export default AppProvider;