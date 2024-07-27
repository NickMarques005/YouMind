import React from 'react';
import { NotepadProvider } from '@features/app/providers/doctor/NotepadProvider';
import { DefaultProviderProps } from 'types/providers/Provider_Types';
import { PatientHistoryProvider } from './doctor/PatientHistoryProvider';
import { LatestMedicationProvider } from './doctor/LatestMedicationProvider';
import { LatestQuestionnaireProvider } from './doctor/LatestQuestionnaireProvider';
import { PatientProgressProvider } from './doctor/PatientProgressProvider';

const DoctorProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <PatientHistoryProvider>
            <LatestMedicationProvider>
                <LatestQuestionnaireProvider>
                    <PatientProgressProvider>
                        <NotepadProvider>
                            {children}
                        </NotepadProvider>
                    </PatientProgressProvider>
                </LatestQuestionnaireProvider>
            </LatestMedicationProvider>
        </PatientHistoryProvider>
    );
};

export default DoctorProvider;