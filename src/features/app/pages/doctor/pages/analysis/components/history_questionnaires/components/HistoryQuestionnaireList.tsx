import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HistoryQuestionnaire, PatientHistory } from 'types/history/PatientHistory_Types'
import DefaultLoading from '@components/loading/DefaultLoading';
import { responsiveSize } from '@utils/layout/Screen_Size';
import HistoryQuestionnaireItem from './HistoryQuestionnaireItem';

interface HistoryQuestionnaireListProps {
    questionnaires: HistoryQuestionnaire[];
    loading: boolean;
    fetchQuestionnaires: (treatment: string) => Promise<void>;
    hasMore: boolean;
    patientHistory: PatientHistory;
    selectQuestionnaire: (questionnaire: HistoryQuestionnaire, patientHistory: PatientHistory) => void;
}

const HistoryQuestionnaireList = ({ fetchQuestionnaires, loading, hasMore, questionnaires, patientHistory, selectQuestionnaire }: HistoryQuestionnaireListProps) => {
    const loadingSize = responsiveSize * 0.1;

    const renderQuestionnaireItem = ({ item }: { item: HistoryQuestionnaire }) => (
        <HistoryQuestionnaireItem questionnaire={item} patientHistory={patientHistory} selectQuestionnaire={selectQuestionnaire} />
    );

    return (
        <FlatList
            data={questionnaires}
            renderItem={renderQuestionnaireItem}
            keyExtractor={item => item._id}
            onEndReached={() => !loading && hasMore && patientHistory?.treatmentId && fetchQuestionnaires(patientHistory.treatmentId)}
            onEndReachedThreshold={0.2}
            ListFooterComponent={loading ? <DefaultLoading size={loadingSize} color={'#396a80'} /> : <></>}
            contentContainerStyle={styles.list}
        />
    )
}

export default HistoryQuestionnaireList

const styles = StyleSheet.create({
    list: {
        paddingTop: '2%',
    }
});