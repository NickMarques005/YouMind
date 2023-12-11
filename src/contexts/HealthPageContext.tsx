import React, { createContext, useContext, ReactNode, useState } from 'react';

interface HealthPageContextProps {
    currentHealthPage: string;
    handleCurrentHealthPage: (page: string) => void;
}

const HealthPageContext = createContext<HealthPageContextProps | undefined>(undefined);

interface HealthPageProviderProps {
    children: ReactNode;
}

export const HealthPageProvider: React.FC<HealthPageProviderProps> = ({ children }) => {
    const [currentHealthPage, setCurrentHealthPage] = useState('Medicamentos');

    const handleCurrentHealthPage = (page: string) => {
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

