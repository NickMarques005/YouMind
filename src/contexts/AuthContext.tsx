import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchData } from '../services/fetchUtils/APIUtils';
import USE_ENV from '../services/server_url/ServerUrl';
export interface AuthData {
    token: string;
    type: "patient" | "doctor" | undefined;
}

export interface AuthContextData {
    authData: AuthData;
    userType: 'patient' | 'doctor' | '';
    signIn: (token: string) => void;
    signOut: (type: string) => Promise<void>;
    handleUserType: (type: 'patient' | 'doctor' | undefined) => void;
    loading: boolean;
    isLogin: boolean;
    handleLogin: () => void;
    loadToken: () => void;
    updateAuthData: (data: any) => void;
}

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>({
    authData: {
        token: '',
        type: undefined,
    },
    userType: '',
    signIn: async () => { },
    signOut: async () => { },
    handleUserType: () => { },
    loading: true,
    isLogin: true,
    handleLogin: () => { },
    loadToken: () => { },
    updateAuthData: () => { }
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authData, setAuth] = useState<AuthData>({
        token: '',
        type: undefined,
    });
    const [userType, setUserType] = useState<'patient' | 'doctor' | ''>('');
    const [isLogin, setLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    const loadFromStorage = async () => {
        const authToken = await AsyncStorage.getItem('@AuthData');

        try {
            if (authToken) {
                const authData = {
                    token: JSON.parse(authToken),
                    type: undefined,
                }
                setAuth(authData);
                console.log("Usuário autenticado");
                console.log("USER: ", authToken);
            }
            else {
                console.log("Usuário não autenticado");
            }

            setLoading(false);
        }
        catch (err) {
            console.log("Token vazio. Usuário não autenticado!");
            setLoading(false);
        }
    }

    const loadToken = () => {
        loadFromStorage();
    }

    const signIn = (token: string) => {

        const authData = {
            token: token,
            type: undefined
        }

        console.log(authData);

        setAuth(authData);
        AsyncStorage.setItem("@AuthData", JSON.stringify(token));
    }

    const signOut = async (type: string): Promise<void> => {
        const { fullApiServerUrl } = USE_ENV();
        const requestData = {
            method: 'POST',
            url: 'logoutUser',
            data: {
                type: type
            }
        }

        const logoutResponse = await FetchData(requestData, authData.token, fullApiServerUrl);

        if (logoutResponse.success) {
            AsyncStorage.removeItem("@AuthData");
            setAuth({
                token: '',
                type: undefined,
            });

            console.log(`Usuário deslogado com sucesso!`);
        }
        else{
            console.error('Houve um erro ao deslogar usuário: ', logoutResponse.errors);
        }
        return;
    }

    const handleUserType = (type: 'patient' | 'doctor' | undefined) => {
        if (!type) {
            return;
        }
        setUserType(type);
        console.log("TIPO DE USUÁRIO ATUAL: ", type);
    }

    const handleLogin = () => {
        setLogin(!isLogin);
        console.log("LOGIN!");
    };

    const updateAuthData = (data: any) => {
        setAuth(data);
    };

    return (
        <AuthContext.Provider value={({ authData, updateAuthData, userType, handleUserType, signIn, signOut, loading, isLogin, handleLogin, loadToken })}>
            {children}
        </AuthContext.Provider>
    )
};

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Context deve ser usado dentro do Provider! (UseAuth)');
    }
    return context;
}