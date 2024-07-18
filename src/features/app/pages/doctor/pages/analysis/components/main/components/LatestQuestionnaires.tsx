import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useLatestQuestionnaire } from '@features/app/providers/doctor/LatestQuestionnaireProvider'
import NoLatestQuestionnaires from './latest_questionnaires/NoLatestQuestionnaires'
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size'
import images from '@assets/images'
import LatestQuestionnairesList from './latest_questionnaires/LatestQuestionnairesList'
import { HistoryQuestionnaire, LatestQuestionnaire } from 'types/history/PatientHistory_Types'
import DefaultLoading from '@components/loading/DefaultLoading'

interface LatestQuestionnairesProps {
    latestQuestionnaires: LatestQuestionnaire[];
    selectLatestQuestionnaire: (questionnaire: HistoryQuestionnaire) => void;
}

const LatestQuestionnaires = ({ latestQuestionnaires, selectLatestQuestionnaire}: LatestQuestionnairesProps) => {
    const latestQuestionnairesIcon = images.app_doctor_images.analysis.latest_questionnaires_icon;
    const loadingSize = responsiveSize * 0.1;

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={['#4198a6', '#286b75']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }} style={{
                    width: '100%', height: screenHeight * 0.17, elevation: 13, backgroundColor: 'white', borderBottomLeftRadius: 35,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '7%', zIndex: 2,
                }}>
                <View style={{ width: '25%', height: '100%', padding: '1%' }}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={latestQuestionnairesIcon} />
                </View>
                <View style={{ flex: 1, }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: '600', textAlign: 'right' }}>Últimos Questionários Adicionados</Text>
                </View>

            </LinearGradient>
            <View style={{ flex: 1 }}>
                {
                    latestQuestionnaires.length !== 0 ?
                        <LatestQuestionnairesList selectLatestQuestionnaire={selectLatestQuestionnaire} latestQuestionnaires={latestQuestionnaires} />
                        : <NoLatestQuestionnaires/>
                }
            </View>
        </View>
    )
}

export default LatestQuestionnaires

const styles = StyleSheet.create({})