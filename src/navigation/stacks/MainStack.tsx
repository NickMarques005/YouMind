import React from 'react';
import LeaveModal from '@components/leave/LeaveModal';
import AppSession from '@features/app/AppSession';
import AuthSession from '@features/auth/AuthSession';
import InitSession from '@features/init/InitSession';
import AppProvider from '@features/app/providers/AppProvider';
import { MainStackProps } from 'types/navigation/StackProp_Types';
import { Stack } from '@navigation/Stack';
import LoadingScreen from '@components/loading/LoadingScreen';

export default function MainStack({ user, Init, LeaveModalVisible, HandleLeaveDecision, loading }: MainStackProps) {

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!Init && !loading ? (
                    <Stack.Screen name="init" component={InitSession} />
                )
                    :
                    loading
                        ?
                        <Stack.Screen name="loading" component={LoadingScreen} />
                        :
                        user ? (
                            <Stack.Screen name="main_app" options={{ animation: 'fade_from_bottom' }}>
                                {() => (
                                    <AppProvider>
                                        <AppSession />
                                    </AppProvider>
                                )}
                            </Stack.Screen>
                        ) :
                            (
                                <Stack.Screen name="auth" component={AuthSession} />
                            )}
            </Stack.Navigator>
            <LeaveModal
                visible={LeaveModalVisible}
                onConfirm={() => HandleLeaveDecision(true)}
                onCancel={() => HandleLeaveDecision(false)}
            />
        </>
    )
}