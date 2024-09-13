import { UseForm } from '@features/app/providers/sub/UserProvider';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { UseTreatmentNavigation } from '../../hooks/UseTreatmentNavigation';
import { UserType } from 'types/user/User_Types';
import LinearGradient from 'react-native-linear-gradient';
import DoctorStatus from './components/doctor/DoctorStatus';
import PatientStatus from './components/patient/PatientStatus';
import { UseTreatment } from '@features/app/providers/sub/TreatmentProvider';
import { UseTreatmentEnded } from '@features/app/providers/sub/TreatmentEndedProvider';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

const Status = () => {
    const { userData } = UseForm();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const gradient = userData?.type === 'doctor' ? ['#5698b0', '#4b88a6', '#293f54'] : ['#a156b0', `#491e52`];
    const { treatment_state } = UseTreatment();
    const { treatmentEndedState } = UseTreatmentEnded();

    const [patientTreatment, setPatientTreatment] = useState<TreatmentInfoTemplate | undefined>(() =>
        treatment_state.treatments.length !== 0
            ? treatment_state.treatments[0]
            : treatmentEndedState.endedTreatments.length !== 0
                ? treatmentEndedState.endedTreatments[0]
                : undefined
    );
    
    useEffect(() => {
        if (userData?.type === 'patient') {
            if (treatment_state.treatments.length !== 0) {
                setPatientTreatment(treatment_state.treatments[0]);
            } else if (treatmentEndedState.endedTreatments.length !== 0) {
                setPatientTreatment(treatmentEndedState.endedTreatments[0]);
            } else {
                setPatientTreatment(undefined);
            }
        }
    }, [treatment_state.treatments, treatmentEndedState.endedTreatments]);

    return (

        <LinearGradient colors={gradient}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }} style={styles.gradientStatus}>
            {
                userData?.type === 'doctor' ?
                    <DoctorStatus
                        userType={userData.type as UserType}
                        navigateToTreatmentScreen={navigateToTreatmentScreen}
                        currentTreatments={treatment_state.treatments}
                        endedTreatments={treatmentEndedState.endedTreatments}
                    />
                    :
                    <PatientStatus
                        userType={userData?.type as UserType}
                        navigateToTreatmentScreen={navigateToTreatmentScreen}
                        patientTreatment={patientTreatment}
                    />
            }
        </LinearGradient>


    );
};

const styles = StyleSheet.create({
    gradientStatus: {
        flex: 1,
    },
});

export default Status;