import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LatestQuestionnaires from './LatestQuestionnaires'
import LatestMedications from './LatestMedications'
import { useLatestHistoryHandling } from '../hooks/useLatestHistoryHandling'
import { screenHeight } from '@utils/layout/Screen_Size'
import NoLatestQuestionnaires from './latest_questionnaires/NoLatestQuestionnaires'
import NoLatestMedications from './latest_medications/NoLatestMedications'
import { HistoryMedication, HistoryQuestionnaire } from 'types/history/PatientHistory_Types'

interface LatestHistoryProps{
    selectLatestMedication: (medication: HistoryMedication) => void;
    selectLatestQuestionnaire: (questionnaire: HistoryQuestionnaire) => void;
}

const LatestHistory = ({ selectLatestMedication, selectLatestQuestionnaire }: LatestHistoryProps) => {
    const { latestMedications, latestQuestionnaires, latestMedicationState, latestQuestionnaireState } = useLatestHistoryHandling();

    return (
        <View style={{ flex: 1, marginTop: '8%', }}>
            <View style={{ minHeight: screenHeight * 0.4 }}>
                {
                    latestQuestionnaireState.latestQuestionnaire.length !== 0 ?
                        <LatestQuestionnaires selectLatestQuestionnaire={selectLatestQuestionnaire} latestQuestionnaires={latestQuestionnaires} />
                        : <NoLatestQuestionnaires />
                }
            </View>
            <View style={{ minHeight: screenHeight * 0.4 }}>
                {
                    latestMedicationState.latestMedication.length !== 0 ?
                        <LatestMedications selectLatestMedication={selectLatestMedication} latestMedications={latestMedications} />
                        : <NoLatestMedications />
                }
            </View>
        </View>
    )
}

export default LatestHistory

const styles = StyleSheet.create({

});