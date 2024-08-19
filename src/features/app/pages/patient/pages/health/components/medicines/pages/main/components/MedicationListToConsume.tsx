import { StyleSheet } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import MedicationToConsume from './MedicationToConsume';
import { HistoryMedication } from 'types/history/PatientHistory_Types';

interface MedicationListToConsumeProps {
    currentDateMedications: HistoryMedication[];
    selectedDate: Date;
}

const MedicationListToConsume: React.FC<MedicationListToConsumeProps> = ({ currentDateMedications }) => {

    return (
        <FlatList
            data={currentDateMedications}
            renderItem={({ item }) => <MedicationToConsume item={item} />}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            contentContainerStyle={styles.medicationList}
        />
    );
};

export default MedicationListToConsume;

const styles = StyleSheet.create({
    medicationList: {
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        gap: 30
    },
});