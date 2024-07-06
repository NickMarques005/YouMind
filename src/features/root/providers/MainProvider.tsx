import React, { ReactNode } from 'react';
import { EventProvider } from './EventProvider';
import { InitProvider } from './InitProvider';
import { RootProvider } from './RootProvider';
import { DefaultProviderProps } from '../../../types/providers/Provider_Types';
import { AuthProvider } from '@features/root/providers/AuthenticationProvider';
import { PushTokenProvider } from './PushTokenProvider';


const MainProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <EventProvider>
            <InitProvider>
                <PushTokenProvider>
                    <AuthProvider>
                        <RootProvider>
                            {children}
                        </RootProvider>
                    </AuthProvider>
                </PushTokenProvider>
            </InitProvider>
        </EventProvider>
    );
}

export default MainProvider;