import React from 'react';
import { Stack } from '@navigation/Stack';
import Welcome from '@features/init/pages/welcome/Welcome';
import Explanation from '@features/init/pages/explanation/Explanation';

export const InitStack = () => {
    return (
        <Stack.Navigator initialRouteName='welcome' 
        screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 500 }}>
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="explanation" component={Explanation} />
        </Stack.Navigator>
    );
};
