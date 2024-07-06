import { StyleSheet } from 'react-native';
import React from 'react';
import { Medication, TakenMedication } from 'types/app/patient/health/Medicine_Types'
import { FlatList } from 'react-native';
import MedicationToConsume from './MedicationToConsume';

interface MedicationListToConsumeProps {
    medications: Medication[];
    selectedDate: Date;
    takenMedications: TakenMedication[] | undefined;
}

const MedicationListToConsume: React.FC<MedicationListToConsumeProps> = ({ medications, takenMedications }) => {
    const sortedMedications = medications
        .map(medication => medication.schedules.map(schedule => ({ ...medication, schedule })))
        .flat()
        .sort((a, b) => a.schedule.localeCompare(b.schedule));

    return (
        <FlatList
            data={sortedMedications}
            renderItem={({ item }) => <MedicationToConsume item={item} takenMedications={takenMedications} />}
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
        gap: 35
    },
});