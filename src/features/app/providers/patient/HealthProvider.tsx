import React, { createContext, useContext, ReactNode, useState } from 'react';

export type HealthPage = 'Call' | 'Questionários' | 'Medicamentos';

interface HealthPageContextProps {
    currentHealthPage: HealthPage;
    handleCurrentHealthPage: (page: HealthPage) => void;
}

const HealthPageContext = createContext<HealthPageContextProps | undefined>(undefined);

interface HealthPageProviderProps {
    children: ReactNode;
}

export const HealthPageProvider: React.FC<HealthPageProviderProps> = ({ children }) => {
    const [currentHealthPage, setCurrentHealthPage] = useState<HealthPage>('Medicamentos');

    const handleCurrentHealthPage = (page: HealthPage) => {
        setCurrentHealthPage(page);
    }

    return (
        <HealthPageContext.Provider value={{ currentHealthPage, handleCurrentHealthPage }}>
            {children}
        </HealthPageContext.Provider>
    );
};

export const UseHealthPage = () => {
    const context = useContext(HealthPageContext);
    if(!context) {
        throw new Error("Context precisa ser dentro de Provider!");
    }
    return context;
}

