import React, { ReactNode } from 'react';
import { BluetoothProvider } from '@features/app/providers/patient/BluetoothProvider';
import { CurrentDateProvider } from '@providers/CurrentDateProvider';
import { QuestionnaireProvider } from './patient/QuestionariesProvider';
import { DefaultProviderProps } from 'types/providers/Provider_Types';
import { HealthPageProvider } from './patient/HealthProvider';
import { MedicationProvider } from './patient/MedicationProvider';
import { MedicationPendingProvider } from './patient/MedicationPendingProvider';
import { CurrentMedicationProvider } from './patient/CurrentMedicationProvider';
import { QuestionPerformanceProvider } from './patient/QuestionPerformanceProvider';

const PatientProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <BluetoothProvider>
            <HealthPageProvider>
                <CurrentDateProvider>
                    <MedicationProvider>
                        <MedicationPendingProvider>
                            <CurrentMedicationProvider>
                                <QuestionnaireProvider>
                                    <QuestionPerformanceProvider>
                                        {children}
                                    </QuestionPerformanceProvider>
                                </QuestionnaireProvider>
                            </CurrentMedicationProvider>
                        </MedicationPendingProvider>
                    </MedicationProvider>
                </CurrentDateProvider>
            </HealthPageProvider>
        </BluetoothProvider>
    );
};

export default PatientProvider;