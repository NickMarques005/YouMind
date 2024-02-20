import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchData } from '../services/fetchUtils/APIUtils';
import USE_ENV from '../services/server_url/ServerUrl';

export interface Token {
    token: string;
    exp: string;
}

export interface Tokens {
    accessToken: Token | undefined;
    refreshToken: Token | undefined;
}

export interface AuthData {
    accessToken: Token | undefined;
    refreshToken: Token | undefined;
    type: "patient" | "doctor" | undefined;
}

export interface AuthContextData {
    authData: AuthData;
    userType: 'patient' | 'doctor' | '';
    signIn: (accessToken: Token, refreshToken: Token) => void;
    signOut: (type: string) => Promise<void>;
    handleUserType: (type: 'patient' | 'doctor' | undefined) => void;
    loading: boolean;
    isLogin: boolean;
    handleLogin: () => void;
    loadToken: () => void;
    updateAuthData: (data: any) => void;
    saveTokenInAsyncStorage: (refreshToken: Token) => void;
    refreshAccessToken: () => void;
}

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>({
    authData: {
        accessToken: undefined,
        refreshToken: undefined,
        type: undefined,
    },
    userType: '',
    signIn: async () => { },
    saveTokenInAsyncStorage: async () => { },
    signOut: async () => { },
    handleUserType: () => { },
    loading: true,
    isLogin: true,
    handleLogin: () => { },
    loadToken: () => { },
    updateAuthData: () => { },
    refreshAccessToken: () => { }
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authData, setAuth] = useState<AuthData>({
        accessToken: undefined,
        refreshToken: undefined,
        type: undefined,
    });
    const [userType, setUserType] = useState<'patient' | 'doctor' | ''>('');
    const [isLogin, setLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    const refreshAccessToken = async () => {
        const { fullApiServerUrl } = USE_ENV();
        const refreshToken = authData.refreshToken?.token;

        if(!refreshToken)
        {
            console.log("Não há RefreshToken salvo");
            return;
        }

        const requestData = {
            method: 'POST',
            url: 'refreshToken',
            data: {
                refreshToken
            }
        };

        try{
            const response = await FetchData(requestData, refreshToken, fullApiServerUrl);
            if(response.success && response.data.accessToken)
            {
                setAuth(prevState => ({
                    ...prevState,
                    accessToken: response.data.accessToken,
                }));

                console.log("ACCESS TOKEN UPDATE: ", response.data.accessToken);
            }
            else {
                signOut(authData.type);
                setLogin(false);
            }
        }
        catch (err)
        {
            console.error("Erro ao atualizar o token: ", err);
            signOut(authData.type);
        }
    }

    const loadToken = async () => {
        const refreshTokenStored = await AsyncStorage.getItem('@AuthData');

        try {
            
            if (refreshTokenStored) {
                const refreshToken = JSON.parse(refreshTokenStored) as Token;
                setAuth(prevState => ({
                    ...prevState,
                    refreshToken: refreshToken
                }));
                console.log("Usuário já autenticado");
                console.log("USER REFRESH TOKEN: ", refreshToken.token);
                setLogin(true);
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

    const signIn = (accessToken: Token, refreshToken: Token) => {

        console.log("TOKENS SIGNIN: \nAccess: ", accessToken, "\nRefresh: ", refreshToken);

        setAuth(prevState => ({
            ...prevState,
            refreshToken,
            accessToken
        }));
    }

    const saveTokenInAsyncStorage = async (refreshToken: Token) => {
        const saveToken = await AsyncStorage.setItem("@AuthData", JSON.stringify(refreshToken));
        try {
            console.log("Token salvo em async storage!");
        }
        catch (err) {
            console.error("Houve um erro ao salvar token: ", err);
        }
    }

    const signOut = async (type: string | undefined): Promise<void> => {
        if(!type)
        {
            console.log("Houve algum erro! Tipo de usuário não especificado para deslogar");
            return;
        }
        
        const { fullApiServerUrl } = USE_ENV();
        const requestData = {
            method: 'POST',
            url: 'logoutUser',
            data: {
                type: type
            }
        }

        const logoutResponse = await FetchData(requestData, authData.accessToken?.token, fullApiServerUrl);

        if (logoutResponse.success) {
            AsyncStorage.removeItem("@AuthData");
            setAuth({
                refreshToken: undefined,
                accessToken: undefined,
                type: undefined,
            });
            setLogin(false);
            console.log(`Usuário deslogado com sucesso!`);
        }
        else {
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
        <AuthContext.Provider value={({ authData, updateAuthData, userType, handleUserType, signIn, signOut, saveTokenInAsyncStorage, loading, isLogin, handleLogin, loadToken, refreshAccessToken })}>
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