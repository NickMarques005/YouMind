import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HistoryMedication, LatestMedication } from 'types/history/PatientHistory_Types'
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';
import { MaterialIcons } from '@expo/vector-icons';
import { useIconHandling } from '@hooks/users/UseIconHandling';

interface MedicationProps {
    latestMedication: LatestMedication;
    selectLatestMedication: (medication: HistoryMedication) => void;
}

const Medication = ({ latestMedication, selectLatestMedication }: MedicationProps) => {
    console.log(latestMedication);
    const { iconType } = useMedicationIcon(latestMedication.currentMedication.type);
    const { handleUserIcon } = useIconHandling();
    const iconSize = responsiveSize * 0.095;
    const medicationStateSize = responsiveSize * 0.12;

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: screenHeight * 0.36,
            padding: '5%',
        }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#fff', borderRadius: 20, elevation: 4 }} onPress={() => selectLatestMedication(latestMedication)}>
                <View style={{ width: '100%', minHeight: '30%', backgroundColor: '#2f5f70', padding: '4%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#badce3', width: '80%' }}>
                        {latestMedication.currentMedication.name}
                    </Text>
                    <View style={{ width: iconSize, height: iconSize, right: '15%', borderRadius: medicationStateSize, borderWidth: 2, overflow: 'hidden', borderColor: '#7eb2bf', backgroundColor: '#8fbfc9' }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', }} source={handleUserIcon({userAvatar: latestMedication.patientAvatar, userType: 'patient', defaultAppIcon: iconType})} />
                    </View>
                </View>
                <View style={{ flex: 1, paddingHorizontal: '6%', marginVertical: '3%', }}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>{`Dose: ${latestMedication.currentMedication.dosage}${latestMedication.currentMedication.type === 'Líquido' ? 'ml' : 'mg'}`}</Text>
                    <Text style={{ fontWeight: '400' }}>{`Horário: ${latestMedication.currentSchedule}`}</Text>
                    <Text>{latestMedication.consumeDate ? FormatISOToStringDate(latestMedication.consumeDate) : FormatISOToStringDate(latestMedication.updatedAt)}</Text>
                    <Text style={{ fontWeight: '700' }}>{`Uso até dia ${FormatISOToStringDate(latestMedication.currentMedication.expiresAt)}`}</Text>
                </View>
                <View style={{ width: '100%', flex: 1, backgroundColor: latestMedication.taken ? '#2ca0ab' : '#ab2c57', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '6%' }}>
                    <View style={{}}>
                        {
                            latestMedication.taken ?
                                <View style={{}}>
                                    <Text style={{ fontSize: 18, fontWeight: '800', color: '#edf2f7' }}>
                                        Medicamento tomado!
                                    </Text>
                                    <Text style={{ fontSize: 14, color: '#d3dfeb' }}>{`Paciente ${latestMedication.patientName ? latestMedication.patientName : 'Desconhecido'}`}</Text>
                                </View>
                                :
                                <View style={{}}>
                                    <Text style={{ fontSize: 18, fontWeight: '800', color: '#f7e4f2' }}>Medicamento não tomado</Text>
                                    <Text style={{ fontSize: 14, color: '#d3dfeb' }}>{`Paciente ${latestMedication.patientName ? latestMedication.patientName : 'Desconhecido'}`}</Text>
                                </View>
                        }
                    </View>
                    <View style={{
                        width: medicationStateSize, height: medicationStateSize, borderRadius: 15, overflow: 'hidden',
                        backgroundColor: latestMedication.taken ? '#7bc2c9' : '#d485a0',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        {
                            latestMedication.taken ?
                                <MaterialIcons name="check" size={24} color="white" />
                                :
                                <MaterialIcons name="block" size={24} color="white" />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
});

export default Medication;

