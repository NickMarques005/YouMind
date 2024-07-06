import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FormattedAnswer, QuestionnaireTemplate } from 'types/app/patient/health/Question_Types';
import { AppStackNavigation } from 'types/navigation/Navigation_Types';
import { UseAppNavigation } from '@features/app/hooks/UseAppNavigation';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import Animated from 'react-native-reanimated';
import { useAnswerQuestionnaire } from './hooks/UseAnswerQuestionnaire';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight } from '@utils/layout/Screen_Size';
import { UseLoading } from '@hooks/loading/UseLoading';
import { MaterialIcons } from '@expo/vector-icons';
import { useAnswerQuestionnaireAnimations } from './hooks/UseAnswerQuestionnaireAnimations';
import { useAnswerVerification } from './hooks/UseAnswerVerifications';
import { useAnswerQuestionnaireHandling } from './hooks/UseAnswerHandling';
import { useAnswerQuestionnaireBehavior } from './hooks/UseAnswerQuestionnaireBehavior';
import DefaultModal from '@components/modals/default/DefaultModal';
import images from '@assets/images';
import BackModal from './components/BackModal';
import IntroductionModal from './components/IntroductionModal';
import DefaultLoading from '@components/loading/DefaultLoading';

export interface AnswerQuestionnaireParams {
    template?: QuestionnaireTemplate;
    questionnaireId?: string;
}

const AnswerQuestionnaireSession = () => {
    const { navigateToAppScreen } = UseAppNavigation();
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const route = useRoute<RouteProp<AppStackNavigation, 'answer_questionnaire'> & { params?: { params: AnswerQuestionnaireParams } }>();
    const questionnaireParams = route.params?.params;
    if (!questionnaireParams) {
        console.log("Não há parametros de questionário template.. ");
        navigateToAppScreen('main_page');
        HandleResponseAppError('Houve um erro. Questionário não especificado');
        return null;
    }

    const { template, questionnaireId } = useAnswerQuestionnaire({ params: questionnaireParams });
    const initialAnswers: FormattedAnswer[] = template.questions.map(question => {
        const subAnswers = question.sub_questions
            ? Array(question.sub_questions.length).fill({ answer: '', type: 'bom' })
            : undefined;
        return {
            answer: '',
            type: 'bom',
            subAnswers: subAnswers
        };
    });


    const [answers, setAnswers] = useState<FormattedAnswer[]>(initialAnswers);
    const [questions, setQuestions] = useState(template.questions);
    const sendLoading = UseLoading();

    const { currentQuestionIndex, handleNextQuestion, handlePreviousQuestion, HandleSpecificQuestion, questionnaireAnimatedStyle } = useAnswerQuestionnaireAnimations({ questions });
    const { isEveryQuestionAnswered, isQuestionAnswered, isEverySubQuestionAnswered } = useAnswerVerification({ answers });
    const { handleAnswerChange, handleSendAnswers } = useAnswerQuestionnaireHandling({
        answers,
        setAnswers,
        currentQuestionIndex,
        setLoading: sendLoading.setLoading,
        HandleResponseAppError,
        HandleResponseAppSuccess
    });
    const { handleNavigateBackToApp, handleConfirmBackToAppModal, confirmBackToApp, introduction, handleIntroduction } = useAnswerQuestionnaireBehavior();
    const backIcon = images.generic_images.back.arrow_back_white;
    const readyToSend = isEveryQuestionAnswered(questions.length);

    return (
        <ScrollView contentContainerStyle={{
            minHeight: screenHeight,
            width: '100%',
        }} style={styles.container}>
            <LinearGradient
                colors={['#6b2a6b', '#c2927a']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }} style={styles.gradient}>
                <View style={{ height: screenHeight * 0.1, width: '100%', justifyContent: 'space-between', flexDirection: 'row', }}>
                    <TouchableOpacity style={{ width: '10%', height: '50%' }} onPress={handleConfirmBackToAppModal}>
                        <Image source={backIcon} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '10%', height: '50%', alignItems: 'center', justifyContent: 'center' }} onPress={handleIntroduction}>
                        <MaterialIcons
                            name="help-outline"
                            color="white"
                            size={35}
                            style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.progressView}>
                    {questions.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.progressBar,
                                currentQuestionIndex === index
                                    ? styles.activeProgressBar :
                                    answers[index].answer || isEverySubQuestionAnswered(index) ? styles.answeredProgressBar : {}
                            ]}
                            onPress={() => HandleSpecificQuestion(index)}
                        />
                    ))}
                </View>

                <Animated.View style={[styles.questionContainer, questionnaireAnimatedStyle]}>
                    <View style={styles.headerQuestion}>
                        <Text style={styles.headerText}>{`Questão ${currentQuestionIndex + 1}`}</Text>
                    </View>
                    <Text style={styles.questionTitle}>{questions[currentQuestionIndex].title || "Titulo"}</Text>
                    <View style={styles.answersContainer}>
                        {
                            questions[currentQuestionIndex].sub_questions?.length !== 0 ?
                                questions[currentQuestionIndex].sub_questions?.map((subQuestion, SubQuestionindex) => (
                                    <View key={SubQuestionindex} style={styles.subQuestionContainer}>
                                        <Text style={styles.subQuestionText}>{subQuestion}</Text>
                                        <View style={{}}>
                                            {
                                                questions[currentQuestionIndex].answers.map((answerOption, index) => (
                                                    <TouchableOpacity
                                                        disabled={sendLoading.loading}
                                                        key={index}
                                                        onPress={() => answerOption.answer && answerOption.type && handleAnswerChange(undefined, undefined, { answer: answerOption.answer, type: answerOption.type }, SubQuestionindex)}
                                                        style={[styles.answerButton, { backgroundColor: answerOption.answer === answers[currentQuestionIndex].answer ? "rgba(201, 163, 190, 0.5)" : "transparent" }]}
                                                    >
                                                        <MaterialIcons
                                                            name={

                                                                answers[currentQuestionIndex].subAnswers &&
                                                                    answers[currentQuestionIndex].subAnswers[SubQuestionindex] &&
                                                                    answerOption.answer === answers[currentQuestionIndex].subAnswers[SubQuestionindex].answer
                                                                    ? 'radio-button-checked'
                                                                    : 'radio-button-unchecked'}
                                                            size={24}
                                                            color="#75416b"
                                                            style={{ marginRight: '3%' }}
                                                        />
                                                        <Text style={styles.answerText}>
                                                            {answerOption.answer}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    </View>
                                ))

                                : (questions[currentQuestionIndex].answers.map((answerOption, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        disabled={sendLoading.loading}
                                        onPress={() => answerOption.answer && answerOption.type && handleAnswerChange(answerOption.answer, answerOption.type)}
                                        style={[styles.answerButton, { backgroundColor: answerOption.answer === answers[currentQuestionIndex].answer ? "rgba(201, 163, 190, 0.5)" : "transparent" }]}
                                    >
                                        <MaterialIcons
                                            name={answerOption.answer === answers[currentQuestionIndex].answer ? 'radio-button-checked' : 'radio-button-unchecked'}
                                            size={24}
                                            color="#75416b"
                                            style={{ marginRight: '3%' }}
                                        />
                                        <Text style={styles.answerText}>
                                            {answerOption.answer}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                                )}
                    </View>
                </Animated.View>
                <View style={styles.navigationContainer}>
                    {currentQuestionIndex > 0 && (
                        <TouchableOpacity style={styles.previousButton} onPress={handlePreviousQuestion}>
                            <LinearGradient
                                colors={['#78445b', 'transparent']}
                                start={{ x: 0.4, y: 0 }}
                                end={{ x: 0, y: 0 }} style={styles.gradientButton} >
                                <MaterialIcons name="arrow-back" size={24} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                    {
                        currentQuestionIndex < template.questions.length - 1 && (
                            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                                <LinearGradient
                                    colors={currentQuestionIndex === 0 ? ['#873a6c', 'transparent'] : ['transparent', '#873a6c']}
                                    start={{ x: currentQuestionIndex === 0 ? 0.4 : 1, y: 0 }}
                                    end={{ x: currentQuestionIndex === 0 ? 0 : 0.4, y: 0 }} style={styles.gradientButton}>
                                    <MaterialIcons name="arrow-forward" size={24} color="white" />
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View style={styles.sendView}>
                    <TouchableOpacity onPress={() => handleSendAnswers(answers, questionnaireId, handleNavigateBackToApp)} disabled={!readyToSend || sendLoading.loading} style={[styles.sendButton, { opacity: !readyToSend || sendLoading.loading ? 0.5 : 1 }]}>
                        <LinearGradient
                            colors={['#8f3ea3', '#523a50']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }} style={styles.gradientButton}>
                            {
                                sendLoading.loading ? 
                                <DefaultLoading size={30} color={'white'}/>
                                :
                                <Text style={styles.sendText}>Enviar</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            {
                confirmBackToApp &&
                <DefaultModal isVisible={confirmBackToApp} disableGestures={false} onClose={() => handleConfirmBackToAppModal()}>
                    <BackModal handleNavigateBackToApp={handleNavigateBackToApp} closeModal={handleConfirmBackToAppModal} />
                </DefaultModal>
            }
            <IntroductionModal isVisible={introduction} closeModal={handleIntroduction} />

        </ScrollView>
    )
}

export default AnswerQuestionnaireSession;

const styles = StyleSheet.create({
    container: {

    },
    gradient: {
        width: '100%',
        height: '100%',
        padding: '10%',
        justifyContent: 'space-between',
    },
    progressView: {
        width: '100%',
        height: screenHeight * 0.05,
        flexDirection: 'row',
    },
    progressBar: {
        height: '18%',
        flex: 1,
        borderRadius: 2,
        backgroundColor: '#ccc',
        marginHorizontal: '0.3%'
    },
    answeredProgressBar: {
        backgroundColor: '#b37d99',
    },
    activeProgressBar: {
        backgroundColor: '#e1a6f7',
    },
    questionContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: 30,
        padding: '10%',
        elevation: 15,
    },
    headerQuestion: {
        width: '100%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        opacity: 0.5,
        color: '#502b54'
    },
    icon: {
        flex: 1,
        textAlign: 'center',
        aspectRatio: 1,
    },
    questionTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#75416b',
        fontWeight: '500',
        marginVertical: '2%'
    },
    answersContainer: {
        width: '100%',
        flex: 1,
        paddingTop: '6%'
    },
    subQuestionContainer: {
        marginVertical: '2%',
        width: '100%',
    },
    subQuestionText: {
        fontSize: 16,
        fontWeight: '500'
    },
    navigationContainer: {
        marginVertical: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    answerButton: {
        width: '100%',
        flexDirection: 'row',
        padding: '2%',
        borderRadius: 5,
    },
    answerText: {
        fontSize: 16,
        color: '#75416b',
    },
    gradientButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    previousButton: {
        height: screenHeight * 0.05,
        width: '30%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    nextButton: {
        height: screenHeight * 0.05,
        borderRadius: 10,
        overflow: 'hidden',
        width: '30%',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    sendView: {
        width: '100%',
    },
    sendText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    sendButton: {
        height: screenHeight * 0.08,
        borderRadius: 100,
        overflow: 'hidden',
        elevation: 15,
    }
});