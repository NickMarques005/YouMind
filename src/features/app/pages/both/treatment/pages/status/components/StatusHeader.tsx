import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import useStatusBehavior from '../hooks/useStatusBehavior';
import { TreatmentScreenName } from 'types/navigation/Navigation_Types';

interface StatusHeaderProps {
    navigateToTreatmentScreen: (screenName: TreatmentScreenName) => void;
}

const StatusHeader = ({ navigateToTreatmentScreen }: StatusHeaderProps) => {
    const { backToMain } = useStatusBehavior({ navigateToTreatmentScreen });

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={backToMain} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Status</Text>
                <View style={styles.subHeader}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'doctor_avatar_url' }}
                            style={styles.avatar}
                        />
                    </View>

                    <Text style={styles.info}>Executando tratamento com Doutora Maria Luiza</Text>
                </View>
                <Text style={styles.info}>Começou há 2 meses atrás</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#437a7d',
    },
    backButton: {
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    subHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    avatarContainer: {
        borderRadius: 20,
        marginRight: 10,
        overflow: 'hidden',
    },
    avatar: {
        width: 40,
        height: 40,
    },
    info: {
        fontSize: 16,
        color: 'white',
    },
});

export default StatusHeader;