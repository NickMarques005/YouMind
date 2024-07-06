import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { Medication } from 'types/app/patient/health/Medicine_Types';
import { FormatDateToSpeakDate } from '@utils/date/DateFormatting';
import { useMedicationIcon } from '@hooks/medications/UseMedicationIcon';
import MedicationDisplay from './MedicationDisplay';
import { PatientScreenName } from 'types/navigation/Navigation_Types';
import { HealthPage } from '@features/app/providers/patient/HealthProvider';
import { UseTreatment } from '@providers/TreatmentProvider';

interface HomeMedicationsProps {
    medications: Medication[];
}

const HomeMedications = ({ medications }: HomeMedicationsProps) => {
    const { treatment_state } = UseTreatment();
    const medSectionBg = images.app_patient_images.home.bg_home_content_4;

    return (
        <View style={styles.container}>
            <ImageBackground source={medSectionBg}>
                <View style={{ height: '100%', }}>
                    {
                        treatment_state.treatments.length !== 0 ?
                            <FlatList
                                nestedScrollEnabled={true}
                                style={styles.medicinesAdd_FlatList}
                                data={medications}
                                renderItem={({ item }) => <MedicationDisplay medication={item} />}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                            />
                            :
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{ width: '75%', alignItems: 'center', padding: '6%', backgroundColor: 'rgba(92, 39, 70, 0.4)', borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '500', color: '#f0e6f5' }}>
                                        Inicialize o tratamento para poder gerir seus medicamentos
                                    </Text>
                                </View>
                            </View>

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