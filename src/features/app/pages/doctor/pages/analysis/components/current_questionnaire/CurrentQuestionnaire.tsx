import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import QuestionnairePerformance from '@components/performance/QuestionnairePerformance';
import { UserType } from 'types/user/User_Types';
import images from '@assets/images';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AnalysisStackNavigation } from 'types/navigation/Navigation_Types';
import { UseAnalysisNavigation } from '../../hooks/useAnalysisNavigation';
import { HistoryQuestionnaire, PatientHistory } from 'types/history/PatientHistory_Types';
import { UseCurrentQuestionnaire } from './hooks/useCurrentQuestionnaire';
import { ImageBackground } from 'react-native';
import QuestionnaireAnswers from '@components/performance/QuestionnaireAnswers';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UseNavigateOnSuccess } from '@hooks/navigation/UseNavigateSuccess';
import { useCurrentQuestionnaireBehavior } from './hooks/useCurrentQuestionnaireBehavior';

interface CurrentQuestionnaireParams {
    patientHistory: PatientHistory;
    questionnaire: HistoryQuestionnaire;
    latest?: boolean;
}

const CurrentQuestionnaire = () => {
    const { navigateToAnalysisScreen } = UseAnalysisNavigation();
    const { userData } = UseForm();
    const route = useRoute<RouteProp<AnalysisStackNavigation, 'current_questionnaire'> & { params?: CurrentQuestionnaireParams }>();
    const currentQuestionParams = route.params?.params;
    if (!currentQuestionParams) {
        console.log("No current Questions.. ", currentQuestionParams);
        navigateToAnalysisScreen('history_patient_questionnaires');
        return;
    }
    const { questionnaire, patientHistory, latest } = UseCurrentQuestionnaire({ params: currentQuestionParams });
    const backIcon = images.generic_images.back.arrow_back_white;
    const current_questionnaire_illustration = images.app_patient_images.health.quiz.current_questionnaire_illustration;
    const [gestureActive, setGestureActive] = useState(false);

    const { handleAnalysisNavigation } = useCurrentQuestionnaireBehavior();

    return (
        <ScrollView scrollEnabled={!gestureActive} style={{ flex: 1 }}>
            <View style={styles.currentQuestionContainer}>
                <View style={styles.header}>
                    <ImageBackground source={current_questionnaire_illustration}
                        style={{ width: '110%', height: '110%', position: 'absolute', right: '-16%', bottom: '5%', opacity: 0.5 }}
                        resizeMode="contain" />
                    <View style={{ width: '100%', height: '30%', justifyContent: 'space-between', }}>
                        <TouchableOpacity onPress={() => handleAnalysisNavigation(patientHistory, latest)} style={{ height: '100%', width: 50, padding: '2%' }}>
                            <Image source={backIcon} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flex: 1, paddingVertical: '5%' }}>
                        <View style={{}}>
                            <Text style={styles.headerTitle}>{`Respostas do Paciente`}</Text>
                        </View>
                        <View style={{ width: '55%', flex: 1 }}>
                            <Text style={styles.headerSubTitle}>{patientHistory?.patientName}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.answers}>
                    {
                        questionnaire && questionnaire.template &&
                        <QuestionnaireAnswers
                            setGestureActive={setGestureActive}
                            questionnaire={questionnaire.currentQuestionnaire}
                            template={questionnaire.template}
                            type={userData?.type as UserType}
                        />
                    }
                </View>

                <View style={styles.performance}>
                    {
                        questionnaire && userData &&
                        <QuestionnairePerformance
                            questionnaire={questionnaire.currentQuestionnaire}
                            type={userData.type as UserType}
                        />
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default CurrentQuestionnaire

const styles = StyleSheet.create({
    currentQuestionContainer: {
        width: screenWidth,
        minHeight: screenHeight * 0.9,
        backgroundColor: '#bfded3',
    },
    header: {
        width: '100%',
        height: screenHeight * 0.3,
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#246a78',
        elevation: 5,
        overflow: 'hidden'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e1e8f2',
    },
    headerSubTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#d3e3e2',
        textAlign: 'left'
    },
    answers: {
        minHeight: screenHeight * 0.8,
        padding: '5%',
    },
    performance: {
        minHeight: screenHeight * 0.35,
        width: '100%',
    }


})