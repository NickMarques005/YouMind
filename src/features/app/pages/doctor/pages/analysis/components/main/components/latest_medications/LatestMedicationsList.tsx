import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HistoryMedication, LatestMedication } from 'types/history/PatientHistory_Types';
import Medication from './Medication';
import { screenHeight } from '@utils/layout/Screen_Size';
import { ScrollView } from 'react-native';

interface LatestMedicationListProps {
    latestMedications: LatestMedication[];
    selectLatestMedication: (medication: HistoryMedication) => void;
}

const LatestMedicationsList = ({ latestMedications, selectLatestMedication }: LatestMedicationListProps) => {


    return (
        <View style={{ height: screenHeight * 0.4 }}>
            <ScrollView nestedScrollEnabled={true} style={{flex: 1,}}>
                {latestMedications.map((item, index) => (
                    <Medication selectLatestMedication={selectLatestMedication} key={index} latestMedication={item} />
                ))}
            </ScrollView>
        </View>
    )
}

export default LatestMedicationsList

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingVertical: '4%',
    },
})