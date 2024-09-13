import React from 'react';
import { View } from 'react-native';
import { UserType } from 'types/user/User_Types';
import { TreatmentStatusScreenName } from 'types/treatment/Status_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import PatientStatusContent from './patient/components/PatientStatusContent';
import DoctorStatusContent from './doctor/components/DoctorStatusContent';

interface StatusContentProps {
    userType: UserType;
    handleStatusNavigation?: (screenName: TreatmentStatusScreenName) => void;
    patientTreatment?: TreatmentInfoTemplate;
    doctorCurrentTreatments?: TreatmentInfoTemplate[];
    doctorEndedTreatments?: TreatmentInfoTemplate[];
}

const StatusContent = ({
    userType,
    handleStatusNavigation,
    patientTreatment,
    doctorCurrentTreatments,
    doctorEndedTreatments
}: StatusContentProps) => {

    return (
        <View style={{ flex: 1 }}>
            {
                userType === 'patient' ?
                    <PatientStatusContent
                        treatment={patientTreatment}
                    /> :
                    <DoctorStatusContent
                        handleStatusNavigation={handleStatusNavigation}
                        currentTreatments={doctorCurrentTreatments}
                        endedTreatments={doctorEndedTreatments}
                    />
            }
        </View>
    );
};

export default StatusContent;