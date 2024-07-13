import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveSize } from '@utils/layout/Screen_Size'
import images from '@assets/images';

const NoPatientsToAnalyze = () => {

    const iconSize = responsiveSize * 0.34;
    const noPatientsToAnalyze = images.app_doctor_images.analysis.no_patients_to_analyze;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10, top: '-7%' }}>
            <View style={{ width: iconSize, height: iconSize, borderRadius: iconSize, borderWidth: 4, borderColor: '#367791', padding: '3.5%',}}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={noPatientsToAnalyze} />
            </View>
            <View style={{maxWidth: '65%'}}>
                <Text style={{ fontSize: 18, color: '#367791', fontWeight: '600', textAlign: 'center' }}>
                    Oops! Não há pacientes para analisar
                </Text>
            </View>
        </View>
    )
}

export default NoPatientsToAnalyze

const styles = StyleSheet.create({


})