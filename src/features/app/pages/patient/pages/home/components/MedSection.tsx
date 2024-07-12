import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { PatientScreenName } from 'types/navigation/Navigation_Types';
import { Medication } from 'types/app/patient/health/Medicine_Types';
import HomeMedications from './MedicationDisplayList';
import { HealthPage, UseHealthPage } from '@features/app/providers/patient/HealthProvider';

interface MedSectionProps {
    medications: Medication[];
    navigateTo: (screenName: PatientScreenName) => void;
}

const MedSection = ({ medications, navigateTo }: MedSectionProps) => {
    const { handleCurrentHealthPage } = UseHealthPage();

    const handleGoToOption = (tab: PatientScreenName, page: HealthPage) => {
        console.log("GO TO: ", page);
        handleCurrentHealthPage(page);
        navigateTo(tab);
    }

    return (
        <View style={styles.container}>
            <HomeMedications medications={medications} />
            <View style={{ width: '100%', height: screenHeight * 0.08, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7b3a85' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>Medicamentos Atuais</Text>
                <View style={{ position: 'absolute', bottom: '17%', right: '5%', borderRadius: screenWidth * 0.1, padding: '2%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#8b569c' }}>
                    <TouchableOpacity onPress={() => handleGoToOption('Saúde', 'Medicamentos')} style={{ }}>
                        <MaterialIcons name="medication" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: screenHeight * 0.3,
    },

});

export default MedSection;