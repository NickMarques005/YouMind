import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PatientAnalysis {
    photo: string;
    name: string;
    email: string;
    current_health_state: number;
    medicines: {
        total_medicines: number;
        current_medicines: number;
    },
    questionaires: {
        total_questionaires: number;
        current_questionaires: number;
    }
}

interface AnalysisContextProps {
    analysisData: PatientAnalysis[];
    setAnalysisData: React.Dispatch<React.SetStateAction<PatientAnalysis[]>>;
}

const AnalysisContext = createContext<AnalysisContextProps | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [analysisData, setAnalysisData] = useState<PatientAnalysis[]>([]);

    return (
        <AnalysisContext.Provider value={{ analysisData, setAnalysisData }}>
            {children}
        </AnalysisContext.Provider>
    );
};

export const useAnalysis = () => {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error('useAnalysis must be used within an AnalysisProvider');
    }
    return context;
};