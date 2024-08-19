import { ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { QuestionnaireTemplate } from 'types/app/patient/health/Question_Types';
import { AppStackNavigation } from 'types/navigation/Navigation_Types';
import { UseAppNavigation } from '@features/app/hooks/UseAppNavigation';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import { useAnswerQuestionnaire } from './hooks/UseAnswerQuestionnaire';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight } from '@utils/layout/Screen_Size';
import { UseLoading } from '@hooks/loading/UseLoading';
import { useAnswerQuestionnaireAnimations } from './hooks/UseAnswerQuestionnaireAnimations';
import { useAnswerVerification } from './hooks/UseAnswerVerifications';
import { useAnswerQuestionnaireHandling } from './hooks/UseAnswerHandling';
import { useAnswerQuestionnaireBehavior } from './hooks/UseAnswerQuestionnaireBehavior';
import DefaultModal from '@components/modals/default/DefaultModal';
import images from '@assets/images';
import BackModal from './components/BackModal';
import IntroductionModal from './components/IntroductionModal';
import ProgressQuestions from './components/ProgressQuestions';
import QuestionsContainer from './components/QuestionsContainer';
import SendButton from './components/SendButton';
import QuestionsNavigation from './components/QuestionsNavigation';

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

    const { template, questionnaireId, answers, setAnswers } = useAnswerQuestionnaire({ params: questionnaireParams });
    
    const [questions, setQuestions] = useState(template.questions);
    const sendLoading = UseLoading();

    const { currentQuestionIndex, handleNextQuestion, handlePreviousQuestion, HandleSpecificQuestion, questionnaireAnimatedStyle } = useAnswerQuestionnaireAnimations({ questions });
    const { isEveryQuestionAnswered, isQuestionAnswered, isEverySubQuestionAnswered } = useAnswerVerification({ answers });
    const { handleAnswerChange, handleSendAnswers, handleMetadataChange } = useAnswerQuestionnaireHandling({
        answers,
        setAnswers,
        currentQuestionIndex,
        setLoading: sendLoading.setLoading,
        HandleResponseAppError,
        HandleResponseAppSuccess
    });
    const {
        handleNavigateBackToApp,
        handleConfirmBackToAppModal,
        confirmBackToApp, introduction, handleIntroduction } = useAnswerQuestionnaireBehavior();
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
                <ProgressQuestions
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    answers={answers}
                    backIcon={backIcon}
                    handleConfirmBackToAppModal={handleConfirmBackToAppModal}
                    handleIntroduction={handleIntroduction}
                    HandleSpecificQuestion={HandleSpecificQuestion}
                    isEverySubQuestionAnswered={isEverySubQuestionAnswered}
                />

                <QuestionsContainer
                    template={template}
                    questions={questions}
                    questionnaireAnimatedStyle={questionnaireAnimatedStyle}
                    currentQuestionIndex={currentQuestionIndex}
                    isEverySubQuestionAnswered={isEverySubQuestionAnswered}
                    answers={answers}
                    handleAnswerChange={handleAnswerChange}
                    handleMetadataChange={handleMetadataChange}
                    sendLoading={sendLoading}
                />

                <QuestionsNavigation
                    template={template}
                    currentQuestionIndex={currentQuestionIndex}
                    handleNextQuestion={handleNextQuestion}
                    handlePreviousQuestion={handlePreviousQuestion}
                />

                <SendButton
                    questionnaireId={questionnaireId}
                    answers={answers}
                    sendLoading={sendLoading}
                    handleNavigateBackToApp={handleNavigateBackToApp}
                    handleSendAnswers={handleSendAnswers}
                    readyToSend={readyToSend}
                />
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