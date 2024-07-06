import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HistoryMedication, HistoryQuestionnaire, PatientHistory } from 'types/history/PatientHistory_Types'
import DefaultLoading from '@components/loading/DefaultLoading';
import { responsiveSize } from '@utils/layout/Screen_Size';
import HistoryMedicationItem from './HistoryMedicationItem';

interface HistoryMedicationListProps{
    medications: HistoryMedication[];
    loading: boolean;
    fetchMedications: (treatment: string) => Promise<void>;
    treatmentId?: string;
    hasMore: boolean;
    patientHistory: PatientHistory;
    selectMedication: (medication: HistoryMedication, patientHistory: PatientHistory) => void;
}

const HistoryMedicationList = ({ fetchMedications, loading, hasMore, medications, treatmentId, patientHistory, selectMedication}: HistoryMedicationListProps) => {
    const loadingSize = responsiveSize * 0.1;

    const renderMedicationItem = ({ item }: { item: HistoryMedication }) => (
        <HistoryMedicationItem selectMedication={selectMedication} medication={item} patientHistory={patientHistory}/>
    );

    return (
        <FlatList
                data={medications}
                renderItem={renderMedicationItem}
                keyExtractor={item => item._id}
                onEndReached={() => !loading && hasMore && treatmentId && fetchMedications(treatmentId)}
                onEndReachedThreshold={0.2}
                ListFooterComponent={loading ? <DefaultLoading size={loadingSize} color={'#396a80'}/> : <></>}
                contentContainerStyle={styles.list}
            />
    )
}

export default HistoryMedicationList;

const styles = StyleSheet.create({
    list: {
        paddingTop: '2%',
    }
});