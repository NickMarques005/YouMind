import React from 'react';
import { NotepadProvider } from '@features/app/providers/doctor/NotepadProvider';
import { DefaultProviderProps } from 'types/providers/Provider_Types';
import { PatientHistoryProvider } from './doctor/PatientHistoryProvider';
import { LatestMedicationProvider } from './doctor/LatestMedicationProvider';
import { LatestQuestionnaireProvider } from './doctor/LatestQuestionnaireProvider';
import { PatientProgressProvider } from './doctor/PatientProgressProvider';
import { CurrentNoteProvider } from './doctor/CurrentNoteProvider';

const DoctorProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <PatientHistoryProvider>
            <LatestMedicationProvider>
                <LatestQuestionnaireProvider>
                    <PatientProgressProvider>
                        <NotepadProvider>
                            <CurrentNoteProvider>
                                {children}
                            </CurrentNoteProvider>
                        </NotepadProvider>
                    </PatientProgressProvider>
                </LatestQuestionnaireProvider>
            </LatestMedicationProvider>
        </PatientHistoryProvider>
    );
};

export default DoctorProvider;