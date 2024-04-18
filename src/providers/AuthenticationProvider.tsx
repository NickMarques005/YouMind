import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Token, Tokens, AuthData } from '../types/auth/Auth_Types';


export interface AuthContextData {
    authData: AuthData;
    userType: 'patient' | 'doctor' | '';
    signIn: (accessToken: Token, refreshToken: Token) => void;
    signOut: () => void;
    handleUserType: (type: 'patient' | 'doctor' | undefined) => void;
    loading: boolean;
    isLogin: boolean;
    handleLogin: () => void;
    loadRefreshToken: () => Promise<boolean>;
    updateAuthData: (data: any) => void;
    saveTokenInAsyncStorage: (refreshToken: Token) => void;
    setAccessToken: (accessToken: Token) => void;
    handleAuthError: (error: string[]) => void;
    handleLoading: (value: boolean) => void;
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
    loadRefreshToken: async () => false,
    updateAuthData: () => { },
    setAccessToken: () => { },
    handleAuthError: () => { },
    handleLoading: () => { }
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

    const setAccessToken = async (accessToken: Token) => {
        
        setAuth(prevState => ({
            ...prevState,
            accessToken: accessToken,
        }));

        console.log("(AuthContext) ACCESS TOKEN UPDATE: ", accessToken);
        
    }

    const loadRefreshToken = async () => {
        const refreshTokenStored = await AsyncStorage.getItem('@AuthData');

        try {

            if (refreshTokenStored) {

                const refreshToken = JSON.parse(refreshTokenStored) as Token;

                if (!refreshToken.token) {
                    console.log("(AuthContext) Token não existe. Limpando refreshToken do storage...");
                    await AsyncStorage.removeItem('@AuthData');
                    setAuth({
                        accessToken: undefined,
                        refreshToken: undefined,
                        type: undefined,
                    });
                    return false;
                }
                setAuth(prevState => ({
                    ...prevState,
                    refreshToken: refreshToken
                }));
                console.log("(AuthContext) Usuário já autenticado");
                console.log("(AuthContext) USER REFRESH TOKEN: ", refreshToken.token);
                
                return true;
            }
            else {
                console.log("(AuthContext) Usuário não autenticado");
                return false;
            }
        }
        catch (err) {
            console.log("(AuthContext) Token vazio. Usuário não autenticado!");
            return false;
        }
    }

    const handleLoading = (value: boolean) => {
        console.log("LOADING: ", value);
        setLoading(value);
    }

    const signIn = (accessToken: Token, refreshToken: Token) => {

        console.log("(AuthContext) TOKENS SIGNIN: \nAccess: ", accessToken, "\nRefresh: ", refreshToken);

        setAuth(prevState => ({
            ...prevState,
            refreshToken,
            accessToken
        }));
    }

    const saveTokenInAsyncStorage = async (refreshToken: Token) => {
        const saveToken = await AsyncStorage.setItem("@AuthData", JSON.stringify(refreshToken));
        try {
            console.log("(AuthContext) Token salvo em async storage!");
        }
        catch (err) {
            console.error("(AuthContext) Houve um erro ao salvar token: ", err);
        }
    }

    const signOut = async () => {

        await AsyncStorage.removeItem("@AuthData");
        setAuth({
            refreshToken: undefined,
            accessToken: undefined,
            type: undefined,
        });
        setLogin(false);
    }

    const handleUserType = (type: 'patient' | 'doctor' | undefined) => {
        if (!type) {
            return;
        }
        setUserType(type);
        console.log("(AuthContext) TIPO DE USUÁRIO ATUAL: ", type);
    }

    const handleLogin = () => {
        setLogin(!isLogin);
        console.log("(AuthContext) LOGIN! ", isLogin);
    };

    const updateAuthData = (data: any) => {
        setAuth(data);
    };

    const handleAuthError = async (error: string[]) => {
        if (error.includes("Token inválido")) {
            console.log("(AuthContext) Erro de token inválido detectado. Realizando logout...");
            await signOut();
        }
    }

    return (
        <AuthContext.Provider value={({ authData, updateAuthData, userType, handleUserType, signIn, signOut, saveTokenInAsyncStorage, loading, isLogin, handleLogin, loadRefreshToken, setAccessToken, handleAuthError, handleLoading })}>
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