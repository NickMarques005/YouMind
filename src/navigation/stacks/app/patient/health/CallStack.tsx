import React from 'react';
import { Stack } from '@navigation/Stack';
import Call from '@features/app/pages/patient/pages/health/components/call/Call';

const CallStack = () => {

    return (
        <>
            {
                <Stack.Navigator initialRouteName='main_call' screenOptions={{ headerShown: false, animation: 'flip' }}>
                    <Stack.Screen name="main_call" component={Call} />
                </Stack.Navigator>
            }
        </>
    );
};

export default CallStack;