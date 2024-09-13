import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import QuestionnaireList from './components/QuestionaireList';
import images from '@assets/images';
import useQuestionnaireHandling from './hooks/UseQuestionnaireHandling';
import useQuestionnaireAnimations from './hooks/UseQuestionnaireAnimations';
import { UseLoading } from '@hooks/loading/UseLoading';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { useQuestionnaireBehavior } from './hooks/UseQuestionnaireBehavior';
import { UseTreatment } from '@features/app/providers/sub/TreatmentProvider';

const MainQuestions = () => {
    const { HandleResponseAppError } = UseGlobalResponse();
    const answerLoading = UseLoading();
    const visualizeLoading = UseLoading();
    const { handleSelectQuestionnaireToAnswer, handleVisualizeCurrentQuestionnaire } = useQuestionnaireBehavior();
    const { questionnaires, handleGetQuestionnaireTemplate } = useQuestionnaireHandling({ HandleResponseAppError, setLoading: answerLoading.setLoading });
    const { handleFlingDown, handleFlingUp, activeIndex } = useQuestionnaireAnimations({ totalLength: questionnaires.length })
    const backgroundMainQuestions = images.app_patient_images.health.quiz.quiz_background;
    const { treatment_state } = UseTreatment();

    return (
        <SafeAreaView style={styles.healthQuestionaries_mainView}>
            <LinearGradient colors={['#4d2448', '#ab32a5']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 0.3, y: 0.28 }} style={styles.questionaire_contentView}>
                <Image style={styles.questionaire_background} source={backgroundMainQuestions} />

                <View style={{ width: '100%', alignItems: 'center', height: '100%', paddingTop: '18%', paddingBottom: '4%' }}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>Questionários</Text>
                    </View>
                    <View style={styles.questionaire_listContainer}>
                        {
                            treatment_state.treatments.length === 0 ?
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                                        Você não está em tratamento no momento. Os questionários ficarão indisponíveis.
                                    </Text>
                                </View>
                                :
                                questionnaires.length !== 0 ?
                                    <GestureDetector
                                        gesture={Gesture.Exclusive(handleFlingUp, handleFlingDown)}
                                    >
                                        <View style={styles.questionaire_listView}>
                                            <QuestionnaireList
                                                handleGetQuestionnaireTemplate={handleGetQuestionnaireTemplate}
                                                activeIndex={activeIndex}
                                                questionnaires={questionnaires}
                                                answerLoading={answerLoading.loading}
                                                visualizeLoading={visualizeLoading.loading}
                                                handleSelectQuestionnaireToAnswer={handleSelectQuestionnaireToAnswer}
                                                handleVisualizeCurrentQuestionnaire={handleVisualizeCurrentQuestionnaire}
                                            />
                                        </View>
                                    </GestureDetector>
                                    :
                                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: '2%' }}>
                                        <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(63, 28, 84, 0.4)', borderRadius: 20, justifyContent: 'center', padding: '4%'}}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                                                Oops! Nenhum questionário disponível...
                                            </Text>
                                        </View>
                                    </View>
                        }
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default MainQuestions

const styles = StyleSheet.create({
    healthQuestionaries_mainView: {
        width: screenWidth,
        height: screenHeight * 0.9,
        backgroundColor: 'white',
    },
    questionaire_contentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    questionaire_background: {
        position: 'absolute',
        width: screenWidth,
        height: '100%',
        opacity: 0.4
    },
    titleView: {
        width: '90%',
        height: 'auto',
        alignItems: 'center',
        paddingVertical: '5%'
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f1e1f2'
    },
    questionaire_listContainer: {
        display: 'flex',
        width: '100%',
        flex: 1,
        paddingHorizontal: '8%',
    },
    questionaire_listView: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
});