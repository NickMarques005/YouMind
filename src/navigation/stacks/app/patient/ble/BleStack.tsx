import React from 'react';
import { Stack } from '@navigation/Stack';
import MainBle from '@features/app/pages/patient/pages/ble/components/main/MainBle';
import CurrentDevice from '@features/app/pages/patient/pages/ble/components/current_device/CurrentDevice';

const BleStack = () => {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main_ble' screenOptions={{ headerShown: false, animation: 'flip' }}>
                    <Stack.Screen name="main_ble" component={MainBle} />
                    <Stack.Screen name="device_data" component={CurrentDevice} />
                </Stack.Navigator>
            }
        </>
    );
};

export default BleStack;