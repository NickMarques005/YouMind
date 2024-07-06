import React from 'react'
import { View } from 'react-native';
import { UseAuth } from '../../../../features/root/providers/AuthenticationProvider';

function LoginScreen() {
    const { userType } = UseAuth();

    return (
        <>
            {
                userType == "patient" ?
                    <PatientLogin />
                    : userType == 'doctor' ?
                        <DoctorLogin />
                        : ""
            }
        </>
    )
}

export default LoginScreen;