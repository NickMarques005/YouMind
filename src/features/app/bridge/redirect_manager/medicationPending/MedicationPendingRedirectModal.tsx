import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useMedicationPending } from '@features/app/providers/patient/MedicationPendingProvider';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserType } from 'types/user/User_Types';
import LottieView from 'lottie-react-native';
import images from '@assets/images';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface UseMedicationPendingRedirectModal {
    disabledMainAction?: boolean;
}

interface MedicationPendingStyle {
    modalHeight: number;
    medicationIconSize: number;
    userType: UserType;
}

const MedicationPendingRedirectModal = ({ disabledMainAction }: UseMedicationPendingRedirectModal) => {
    const { medicationPending, formattedTime } = useMedicationPending();
    const { userData } = UseForm();
    const { mainIcon } = useMedicationIcon(medicationPending?.medication.type);
    const modalHeight = screenHeight * 0.08;
    const medicationIconSize = responsiveSize * 0.11;
    const priorityIconSize = responsiveSize * 0.1;

    const medicationModalStyle = styles({
        modalHeight, medicationIconSize, userType: userData?.type as UserType
    });

    return (
        <View style={medicationModalStyle.container}>
            <View style={medicationModalStyle.priorityIconView}>
                <View style={medicationModalStyle.alertAnimationContainer}>
                    {
                        disabledMainAction ?
                            <MaterialIcons name="cancel" size={priorityIconSize} color="white" />
                            :
                            <LottieView style={{ width: priorityIconSize, height: priorityIconSize }} source={images.animations.alert} autoPlay loop />
                    }
                </View>
            </View>
            <View style={medicationModalStyle.contentContainer}>
                <View style={medicationModalStyle.timerContainer}>
                    <Text style={medicationModalStyle.timer}>{formattedTime}</Text>
                </View>
                <View style={medicationModalStyle.iconContainer}>
                    <Image source={mainIcon} style={medicationModalStyle.icon} />
                </View>
            </View>
        </View>
    );
};

const styles = (styleData: MedicationPendingStyle) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 50,
        overflow: 'hidden',
        height: styleData.modalHeight,
        borderWidth: 3,
        borderColor: 'white'
    },
    priorityIconView: {
        height: '100%',
        width: screenWidth * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '1%',
        backgroundColor: styleData.userType === 'doctor' ? '#3ce8dd' : '#6b0480'
    },
    alertAnimationContainer: {
        width: '80%',
        height: 'auto',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: styleData.medicationIconSize,
        height: styleData.medicationIconSize,
        backgroundColor: styleData.userType === 'doctor' ? '#3ce8dd' : '#6b0480',
        borderRadius: styleData.medicationIconSize / 2,
    },
    icon: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain'
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerContainer: {
        paddingHorizontal: 10
    },
    timer: {
        fontSize: styleData.modalHeight * 0.35,
        color: 'gray',
    },
});

export default MedicationPendingRedirectModal;