import React, { createContext, useState, useContext, useEffect } from 'react';
import { Vibration } from 'react-native';
import { MedicationPending } from 'types/app/patient/health/Medicine_Types';
import { usePriority } from '../bridge/PriorityProvider';
import { UseGlobalResponse } from '../sub/ResponseProvider';
import { useMedicationAlarm } from '@hooks/alert/useMedicationAlarm';
import { useMedicationTimer } from '@hooks/alert/useMedicationTimer';

interface MedicationPendingContextType {
    medicationPending: MedicationPending | undefined;
    handleMedicationPending: (medicationPending: MedicationPending) => void;
    clearMedicationPending: () => void;
    isConfirming: boolean;
    confirmed: boolean;
    declined: boolean;
    exit: boolean;
    setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
    setDeclined: React.Dispatch<React.SetStateAction<boolean>>;
    formattedTime: string;
    timeLeft: number | null;
    exitAlarmTime: React.MutableRefObject<number>;
}

interface MedicationPendingProviderProps {
    children: React.ReactNode;
}


const MedicationPendingContext = createContext<MedicationPendingContextType | undefined>(undefined);

export const MedicationPendingProvider: React.FC<MedicationPendingProviderProps> = ({ children }) => {
    const { HandleResponseAppSuccess } = UseGlobalResponse();
    const [medicationPending, setMedicationPending] = useState<MedicationPending | undefined>(undefined);
    const [isConfirming, setIsConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [exit, setExit] = useState(false);

    const clearMedicationPending = () => {
        setMedicationPending(undefined);
        if (isConfirming) setIsConfirming(false);
        if (confirmed) setConfirmed(false);
        if (declined) setDeclined(false);
    }

    const handleMedicationPending = (medicationPending: MedicationPending) => {
        setMedicationPending(medicationPending);
    }

    const { formattedTime, timeLeft } = useMedicationTimer({ medicationPending, confirmed, declined });

    const { exitAlarmTime } = useMedicationAlarm({
        medicationPending, confirmed, declined,
        isConfirming, clearMedicationPending, setDeclined, 
        HandleResponseAppSuccess, setExit, exit
    });

    return (
        <MedicationPendingContext.Provider value={{
            medicationPending, handleMedicationPending,
            isConfirming, setIsConfirming,
            confirmed, declined, exit,
            setConfirmed, setDeclined,
            clearMedicationPending,
            formattedTime, timeLeft,
            exitAlarmTime
        }}>
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