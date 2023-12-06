import React from 'react';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import Explanation from '../screens/welcome/Explanation';
import { Stack } from '../components/stack/Stack';

export const WelcomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='welcome' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="explanation" component={Explanation} />
        </Stack.Navigator>
    );
};
