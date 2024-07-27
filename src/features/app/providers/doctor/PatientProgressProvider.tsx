import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PatientProgressState {
    missMedications: number;
    setMissMedications: React.Dispatch<React.SetStateAction<number>>;
    patientsProgress: number;
    setPatientsProgress: React.Dispatch<React.SetStateAction<number>>;
}

const PatientProgressContext = createContext<PatientProgressState | undefined>(undefined);

interface PatientProgressProviderProps {
    children: ReactNode;
}

export const PatientProgressProvider: React.FC<PatientProgressProviderProps> = ({ children }) => {
    const [missMedications, setMissMedications] = useState<number>(0);
    const [patientsProgress, setPatientsProgress] = useState<number>(0);

    return (
        <PatientProgressContext.Provider value={{ missMedications, setMissMedications, patientsProgress, setPatientsProgress }}>
            {children}
        </PatientProgressContext.Provider>
    );
};

export const usePatientProgress = () => {
    const context = useContext(PatientProgressContext);
    if (!context) {
        throw new Error('Context precisa ser dentro do provider! (usePatientProgress)');
    }
    return context;
};