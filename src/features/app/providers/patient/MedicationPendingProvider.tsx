import React, { createContext, useState, useContext, useEffect } from 'react';
import { Vibration } from 'react-native';
import { MedicationPending } from 'types/app/patient/health/Medicine_Types';

interface MedicationPendingContextType {
    medicationPending: MedicationPending | undefined;
    handleMedicationPending: (medicationPending: MedicationPending) => void;
    clearMedicationPending: () => void;
}

interface MedicationPendingProviderProps {
    children: React.ReactNode;
}


const MedicationPendingContext = createContext<MedicationPendingContextType | undefined>(undefined);

export const MedicationPendingProvider: React.FC<MedicationPendingProviderProps> = ({ children }) => {
    const [medicationPending, setMedicationPending] = useState<MedicationPending | undefined>(undefined);

    const clearMedicationPending = () => {
        setMedicationPending(undefined);
    }

    const handleMedicationPending = (medicationPending: MedicationPending) => {
        setMedicationPending(medicationPending);
    }

    return (
        <MedicationPendingContext.Provider value={{ medicationPending, handleMedicationPending, clearMedicationPending }}>
            {children}
        </MedicationPendingContext.Provider>
    );
};

export const useMedicationPending = () => {
    const context = useContext(MedicationPendingContext);
    if (!context) {
        throw new Error('Context precisa ser utilizado dentro do provider (MedicationPendingProvider)');
    }
    return context;
};