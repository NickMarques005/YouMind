import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useStatusBehavior from '../hooks/useStatusBehavior';
import { TreatmentScreenName } from 'types/navigation/Navigation_Types';
import { responsiveSize } from '@utils/layout/Screen_Size';
import { UserDoctor, UserPatient, UserType } from 'types/user/User_Types';
import DoctorStatusHeader from './doctor/components/DoctorStatusHeader';
import PatientStatusHeader from './patient/components/PatientStatusHeader';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface StatusHeaderProps {
    navigateToTreatmentScreen: (screenName: TreatmentScreenName) => void;
    backIconSize: number;
    userType: UserType;
    patientTreatment?: TreatmentInfoTemplate;
    finalPerformance?: number;
}

const StatusHeader = ({
    navigateToTreatmentScreen,
    userType,
    backIconSize,
    patientTreatment,
    finalPerformance
}: StatusHeaderProps) => {
    const { backToMain } = useStatusBehavior({ navigateToTreatmentScreen });
    const { userData } = UseForm();
    const iconSize = responsiveSize * 0.22;
    const statusHeaderStyle = styles(iconSize);
    
    return (
        <View style={statusHeaderStyle.header}>
            <View style={{}}>
                <TouchableOpacity onPress={backToMain} style={statusHeaderStyle.backButton}>
                    <MaterialIcons name="arrow-back" size={backIconSize} color="white" />
                </TouchableOpacity>
            </View>

            <View style={statusHeaderStyle.infoContainer}>
                <Text style={statusHeaderStyle.title}>STATUS</Text>
                {
                        userType === 'doctor' ?
                        <DoctorStatusHeader
                            userData={userData as UserDoctor}
                            finalPerformance={finalPerformance}
                        />
                        : <PatientStatusHeader
                            userData={userData as UserPatient}
                            treatment={patientTreatment}
                        />
                }
            </View>
        </View>
    );
};

const styles = (iconSize: number) => {
    return StyleSheet.create({
        header: {
            paddingHorizontal: 20,
            backgroundColor: 'rgba(37, 38, 38, 0.4)',
            borderRadius: 20,
            minHeight: '30%',
            paddingVertical: 30,
        },
        backButton: {
        },
        infoContainer: {
            alignItems: 'center',
        },
        title: {
            fontSize: 30,
            fontWeight: '900',
            color: 'white',
            marginTop: 15,
            marginBottom: 30
        },
        subHeader: {
            alignItems: 'center',
            gap: 15,
        },
        subHeaderTextInfo: {
            fontSize: 17,
            color: '#e6dcf2',
            textAlign: 'center'
        },
        subHeaderTextWhenStarted: {

            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            fontWeight: '600'
        },
        avatarContainer: {
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize,
            overflow: 'hidden',
            backgroundColor: '#faf7fc',
            alignItems: 'center',
            justifyContent: 'center'
        },
        avatar: {

        },
        info: {
            fontSize: 17,
            color: 'white',
            textAlign: 'center'
        },
    });
}


export default StatusHeader;