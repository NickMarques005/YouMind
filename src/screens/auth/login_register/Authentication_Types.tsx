import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { UseAuth } from '../../../contexts/AuthContext';
import LoginScreen from './login/LoginScreen';
import RegisterScreen from './register/RegisterScreen';

function Authentication_Types() {
    const {isLogin} = UseAuth();

    return (
        <>
            {
                isLogin ?
                    <LoginScreen />
                    :
                    <RegisterScreen />
            }
        </>
    )
}

export default Authentication_Types;