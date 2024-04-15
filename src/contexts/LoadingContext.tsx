import { LoadingState, LoadingAction } from "../types/loading/Loading_Types";
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface LoadingContextType {
    isLoading: LoadingState;
    setLoading: (action: LoadingAction, value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<LoadingState>({
        login: false,
        register: false,
        logout: false,
        otpValidation: false
    });

    const setLoading = (action: LoadingAction, value: boolean): void => {
        setIsLoading(prev => ({ ...prev, [action]: value }));
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const UseLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('UseLoading precisa ser usado dentro do Provider Loading');
    }
    return context;
};


