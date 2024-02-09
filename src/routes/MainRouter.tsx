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
import WithLoader from '../components/hoc/withLoader';
import LoadingMainScreen from '../components/loading/LoadingMainScreen';
import { FormProvider } from '../contexts/FormContext';
import { TreatmentProvider } from '../contexts/TreatmentContext';
import MainApp from './MainApp';
import { ChatProvider } from '../contexts/ChatContext';
import { MenuProvider } from '../contexts/MenuContext';

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
    const { authData, loading } = UseAuth();

    useEffect(() => {
        if (!notRoot) {
            setShowLeaveModal(true);
        }
    }, [notRoot]);


    return (
        <>
            {
                !welcome ?
                    <WelcomeStack />
                    :
                    loading ?
                        <LoadingMainScreen />
                        :
                        authData.token ?
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