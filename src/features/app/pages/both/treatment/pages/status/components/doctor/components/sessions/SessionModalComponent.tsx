import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusTreatment, TreatmentInfoTemplate, TreatmentSession, TreatmentStatus } from 'types/treatment/Treatment_Types';
import TreatmentSessionList from '../../../both/TreatmentSessionList';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import { UserType } from 'types/user/User_Types';

interface SessionModalComponentProps {
    closeModal: () => void;
    userType: UserType;
    currentTreatment?: TreatmentInfoTemplate;
}

const SessionModalComponent = ({ closeModal, userType, currentTreatment }: SessionModalComponentProps) => {

    const closeIconSize = responsiveSize * 0.09;
    const closeIconColor = userType === 'doctor' ? '#3e7369' : '#3e7369';

    const sessionModalStyle = styles(userType);

    return (
        <View style={sessionModalStyle.container}>
            <View style={sessionModalStyle.headerContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 15, }}>
                    <TouchableOpacity onPress={closeModal}>
                        <Icon name="close" size={closeIconSize} color={closeIconColor} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '80%' }}>
                    <Text style={sessionModalStyle.headerText}>{`Sessões de Tratamento do ${currentTreatment?.name ? currentTreatment.name : "Paciente"}`}</Text>
                </View>
            </View>
            <TreatmentSessionList sessions={currentTreatment?.sessions} currentPerformance={currentTreatment?.status?.currentPerformance} userType={userType} />
        </View>
    );
};

const styles = (userType: UserType) => StyleSheet.create({
    container: {
        flex: 1,
        height: screenHeight * 0.65,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    headerContainer: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: userType === 'doctor' ? '#234a42' : '#46234a',
        textAlign: 'center'
    },
});

export default SessionModalComponent;