import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserData, UserDoctor, UserPatient } from '../../../../types/user/User_Types';

interface UserContextData {
    userData: UserData | undefined;
    UpdateUserData: (data: UserData | undefined) => void;
    UpdateSpecificDataInUser: (newData: Partial<UserDoctor> | Partial<UserPatient>) => void;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [userData, setUserData] = useState<UserData | undefined>(undefined);

    const UpdateUserData = (data: UserData | undefined) => {
        setUserData(data);
    };

    const UpdateSpecificDataInUser = (newData: Partial<UserDoctor> | Partial<UserPatient>) => {
        console.log("Atualizar dados em userData: ", newData);
        setUserData(currentData => {
            return { ...currentData, ...newData } as UserData;
        });
    };

    return (
        <UserContext.Provider value={{userData, UpdateUserData, UpdateSpecificDataInUser }}>
            {children}
        </UserContext.Provider>
    )
};

export const UseForm = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('Context precisa ser dentro do Provider! (UseForm)')
    }
    return context;
}