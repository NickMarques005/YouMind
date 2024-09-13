import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react'
import { UserType } from 'types/user/User_Types'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import StatusHeader from '../StatusHeader';
import StatusContent from '../StatusContent';
import { TreatmentScreenName } from 'types/navigation/Navigation_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface PatientStatusProps {
    userType: UserType;
    navigateToTreatmentScreen: (screenName: TreatmentScreenName) => void;
    patientTreatment?: TreatmentInfoTemplate;
}

const PatientStatus = ({
    userType,
    navigateToTreatmentScreen,
    patientTreatment }: PatientStatusProps) => {
    const backIconSize = responsiveSize * 0.1;

    return (
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }} >
            <View style={styles.container}>
                <StatusHeader
                    navigateToTreatmentScreen={navigateToTreatmentScreen}
                    backIconSize={backIconSize}
                    userType={userType}
                    patientTreatment={patientTreatment}
                />
                <StatusContent
                    userType={userType}
                    patientTreatment={patientTreatment}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: screenHeight * 0.9,
        padding: 20,
    },
});

export default PatientStatus;