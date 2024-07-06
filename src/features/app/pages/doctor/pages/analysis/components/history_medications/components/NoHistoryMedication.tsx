import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '@assets/images'
import { responsiveSize } from '@utils/layout/Screen_Size';

const NoHistoryMedication = () => {

    const noCurrentMedications = images.app_doctor_images.analysis.no_current_medications;
    const iconSize = responsiveSize * 0.24;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 15 }}>
            <Image style={{width: iconSize, height: iconSize }} source={noCurrentMedications}/>
            <Text style={{width: '80%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#2d667b' }}>Nenhum histórico de medicamentos encontrado</Text>
        </View>
    )
}

export default NoHistoryMedication

const styles = StyleSheet.create({})