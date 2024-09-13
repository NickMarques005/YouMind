import React from 'react';
import { BridgeStackProps } from 'types/navigation/StackProp_Types';
import AppStack from '../app/AppStack';
import PriorityStack from '../priority/PriorityStack';
import { Stack } from '@navigation/Stack';
import LoadingScreen from '@components/loading/LoadingScreen';
import RedirectModalManager from '@features/app/bridge/redirect_manager/RedirectModalManager';

const BridgeStack = ({ type }: BridgeStackProps) => {

    return (
        <Stack.Navigator initialRouteName={'loading'} screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
            <Stack.Screen name="loading">
                {() => <LoadingScreen />}
            </Stack.Screen>
            <Stack.Screen name="app">
                {() =>
                    <>
                        <AppStack type={type} />
                        <RedirectModalManager />
                    </>
                }
            </Stack.Screen>
            <Stack.Screen name="priority" >
                {() => <PriorityStack type={type} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default BridgeStack;