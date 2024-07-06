import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HistoryQuestionnaire, LatestQuestionnaire } from 'types/history/PatientHistory_Types';
import Questionnaire from './Questionnaire';
import { screenHeight } from '@utils/layout/Screen_Size';

interface LatestQuestionnaireListProps {
    latestQuestionnaires: LatestQuestionnaire[];
    selectLatestQuestionnaire: (questionnaire: HistoryQuestionnaire) => void;
}

const LatestQuestionnairesList = ({ latestQuestionnaires, selectLatestQuestionnaire }: LatestQuestionnaireListProps) => {

    return (
        <View style={{ height: screenHeight * 0.4 }}>
            <ScrollView nestedScrollEnabled={true} style={{flex: 1}}>
                {latestQuestionnaires.map((item, index) => (
                    <Questionnaire selectLatestQuestionnaire={selectLatestQuestionnaire} key={index} latestQuestionnaire={item} />
                ))}
            </ScrollView>
        </View>
    )
}

export default LatestQuestionnairesList

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: '4%',
        paddingHorizontal: '3%'
    },
})