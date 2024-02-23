import React, { useState, useContext, useEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WelcomeStack } from './WelcomeStack';
import { NotificationProvider } from '../contexts/NotificationsContext';
import AuthStack from './AuthStack';
import { UseWelcome } from '../contexts/WelcomeContext';
import { UseAuth } from '../contexts/AuthContext';
import { BackHandler } from 'react-native';
import LeaveModal from '../components/leave/LeaveModal';
import { RootProvider, UseRoot } from '../contexts/RootContext';
import LoadingMainScreen from '../components/loading/LoadingMainScreen';
import { FormProvider } from '../contexts/FormContext';
import { TreatmentProvider } from '../contexts/TreatmentContext';
import MainApp from './MainApp';
import { ChatProvider } from '../contexts/ChatContext';
import { MenuProvider } from '../contexts/MenuContext';
import { UpdateAccessToken } from '../services/TokenService';
import { EventSubscriptionType, UseEvents } from '../contexts/EventContext';
import { UseEventHandlers } from '../hooks/EventHandlers';
import { EventTypes } from '../types/events/EventTypes';

type WelcomeStackNavigation = {
    explanation: undefined;
    welcome: undefined;
};

type AuthStackNavigation = {
    login_register: undefined;
    choose_type: undefined;
}

type AppStackNavigation = {
    mainPage: undefined;
    notifications: undefined;
}

type TreatmentStack = {
    mainTreatment: undefined;
    treatmentChat: undefined;
}

//Tipos de Stack:
export type WelcomeStackTypes = NativeStackNavigationProp<WelcomeStackNavigation>;
export type AuthStackTypes = NativeStackNavigationProp<AuthStackNavigation>;
export type AppStackTypes = NativeStackNavigationProp<AppStackNavigation>;

export type TreatmentStackTypes = NativeStackNavigationProp<TreatmentStack>;

export default function MainRouter() {
    const { welcome, setWelcome } = UseWelcome();
    const { notRoot, setNotRoot } = UseRoot();
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const { authData, loading, loadAccessToken, handleLoading } = UseAuth();

    const { UseEventSubscription, UseEventUnsubscription } = UseEvents();
    const { ErrorEvents } = UseEventHandlers();

    useEffect(() => {

        const errors: EventSubscriptionType[] = [
            { event: EventTypes.ErrorTypes.InvalidToken, handler: ErrorEvents.HandlerInvalidToken },
            { event: EventTypes.ErrorTypes.UnauthorizedUser, handler: ErrorEvents.HandlerUnauthorizedUser }
        ]

        console.log(errors);
        UseEventSubscription(errors);

        return () => {
            UseEventUnsubscription(errors);
        }

    }, []);

    useEffect(() => {
        //Sair do aplicativo
        if (!notRoot) {
            setShowLeaveModal(true);
        }
    }, [notRoot]);

    useEffect(() => {
        //Atualização do Access Token
        const TokenVerification = async () => {
            
            if (authData?.refreshToken && !authData?.accessToken) {
                console.log("(Main Router) UPDATE ACCESS TOKEN!!!");
                const newAccessToken = await UpdateAccessToken(authData.refreshToken);

                if (newAccessToken) {
                    loadAccessToken(newAccessToken);
                }
            }
        }

        TokenVerification();

    }, [authData]);


    return (
        <>
            {
                !welcome ?
                    <WelcomeStack />
                    :
                    loading ?
                        <LoadingMainScreen />
                        :
                        authData.accessToken ?
                            <NotificationProvider>
                                <MenuProvider>
                                    <TreatmentProvider>
                                        <FormProvider>
                                            <ChatProvider>
                                                {
                                                    <MainApp />
                                                }
                                            </ChatProvider>
                                        </FormProvider>
                                    </TreatmentProvider>
                                </MenuProvider>
                            </NotificationProvider>
                            : <AuthStack />
            }
            <LeaveModal
                visible={showLeaveModal}
                onConfirm={() => {
                    setShowLeaveModal(false);
                    setNotRoot(true);
                    BackHandler.exitApp();
                }}
                onCancel={() => {
                    setShowLeaveModal(false);
                    setNotRoot(true);
                }
                }
            />
        </>


    )
}