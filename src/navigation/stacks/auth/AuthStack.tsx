import React from 'react'
import { Stack } from '@navigation/Stack';
import Login from '@features/auth/login/Login';
import OTP from '@features/auth/otp/Otp';
import ChooseUser from '@features/auth/choose_user/ChooseUser';
import Register from '@features/auth/register/Register';


function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='choose_type'
            screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 450 }}
        >
            <Stack.Screen name="choose_type" component={ChooseUser} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="otp" component={OTP} />
        </Stack.Navigator>
    )
}

export default AuthStack;