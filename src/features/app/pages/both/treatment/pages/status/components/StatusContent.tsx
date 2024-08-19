import React from 'react';
import { View } from 'react-native';
import PatientStatus from './patient/PatientStatus';
import DoctorStatus from './doctor/DoctorStatus';
import { UserType } from 'types/user/User_Types';

interface StatusContentProps {
    userType: UserType;
}

const StatusContent = ({ userType }: StatusContentProps) => {
    return (
        <View style={{ flex: 1 }}>
            {userType === 'patient' ? <PatientStatus /> : <DoctorStatus />}
        </View>
    );
};

export default StatusContent;