import React from 'react'
import { View } from 'react-native';
import { UseAuth } from '../../../../contexts/AuthContext';
import PatientLogin from '../../../../components/authentication/login_register/PatientLogin';
import DoctorLogin from '../../../../components/authentication/login_register/DoctorLogin';

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