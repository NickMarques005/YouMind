import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { FormatDateToSpeakDate } from '@utils/date/DateFormatting';
import images from '@assets/images';
import { responsiveSize } from '@utils/layout/Screen_Size';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

interface AlertMedicationHeaderProps {
    currentSchedule: string | undefined;
    handleLeaveAlert: () => void;
    formattedTime: string;
}

const AlertMedicationHeader: React.FC<AlertMedicationHeaderProps> = ({
    currentSchedule, handleLeaveAlert,
    formattedTime
}) => {
    const backIconSize = responsiveSize * 0.09;
    const alertIconSize = responsiveSize * 0.15;

    return (
        <View style={styles.headerView}>
            <View style={styles.backIconContainer}>
                <TouchableOpacity onPress={handleLeaveAlert}>
                    <MaterialIcons name="arrow-back-ios" size={backIconSize} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'white'}}>
                        { formattedTime }
                    </Text>
                </View>
            </View>
            <View style={styles.alertAnimationContainer}>
                <LottieView style={{ width: alertIconSize, height: alertIconSize }} source={images.animations.alert} autoPlay loop />
            </View> 
            <View style={styles.titleContainer}>
                <Text style={styles.scheduleText}>{currentSchedule}</Text>
                <Text style={styles.dateText}>{`Dia ${FormatDateToSpeakDate(new Date())}`}</Text>
            </View>
        </View>
    );
};

export default AlertMedicationHeader;

const styles = StyleSheet.create({
    headerView: {
        width: '100%',
        justifyContent: 'center'
    },
    backIconContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alertAnimationContainer: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
        marginTop: '6%',
        alignItems: 'center'
    },
    scheduleText: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: 2,
        color: '#d6abe0',
    },
    dateText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#a07ea6',
        fontWeight: '500',
    },
});
