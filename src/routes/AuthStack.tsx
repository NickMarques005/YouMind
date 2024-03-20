import React from 'react'
import { Stack } from '../components/stack/Stack';
import ChooseUserTypeScreen from '../screens/auth/choose/ChooseUserTypeScreen';
import Authentication_Types from '../screens/auth/login_register/Authentication_Types';
import OTPScreen from '../screens/auth/login_register/otp/OTPScreen';


function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='choose_type' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="choose_type" component={ChooseUserTypeScreen}/>
            <Stack.Screen name="login_register" component={Authentication_Types}/> 
            <Stack.Screen name="otp" component={OTPScreen}/>
        </Stack.Navigator>
    )
}

export default AuthStack;