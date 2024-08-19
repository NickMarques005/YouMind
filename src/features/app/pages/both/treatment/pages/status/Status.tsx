import { UseForm } from '@features/app/providers/sub/UserProvider';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { UseTreatmentNavigation } from '../../hooks/UseTreatmentNavigation';
import useStatusBehavior from './hooks/useStatusBehavior';
import StatusHeader from './components/StatusHeader';
import StatusContent from './components/StatusContent';
import { UserType } from 'types/user/User_Types';

const Status = () => {
    const { userData } = UseForm();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();

    return (
        <View style={styles.container}>
            <StatusHeader
                navigateToTreatmentScreen={navigateToTreatmentScreen}
            />
            {
                userData &&
                <StatusContent
                    userType={userData.type as UserType}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    info: {
        marginTop: 10,
        fontSize: 16,
    },
    dataContainer: {
        marginTop: 20,
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sessionTitle: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    patientContentContainer: {

    }
});

export default Status;