import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TreatmentEndedList from './TreatmentEndedList';
import { TreatmentStatusScreenName } from 'types/treatment/Status_Types';
import { screenHeight } from '@utils/layout/Screen_Size';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserDoctor } from 'types/user/User_Types';
import NoTreatments from '../no_treatments/NoTreatments';

interface TreatmentEndedProps {
    navigateToStatusScreen: (screenName: TreatmentStatusScreenName) => void;
    backIconSize: number;
    endedTreatments?: TreatmentInfoTemplate[];
    handleOpenSessions: (treatment?: TreatmentInfoTemplate) => void;
}

const TreatmentEnded = ({ 
    navigateToStatusScreen, 
    backIconSize, 
    endedTreatments, 
    handleOpenSessions
}: TreatmentEndedProps) => {
    const { userData } = UseForm();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtonContainer}>
                    <TouchableOpacity onPress={() => navigateToStatusScreen('main')} style={styles.backButton}>
                        <Ionicons name="close" size={backIconSize || 25} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Tratamentos Encerrados</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                {
                    endedTreatments && endedTreatments.length !== 0 ?
                    <TreatmentEndedList treatments={endedTreatments} userData={userData as UserDoctor} onOpenSessions={handleOpenSessions} />
                    : <NoTreatments treatmentsType={'ended'}/>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    header: {
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(37, 38, 38, 0.14)',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: screenHeight * 0.2,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        zIndex: 2,
        top: 20,
    },
    headerButtonContainer: {
        width: '100%',
        alignItems: 'flex-end'
    },
    backButton: {
    },
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '80%'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        marginTop: screenHeight * 0.2
    },
});

export default TreatmentEnded;