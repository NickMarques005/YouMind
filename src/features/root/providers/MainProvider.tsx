import React, { ReactNode } from 'react';
import { EventProvider } from '../../../providers/EventProvider';
import { InitProvider } from '../../../providers/InitProvider';
import { AuthProvider } from '../../../providers/AuthenticationProvider';
import { RootProvider } from '../../../providers/RootProvider';
import { DefaultProviderProps } from '../../../types/providers/Provider_Types';

const MainProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <EventProvider>
            <InitProvider>
                <AuthProvider>
                    <RootProvider>
                        {children}
                    </RootProvider>
                </AuthProvider>
            </InitProvider>
        </EventProvider>
    );
}

export default MainProvider;