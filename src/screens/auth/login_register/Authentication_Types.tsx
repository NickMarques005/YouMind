import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { UseAuth } from '../../../features/root/providers/AuthenticationProvider';
import UserLogin from '../../../components/authentication/login_register/UserLogin';
import RegisterScreen from './register/RegisterScreen';

function Authentication_Types() {
    const {isLogin} = UseAuth();

    return (
        <>
            {
                isLogin ?
                    <UserLogin/>
                    :
                    <RegisterScreen />
            }
        </>
    )
}

export default Authentication_Types;