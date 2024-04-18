import React, { ReactNode } from 'react';
import { BluetoothProvider } from '@providers/BluetoothProvider';
import { CurrentDateProvider } from '@providers/CurrentDateProvider';
import { MedicineProvider } from '@providers/MedicineProvider';
import { QuestionaireProvider } from '@providers/QuestionariesProvider';
import { DefaultProviderProps } from 'types/providers/Provider_Types';

const PatientProvider: React.FC<DefaultProviderProps> = ({ children }) => {
    return (
        <BluetoothProvider>
            <CurrentDateProvider>
                <MedicineProvider>
                    <QuestionaireProvider>
                        {children}
                    </QuestionaireProvider>
                </MedicineProvider>
            </CurrentDateProvider>
        </BluetoothProvider>
    );
};

export default PatientProvider;