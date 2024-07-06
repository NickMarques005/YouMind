import React from 'react'
import { View } from 'react-native';
import { UseAuth } from '../../../../features/root/providers/AuthenticationProvider';
import PatientRegister from '../../../../components/authentication/login_register/PatientRegister';
import DoctorRegister from '../../../../components/authentication/login_register/DoctorRegister';


function RegisterScreen() {
    const { userType } = UseAuth();

    return (
        <>
            {
                userType == 'patient' ?
                    <PatientRegister />
                    : userType == 'doctor' ?
                        <DoctorRegister />
                        : ""
            }
        </>
    )
}

export default RegisterScreen;