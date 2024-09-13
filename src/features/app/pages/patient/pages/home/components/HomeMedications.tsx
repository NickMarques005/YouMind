import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { screenHeight, responsiveSize } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { Medication } from 'types/app/patient/health/Medicine_Types';
import MedicationDisplay from './MedicationDisplay';
import { UseTreatment } from '@features/app/providers/sub/TreatmentProvider';

interface HomeMedicationsProps {
    medications: Medication[];
}

const HomeMedications = ({ medications }: HomeMedicationsProps) => {
    const { treatment_state } = UseTreatment();
    const medSectionBg = images.app_patient_images.home.bg_home_content_4;
    const search_medication_img = images.app_patient_images.home.search_medications;
    const searchMedicationIconSize = responsiveSize * 0.28;

    return (
        <View style={styles.container}>
            <ImageBackground source={medSectionBg}>
                <View style={{ height: '100%', }}>
                    {
                        treatment_state.treatments.length === 0 ?

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: '75%', alignItems: 'center', padding: '6%', backgroundColor: 'rgba(92, 39, 70, 0.4)', borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '500', color: '#f0e6f5' }}>
                                        Inicialize o tratamento para poder gerir seus medicamentos
                                    </Text>
                                </View>
                            </View>
                            :
                            medications.length === 0 ?

                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: '75%', alignItems: 'center', padding: '6%', gap: 10, backgroundColor: 'rgba(92, 39, 70, 0.4)', borderRadius: 10 }}>
                                        <View>
                                            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '500', color: '#fbf2ff' }}>
                                                Você não possui medicamentos registrados!
                                            </Text>
                                            <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: '500', color: '#ded3e3' }}>
                                                Adicione seus medicamentos para ter um tratamento mais apurado.
                                            </Text>
                                        </View>
                                        <View style={{ height: '30%' }}>
                                            <View style={{
                                                height: searchMedicationIconSize, width: searchMedicationIconSize,
                                                backgroundColor: 'rgba(240, 204, 255, 0.4)',
                                                borderRadius: searchMedicationIconSize / 2,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 2,
                                                borderColor: '#f2defa'
                                            }}>
                                                <Image
                                                    source={search_medication_img}
                                                    style={{
                                                        width: searchMedicationIconSize * 0.8,
                                                        height: searchMedicationIconSize * 0.8,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                <FlatList
                                    nestedScrollEnabled={true}
                                    style={styles.medicinesAdd_FlatList}
                                    data={medications}
                                    renderItem={({ item }) => <MedicationDisplay medication={item} />}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                />

                    }
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        minHeight: screenHeight * 0.33,
        elevation: 3,
    },
    backgroundImage_Medicines: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    medicinesAdd_FlatList: {
        flex: 1,
        paddingVertical: '2%',
    },
});

export default HomeMedications;