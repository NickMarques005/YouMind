import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@assets/images';
import { responsiveSize } from '@utils/layout/Screen_Size';

const NoMedicationsRegistered = () => {
    const noMedications = images.app_patient_images.health.medicines.icon_no_medicines_found;
    const iconSize = responsiveSize * 0.24;
    return (
        <View style={{ width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Image style={{ width: iconSize, height: iconSize, resizeMode: 'contain' }} source={noMedications} />
            <Text style={{ width: '80%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#7b2d7a' }}>Você não possui medicamentos registrados...</Text>
        </View>
    )
}

const NoMedicationsToday = () => {
    const noMedications = images.app_patient_images.health.medicines.icon_no_medicines_today;

    return (
        <View style={{ width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Image style={{ width: 90, height: 90, resizeMode: 'contain' }} source={noMedications} />
            <Text style={{ width: '60%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#7b2d7a' }}>Aproveite o dia sem medicamentos! </Text>
        </View>
    )
}

export default { NoMedicationsRegistered, NoMedicationsToday };