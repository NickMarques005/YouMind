import React, { ReactNode } from 'react';
import { NotepadProvider } from '@providers/NotepadProvider';
import { AnalysisProvider } from '@providers/AnalysisProvider';
import { DefaultProviderProps } from 'types/providers/Provider_Types';

const DoctorProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <NotepadProvider>
            <AnalysisProvider>
                {children}
            </AnalysisProvider>
        </NotepadProvider>
    );
};

export default DoctorProvider;