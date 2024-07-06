import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import { Questionnaire } from 'types/app/patient/health/Question_Types'
import { UserType } from 'types/user/User_Types'
import { calculateCurrentQuestionnairePerformance } from '@utils/health/HandlingQuestions'
import { useQuestionnairePerformanceIcon } from '@hooks/questionnaires/useQuestionnairePerformanceIcon'

interface QuestionnairePerformanceProps {
    questionnaire: Questionnaire;
    type: UserType;
}

const QuestionnairePerformance = ({ questionnaire, type }: QuestionnairePerformanceProps) => {

    const circleSize = Math.min(screenWidth, screenHeight) * 0.3;
    const { performance, motivationMessage } = calculateCurrentQuestionnairePerformance(questionnaire.answers || [], type);
    const { performanceIcon } = useQuestionnairePerformanceIcon(performance);

    const gradient = type === 'doctor' ? ['#287882', '#713675', '#4d2448' ] : ['#782474', '#4d2448'];

    return (
        <LinearGradient colors={gradient}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0, y: 1 }} style={{ flex: 1, paddingVertical: '8%', paddingHorizontal: '5%' }}>
            <View style={{ width: '100%', marginBottom: '7%', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, color: 'white', fontWeight: '600' }}>Desempenho</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, gap: 5, }}>
                    <View style={{ backgroundColor: '#d6aae3', padding: '2%', borderRadius: 5, elevation: 10 }}>
                        <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#4f2547' }}>
                            {performance.toUpperCase()}
                        </Text>
                    </View>

                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#b891af' }}>
                        {motivationMessage}
                    </Text>
                </View>
                <View style={{ width: circleSize, height: circleSize, marginLeft: '3.5%', backgroundColor: 'white', borderRadius: screenWidth * 0.2, borderWidth: 5, padding: '1%', borderColor: '#b680c4' }}>
                    <Image source={performanceIcon} style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
                </View>
            </View>
        </LinearGradient>
    )
}

export default QuestionnairePerformance;

const styles = StyleSheet.create({})