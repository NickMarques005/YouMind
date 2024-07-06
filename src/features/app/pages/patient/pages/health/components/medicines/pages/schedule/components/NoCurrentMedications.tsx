import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '@assets/images';

const NoCurrentMedications = () => {

    const noCurrentMedicationsIcon = images.app_patient_images.health.medicines.no_current_medications;

    return (
        <View style={styles.container}>
            <View style={{ height: '30%', width: '100%', alignItems: 'center', padding: '2%' }}>
                <Image source={noCurrentMedicationsIcon} style={{height: '100%', width: '100%', resizeMode: 'contain'}} />
            </View>

            <Text style={styles.text}>Você não possui medicamentos</Text>
        </View>
    );
};

export default NoCurrentMedications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: '4%',
        fontSize: 20,
        color: '#a194b0',
        fontWeight: '500',
        width: '50%',
        textAlign: 'center',
    },
});