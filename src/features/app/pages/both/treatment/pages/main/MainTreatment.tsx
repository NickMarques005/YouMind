import { View, Text } from 'react-native'
import React from 'react'
import { UseForm } from '@features/app/providers/sub/UserProvider'
import DoctorTreatment from './components/doctor/DoctorTreatment';
import PatientTreatment from './components/patient/PatientTreatment';

const MainTreatment = () => {
    
    const { userData } = UseForm();

    return (
        <>
        {
            userData ?
            userData.type === 'doctor' ? 
                <DoctorTreatment userType={userData?.type} userData={userData} />
                :
                <PatientTreatment userType={userData?.type} userData={userData} />
            : ""
        }
        </>
    )
}

export default MainTreatment;