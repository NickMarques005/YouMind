import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from 'types/user/User_Types';
import { User, onAuthStateChanged } from 'firebase/auth';
import { AppState } from 'react-native';
import { FIREBASE_AUTH } from '../../../__firebase__/FirebaseConfig';
import { FB_Logout } from '../../../__firebase__/services/FirebaseAuthServices';
import { UseAuthService } from '@hooks/api/UseAuthService';
import { UsePushToken } from './PushTokenProvider';
import { ExpoPushToken } from 'expo-notifications';
import { UseForm } from '@features/app/providers/sub/UserProvider';

export interface AuthContextData {
    uid: string | null;
    userType: UserType;
    signIn: (user: User) => void;
    handleUserType: (type: 'patient' | 'doctor' | undefined) => void;
    loading: boolean;
    handleLoading: (value: boolean) => void;
    saveRememberMe: (rememberMe: boolean) => void;
    checkRememberMe: () => void;
    signOut: () => void;
}

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>({
    uid: null,
    userType: undefined,
    signIn: async () => { },
    handleUserType: () => { },
    loading: true,
    handleLoading: () => { },
    saveRememberMe: () => { },
    checkRememberMe: () => { },
    signOut: async () => { }

});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [uid, setUid] = useState<string | null>(null);
    const [appState, setAppState] = useState(AppState.currentState);
    const [userType, setUserType] = useState<UserType>(undefined);
    const [loading, setLoading] = useState(true);
    const { performLogout } = UseAuthService(setLoading);
    const { pushToken } = UsePushToken();

    const handleLoading = (value: boolean) => {
        console.log("LOADING: ", value);
        setLoading(value);
    }

    const saveRememberMe = async (rememberMe: boolean) => {
        try {
            await AsyncStorage.setItem('@rememberMe', rememberMe.toString());
        }
        catch (err) {
            console.log("Erro ao salvar estado remember me: ", err);
        }
    }

    const checkRememberMe = async () => {
        try {
            const rememberMe = await AsyncStorage.getItem('@rememberMe');
            if (rememberMe === 'true') {
                return true;
            }
        }
        catch (err) {
            console.log("Erro ao checar rememberMe: ", err);
            return false;
        }
    }

    const signIn = (user: User | null) => {
        console.log("(AuthContext) Usuário: ", user);
        setUid(user ? user.uid : null);
    }

    const signOut = async () => {

        const response = await performLogout(pushToken);
        try {
            if (!response.success) {
                console.log("Logout falhou: ", response);
                console.log(response);
            }
            await FB_Logout();
            await AsyncStorage.removeItem('@rememberMe');
            setUid(null);
            setUserType(undefined);
            console.log("Deslogado!!!");

        } catch (err) {
            console.log("Erro Logout: ", err);
            return response;
        }
    };

    const handleUserType = (type: UserType) => {
        if (!type) {
            return;
        }
        setUserType(type);
        console.log("(AuthContext) TIPO DE USUÁRIO ATUAL: ", type);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log("(Use Auth) FIREBASE ALTERAÇÃO DE AUTENTICAÇÃO!!");
            if (user) {
                signIn(user);
            } 
            handleLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={({ uid, userType, handleUserType, signIn, signOut, loading, handleLoading, saveRememberMe, checkRememberMe })}>
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