import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface RootContextType {
    notRoot: boolean;
    setNotRoot: React.Dispatch<React.SetStateAction<boolean>>;
}

const RootContext = createContext<RootContextType | undefined>(undefined);

type RootProviderProps = {
    children: ReactNode;
}

export const RootProvider: React.FC<RootProviderProps> = ({children}) => {
    const [notRoot, setNotRoot] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const handleLeaveApp = () => {
            const root = navigation.canGoBack();
            
            if(!root){
                setNotRoot(false);
            }

            return true;
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleLeaveApp
        );

        return () => backHandler.remove();

    }, []);

    return (
        <RootContext.Provider value={{notRoot, setNotRoot}}>
            {children}
        </RootContext.Provider>
    );
}
 
export const UseRoot = () => {
    const context = useContext(RootContext);
    if(!context)
    {
        throw new Error("Context precisa ser dentro do Provider! (UseRoot)");
    }
    return context;
}