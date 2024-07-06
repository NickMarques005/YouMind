import React from 'react'
import { Stack } from '@navigation/Stack';
import Login from '@features/auth/pages/login/Login';
import OTP from '@features/auth/pages/otp/Otp';
import ChooseUser from '@features/auth/pages/choose_user/ChooseUser';
import Register from '@features/auth/pages/register/Register';


function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='choose_type'
            screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 550 }}
        >
            <Stack.Screen name="choose_type" component={ChooseUser} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="otp" component={OTP} />
        </Stack.Navigator>
    )
}

export default AuthStack;