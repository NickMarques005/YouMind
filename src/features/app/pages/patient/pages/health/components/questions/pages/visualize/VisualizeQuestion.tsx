import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { QuestionStackNavigation } from 'types/navigation/Navigation_Types';
import { Questionnaire } from 'types/app/patient/health/Question_Types';
import { UseQuestionnaireNavigation } from '../../hooks/UseQuestionnaireNavigation';
import { UseVisualizeQuestions } from './hooks/useVisualizeQuestions';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserType } from 'types/user/User_Types';
import QuestionnaireAnswers from '@components/performance/QuestionnaireAnswers';
import QuestionnairePerformance from '@components/performance/QuestionnairePerformance';

interface VisualizeQuestionParams {
    currentQuestionnaire: Questionnaire;
}

const VisualizeQuestion = () => {
    const { navigateToQuestionScreen } = UseQuestionnaireNavigation();
    const route = useRoute<RouteProp<QuestionStackNavigation, 'visualize_question'> & { params?: VisualizeQuestionParams }>();
    const currentQuestionParams = route.params?.params;
    if (!currentQuestionParams) {
        console.log("No current Questions.. ", currentQuestionParams);
        navigateToQuestionScreen('main_questions');
        return;
    }
    const { questionnaire, questionnaireId, template } = UseVisualizeQuestions({ params: currentQuestionParams });
    const { userData } = UseForm();
    const backIcon = images.generic_images.back.arrow_back_white;
    const current_questionnaire_illustration = images.app_patient_images.health.quiz.current_questionnaire_illustration;
    const [gestureActive, setGestureActive] = useState(false);
    console.log(currentQuestionParams);

    return (
        <ScrollView scrollEnabled={!gestureActive} style={{ flex: 1 }}>
            <View style={styles.visualizeQuestionContainer}>
                <View style={styles.header}>
                    <ImageBackground source={current_questionnaire_illustration}
                        style={{ width: '110%', height: '110%', position: 'absolute', right: '-16%', bottom: '5%', opacity: 0.6 }}
                        resizeMode="contain" />
                    <View style={{ width: '100%', height: '30%', justifyContent: 'space-between', }}>
                        <TouchableOpacity onPress={() => navigateToQuestionScreen('main_questions')} style={{ height: '100%', width: 50, padding: '2%' }}>
                            <Image source={backIcon} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flex: 1, paddingVertical: '5%' }}>
                        <View style={{}}>
                            <Text style={styles.headerTitle}>Minhas Respostas</Text>
                        </View>
                        <View style={{ width: '55%', flex: 1 }}>
                            <Text style={styles.headerSubTitle}>{questionnaire?.name}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.answers}>
                    {
                        questionnaire && template &&
                        <QuestionnaireAnswers
                            setGestureActive={setGestureActive}
                            questionnaire={questionnaire}
                            template={template}
                            type={userData?.type as UserType}
                        />
                    }
                </View>

                <View style={styles.performance}>
                    {
                        questionnaire && userData &&
                        <QuestionnairePerformance
                            questionnaire={questionnaire}
                            type={userData.type as UserType}
                        />}
                </View>
            </View>
        </ScrollView>
    )
}

export default VisualizeQuestion;

const styles = StyleSheet.create({
    visualizeQuestionContainer: {
        width: screenWidth,
        minHeight: screenHeight * 0.9,
        backgroundColor: '#ddbfde',
    },
    header: {
        width: '100%',
        height: screenHeight * 0.3,
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#782474',
        elevation: 5,
        overflow: 'hidden'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f1e1f2',
    },
    headerSubTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#e3d3e0',
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