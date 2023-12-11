import React, { createContext, useContext, useState, ReactNode } from 'react';

export type MenuTypes = 'homeScreen' | 'profileScreen' | 'treatmentScreen' | 'analysisScreen' | 'notepadScreen' | 'healthScreen' | 'bluetoothScreen';

type MenuContextType = {
    selectedMenuOption: MenuTypes;
    handleMenuOptionPress: (option: MenuTypes) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuContextProviderProps {
    children: ReactNode;
};

export const MenuProvider: React.FC<MenuContextProviderProps> = ({ children }) => {
    const [selectedMenuOption, setSelectedMenuOption] = useState<MenuTypes>('homeScreen');

    const handleMenuOptionPress = (option: MenuTypes) => {
        setSelectedMenuOption(option);
    }

    return (
        <MenuContext.Provider value={{ selectedMenuOption, handleMenuOptionPress }}>
            {children}
        </MenuContext.Provider>
    );
}

export const UseMenu = () => {
    const context = useContext(MenuContext);
    if(!context)
    {
        throw new Error("Context precisa ser usado dentro de Provider! (UseMenu)");
    }
    return context;
}