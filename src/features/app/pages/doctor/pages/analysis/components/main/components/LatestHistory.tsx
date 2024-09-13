import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LatestQuestionnaires from './LatestQuestionnaires'
import LatestMedications from './LatestMedications'
import { useLatestHistoryHandling } from '../hooks/useLatestHistoryHandling'
import { screenHeight } from '@utils/layout/Screen_Size'
import NoLatestQuestionnaires from './latest_questionnaires/NoLatestQuestionnaires'
import NoLatestMedications from './latest_medications/NoLatestMedications'
import { HistoryMedication, HistoryQuestionnaire } from 'types/history/PatientHistory_Types'
import DefaultLoading from '@components/loading/DefaultLoading'

interface LatestHistoryProps {
    selectLatestMedication: (medication: HistoryMedication) => void;
    selectLatestQuestionnaire: (questionnaire: HistoryQuestionnaire) => void;
    loadingSize: number;
}

const LatestHistory = ({ selectLatestMedication, selectLatestQuestionnaire, loadingSize }: LatestHistoryProps) => {
    const { latestMedications, latestQuestionnaires,
        medicationLoading,
        questionnaireLoading
    } = useLatestHistoryHandling();

    return (
        <View style={{ flex: 1, marginTop: '8%', }}>
            <View style={{ minHeight: screenHeight * 0.4 }}>
                {
                    questionnaireLoading ? 
                    <DefaultLoading size={loadingSize} color={'#396a80'}/>
                    :
                    <LatestQuestionnaires selectLatestQuestionnaire={selectLatestQuestionnaire} latestQuestionnaires={latestQuestionnaires} />
                }
            </View>
            <View style={{ minHeight: screenHeight * 0.4 }}>
                {
                    medicationLoading ? 
                    <DefaultLoading size={loadingSize} color={'#396a80'}/>
                    :
                    <LatestMedications selectLatestMedication={selectLatestMedication} latestMedications={latestMedications} />
                }
            </View>
        </View>
    )
}

export default LatestHistory;

const styles = StyleSheet.create({

});