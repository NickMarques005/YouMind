import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HistoryMedication, PatientHistory } from 'types/history/PatientHistory_Types'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import LinearGradient from 'react-native-linear-gradient';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import images from '@assets/images';

interface HistoryQuestinnaireItemProps {
    medication: HistoryMedication;
    patientHistory: PatientHistory;
    selectMedication: (medication: HistoryMedication, patientHistory: PatientHistory) => void;
}

const HistorymedicationItem = ({ medication, patientHistory, selectMedication }: HistoryQuestinnaireItemProps) => {

    const { iconType } = useMedicationIcon(medication.currentMedication.type);
    const iconSize = responsiveSize * 0.1;
    const stateSize = responsiveSize * 0.3;

    const takenGradient = ['#24404d', '#4195a6'];
    const notTakenGradient = ['#4a232f', '#ad5376'];
    const pendingGradient = ['#244d37', '#415aa6'];

    const iconGradient = medication.pending ? pendingGradient : medication.taken ? takenGradient : notTakenGradient;
    const message = medication.pending ? 'Tomar em' : medication.taken ? 'Tomado' : 'Não tomado';
    const messageColor = medication.pending ? '#415aa6' : medication.taken ? '#4195a6' : '#ad5376';

    return (
        <View style={{ height: screenHeight * 0.2, width: '100%' }}>
            <TouchableOpacity onPress={() => selectMedication(medication, patientHistory)} style={{ flex: 1, flexDirection: 'row', paddingVertical: '6%' }}>
                <View style={{ width: '0%', height: '100%', justifyContent: 'center' }}>
                    <LinearGradient colors={iconGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.2, y: 1 }} style={{ width: stateSize * 1.4, left: -stateSize / 1.3, height: stateSize, padding: '5%', borderRadius: stateSize, zIndex: 2, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <View style={{ width: iconSize, height: iconSize, right: '12%', }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', tintColor: '#e1f0f5' }} source={iconType} />
                        </View>
                    </LinearGradient>
                </View>
                <View style={{ width: '100%', flex: 1, paddingLeft: '8%', }}>
                    <View style={{ width: '100%', minHeight: '45%', backgroundColor: '#7eb2bf', justifyContent: 'space-between', paddingLeft: '15%', paddingRight: '4%', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 1, maxWidth: '87%', }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#e1f0f5', maxWidth: '100%', }} numberOfLines={1} ellipsizeMode="tail">{medication.currentMedication.name}</Text>
                            <View style={{ width: '84%' }}>
                                <Text style={{ color: '#e9f2f5' }} numberOfLines={1} ellipsizeMode="tail">Paciente {patientHistory.patientName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#f2f8fa', borderBottomWidth: 2, paddingLeft: '15%', paddingRight: '3%', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#809ca6' }}>
                        <View style={{ height: '100%', justifyContent: 'center', }}>
                            <Text style={{ fontSize: 15, color: '#597c94' }}>{medication.currentMedication.dosage} {medication.currentMedication.type === 'Líquido' ? 'ml' : 'mg'}</Text>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: messageColor }}>{message} {FormatISOToStringDate(medication.consumeDate || medication.updatedAt)} às {medication.currentSchedule}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default HistorymedicationItem

const styles = StyleSheet.create({})