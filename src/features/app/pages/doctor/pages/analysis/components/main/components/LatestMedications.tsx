import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useLatestMedication } from '@features/app/providers/doctor/LatestMedicationProvider'
import NoLatestMedications from './latest_medications/NoLatestMedications'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size'
import images from '@assets/images'
import LatestMedicationsList from './latest_medications/LatestMedicationsList'
import { HistoryMedication, LatestMedication } from 'types/history/PatientHistory_Types'
import DefaultLoading from '@components/loading/DefaultLoading'

interface LatestMedicationsProps{
    latestMedications: LatestMedication[];
    selectLatestMedication: (medication: HistoryMedication) => void;
}

const LatestMedications = ({ latestMedications, selectLatestMedication }: LatestMedicationsProps) => {
    const latestMedicationsIcon = images.app_doctor_images.analysis.latest_medications_icon;
    const loadingSize = responsiveSize * 0.1;

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={['#4195a6', '#286b75']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }} style={{ width: '100%', height: screenHeight * 0.17, elevation: 13, backgroundColor: 'white', borderBottomRightRadius: 35, 
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '7%', zIndex: 2, }}>

                <View style={{flex: 1, }}>
                    <Text style={{fontSize: 18, color: 'white', fontWeight: '600', textAlign: 'left'}}>Últimos Medicamentos Adicionados</Text>
                </View>
                <View style={{ width: '25%', height: '100%', padding: '1%' }}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={latestMedicationsIcon} />
                </View>
            </LinearGradient>
            <View style={{ flex: 1 }}>
                {
                    latestMedications.length !== 0 ?
                        <LatestMedicationsList selectLatestMedication={selectLatestMedication} latestMedications={latestMedications}/>
                        : <NoLatestMedications/>
                }
            </View>
        </View>
    )
}

export default LatestMedications

const styles = StyleSheet.create({})