import React from 'react';
import { NotepadProvider } from '@features/app/providers/doctor/NotepadProvider';
import { AnalysisProvider } from '@features/app/providers/doctor/AnalysisProvider';
import { DefaultProviderProps } from 'types/providers/Provider_Types';
import { PatientHistoryProvider } from './doctor/PatientHistoryProvider';
import { LatestMedicationProvider } from './doctor/LatestMedicationProvider';
import { LatestQuestionnaireProvider } from './doctor/LatestQuestionnaireProvider';

const DoctorProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <AnalysisProvider>
            <PatientHistoryProvider>
                <LatestMedicationProvider>
                    <LatestQuestionnaireProvider>
                        <NotepadProvider>
                            {children}
                        </NotepadProvider>
                    </LatestQuestionnaireProvider>
                </LatestMedicationProvider>
            </PatientHistoryProvider>
        </AnalysisProvider>
    );
};

export default DoctorProvider;