import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Medication } from 'types/app/patient/health/Medicine_Types';
import { UseMedications } from '@features/app/providers/patient/MedicationProvider';
import { useCurrentMedicationAlert } from '@features/app/pages/patient/pages/home/hooks/UseCurrentMedication';

interface CurrentMedicationContextType {
    nextMedication: Medication | null;
    alertText: string;
}

const CurrentMedicationContext = createContext<CurrentMedicationContextType | undefined>(undefined);

export const useCurrentMedication = () => {
    const context = useContext(CurrentMedicationContext);
    if (!context) {
        throw new Error('useCurrentMedication deve ser usado dentro de um CurrentMedicationProvider');
    }
    return context;
};

type CurrentMedicationProviderProps = {
    children: ReactNode;
};

export const CurrentMedicationProvider = ({ children }: CurrentMedicationProviderProps) => {
    const { medications } = UseMedications();
    const { calculateNextDose } = useCurrentMedicationAlert();
    const [nextMedication, setNextMedication] = useState<Medication | null>(null);
    const [alertText, setAlertText] = useState<string>('');

    const updateNextMedication = () => {
        if (medications.length > 0) {
            const now = new Date();
            const upcomingDoses = medications
                .map(medication => ({ medication, nextDose: calculateNextDose(medication, now) }))
                .filter(({ nextDose }) => nextDose)
                .sort((a, b) => a.nextDose!.getTime() - b.nextDose!.getTime());

            if (upcomingDoses.length > 0) {
                const { medication, nextDose } = upcomingDoses[0];
                setNextMedication(medication);
                const nowTime = now.getTime();
                const nextDoseTime = nextDose!.getTime();
                const timeDifference = nextDoseTime - nowTime;

                const oneDay = 24 * 60 * 60 * 1000;
                if (timeDifference < oneDay) {
                    if (now.getDate() === nextDose!.getDate()) {
                        setAlertText(`Hoje às ${nextDose!.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
                    } else {
                        setAlertText(`Amanhã às ${nextDose!.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
                    }
                } else {
                    setAlertText(`Em ${nextDose!.toLocaleDateString()} às ${nextDose!.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
                }
            }
            else{
                setNextMedication(null);
                setAlertText('');
            }
        }
        else{
            setNextMedication(null);
                setAlertText('');
        }
    };

    useEffect(() => {
        updateNextMedication();

        const interval = setInterval(() => {
            updateNextMedication();
        }, 60000);

        return () => clearInterval(interval);
    }, [medications]);

    return (
        <CurrentMedicationContext.Provider value={{ nextMedication, alertText }}>
            {children}
        </CurrentMedicationContext.Provider>
    );
};