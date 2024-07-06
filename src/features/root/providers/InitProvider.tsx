import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InitContextData {
    Init: boolean;
    HandleInitStatus: (disabled?: boolean) => void;
}

const InitContext = createContext<InitContextData | undefined>(undefined);

interface InitProviderProps {
    children: ReactNode;
}

export const InitProvider: React.FC<InitProviderProps> = ({ children }) => {
    const [Init, setInit] = useState(false);

    const CheckInitEnable = async () => {
        try {
            const value = await AsyncStorage.getItem('@initAlreadySet');
            return value === 'true';
        } catch (error) {
            console.error('Erro ao acessar o AsyncStorage:', error);
            return false;
        }
    };

    const HandleInitStatus = async (disabled?: boolean) => {
        try {
            if (disabled) {
                await AsyncStorage.setItem('@initAlreadySet', String(true));
            }
            setInit(true);
        } catch (error) {
            console.error('Erro ao definir o valor no AsyncStorage:', error);
            return;
        }
    };

    useEffect(() => {
        const initializeInit = async () => {
            const isInitDisabled = await CheckInitEnable();

            console.log("Init habilitado: ", isInitDisabled)
            setInit(isInitDisabled);
        };
        initializeInit();
    }, []);

    return (
        <InitContext.Provider value={{ Init, HandleInitStatus }}>
            {children}
        </InitContext.Provider>
    );
};

export const UseInit = (): InitContextData => {
    const context = useContext(InitContext);
    if (!context) {
        throw new Error('Context deve ser usado dentro do Provider! (UseInit)');
    }
    return context;
};

