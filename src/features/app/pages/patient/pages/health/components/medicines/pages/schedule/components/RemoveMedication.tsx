import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Medication, MedicationType } from 'types/app/patient/health/Medicine_Types';
import DefaultLoading from '@components/loading/DefaultLoading';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { ConvertHoursToDateString } from '@utils/date/DateConversions';

interface RemoveMedicationProps {
    closeModal: () => void;
    removeMedication: (id: string, onSuccess?: () => void) => void;
    medication: Medication;
    loading: boolean;
    removeIcon: ImageSourcePropType
}

const RemoveMedication = ({ closeModal, loading, medication, removeMedication, removeIcon }: RemoveMedicationProps) => {

    return (
        <View style={{ width: '100%', justifyContent: 'space-between', minHeight: screenHeight * 0.4, }}>
            <View style={{ padding: '6%', flex: 1, }}>
                <View style={{}}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#6f3287', fontWeight: '500', marginBottom: '2%' }}>
                        Deseja realmente excluir este medicamento?
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', height: 'auto', padding: '5%', marginVertical: '2%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{height: 90, width: 90, marginRight: '4%'}}>
                        <Image source={removeIcon} style={{ height: '100%', width: '100%', resizeMode: 'contain', }} />
                    </View>

                    <View style={{ flex: 1, gap: 3, }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4d2448', }}>
                            {medication.name}
                        </Text>
                        <Text style={{ fontSize: 16, color: '#a788b5' }}>
                            {`${medication.dosage}${medication.type === 'Líquido' ? 'ml' : 'mg'}`}
                        </Text>
                    </View>
                </View>
            </View>
            <LinearGradient colors={['#ab5576', '#5e1618']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={{ width: '100%', height: screenHeight * 0.1, borderRadius: screenWidth * 0.1, }}>
                <TouchableOpacity onPress={() => removeMedication(medication._id, closeModal)} disabled={loading} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        loading ?
                            <DefaultLoading size={30} color={'white'} />
                            :
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                                EXCLUIR
                            </Text>
                    }
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default RemoveMedication

const styles = StyleSheet.create({


});