import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InitContextData {
    Init: boolean;
    setInit: (value: boolean) => void;
}

const InitContext = createContext<InitContextData | undefined>(undefined);

interface InitProviderProps {
    children: ReactNode;
}

export const InitProvider: React.FC<InitProviderProps> = ({children}) => {
    const [Init, setInit] = useState(false);

    return (
        <InitContext.Provider value={{Init, setInit}}>
            {children}
        </InitContext.Provider>
    );
};

export const UseInit = (): InitContextData => {
    const context = useContext(InitContext);
    if(!context){
        throw new Error('Context deve ser usado dentro do Provider! (UseInit)');
    }
    return context;
};

