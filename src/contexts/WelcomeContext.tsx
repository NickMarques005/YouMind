import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WelcomeContextData {
    welcome: boolean;
    setWelcome: (value: boolean) => void;
}

const WelcomeContext = createContext<WelcomeContextData | undefined>(undefined);

interface WelcomeProviderProps {
    children: ReactNode;
}

export const WelcomeProvider: React.FC<WelcomeProviderProps> = ({children}) => {
    const [welcome, setWelcome] = useState(false);

    return (
        <WelcomeContext.Provider value={{welcome, setWelcome}}>
            {children}
        </WelcomeContext.Provider>
    );
};

export const UseWelcome = (): WelcomeContextData => {
    const context = useContext(WelcomeContext);
    if(!context){
        throw new Error('Context deve ser usado dentro do Provider! (UseWelcome)');
    }
    return context;
};

