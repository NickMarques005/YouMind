import { screenWidth } from '@utils/layout/Screen_Size';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, Extrapolation, SharedValue, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Questionnaire, QuestionnaireTemplate, FormattedAnswer, Question, Answer } from 'types/app/patient/health/Question_Types';
import { UserType } from 'types/user/User_Types';
import { MaterialIcons } from '@expo/vector-icons';

interface QuestionnaireAnswersProps {
    questionnaire: Questionnaire;
    template: QuestionnaireTemplate;
    type: UserType;
    setGestureActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionnaireAnswers: React.FC<QuestionnaireAnswersProps> = ({ questionnaire, template, type, setGestureActive }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const questionTranslateX = useSharedValue(0);
    const questionOpacity = useSharedValue(1);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < template.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const gestureHandler = Gesture.Pan()
        .onStart(() => {
            runOnJS(setGestureActive)(true);
        })
        .onUpdate((event) => {
            questionTranslateX.value = event.translationX;
        })
        .onEnd((event) => {
            runOnJS(setGestureActive)(false);
            if (event.translationX < -screenWidth / 4 && currentQuestionIndex !== template.questions.length - 1) {

                questionTranslateX.value = withTiming(-screenWidth, { duration: 300, easing: Easing.cubic }, () => {
                    runOnJS(handleNextQuestion)();
                    questionTranslateX.value = screenWidth;
                    questionTranslateX.value = withTiming(0, { duration: 400, easing: Easing.cubic });
                });

                return;
            } else if (event.translationX > screenWidth / 4 && currentQuestionIndex > 0) {

                questionTranslateX.value = withTiming(screenWidth, { duration: 300, easing: Easing.ease }, () => {
                    runOnJS(handlePreviousQuestion)();
                    questionTranslateX.value = - screenWidth;
                    questionTranslateX.value = withTiming(0, { duration: 400, easing: Easing.ease });
                });

                return;
            }
            questionTranslateX.value = withSpring(0, { damping: 15, stiffness: 55 });
        });

    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            questionTranslateX.value,
            [-screenWidth, 0, screenWidth],
            [0, 1, 0],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateX: questionTranslateX.value }],
            opacity: opacity,
        };
    });

    const renderAnswers = (answers: Answer[], currentAnswer: Answer) => {
        return answers.map((answer, index) => (
            <View key={index} style={[styles.answerContainer, { backgroundColor: currentAnswer?.answer === answer.answer ? 'rgba(201, 163, 190, 0.5)' : 'transparent' }]}>
                <MaterialIcons
                    name={
                        currentAnswer?.answer === answer.answer
                            ? 'radio-button-checked'
                            : 'radio-button-unchecked'
                    }
                    size={24}
                    color="#75416b"
                    style={{ marginRight: '3%' }}
                />
                <Text style={styles.answerText}>{answer.answer}</Text>
            </View>
        ));
    };

    const renderQuestion = (question: Question, index: number) => {

        if (index !== currentQuestionIndex) {
            return null;
        }

        return (
            <Animated.View key={index} style={[styles.container, animatedStyle]}>
                <View style={styles.questionBox}>
                    <View style={{ marginBottom: '2%', borderBottomWidth: 1, borderColor: '#c0aec2', paddingVertical: '1%' }}>
                        <Text style={styles.questionNumber}>{`Questão ${index + 1}`}</Text>
                    </View>

                    <Text style={styles.questionTitle}>{question.title}</Text>
                    <View style={styles.answersContainer}>
                        {question.sub_questions && question.sub_questions.length > 0 ? (
                            question.sub_questions.map((subQuestion, subQuestionIndex) => (
                                <View key={subQuestionIndex} style={styles.subQuestionContainer}>
                                    <Text style={styles.subQuestionText}>{subQuestion}</Text>
                                    {renderAnswers(question.answers, questionnaire.answers?.[currentQuestionIndex]?.subAnswers?.[subQuestionIndex])}
                                </View>
                            ))
                        ) : (
                            renderAnswers(question.answers, questionnaire.answers?.[currentQuestionIndex])
                        )}
                    </View>
                </View>
            </Animated.View>
        );
    };

    return (
        <GestureHandlerRootView style={styles.root}>
            <GestureDetector gesture={gestureHandler}>
                <View style={styles.gestureContainer}>
                    {template.questions.map((question, index) => renderQuestion(question, index))}
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

export default QuestionnaireAnswers;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gestureContainer: {
        width: screenWidth,
        flexDirection: 'row',
    },
    container: {
        width: screenWidth,
        padding: '4%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: '8%',
        paddingVertical: '7%',
        borderRadius: 15,
    },
    questionNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        opacity: 0.5,
        color: '#502b54',
    },
    questionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: '8%',
        textAlign: 'center',
        color: '#471c3a',
    },
    answersContainer: {
        flex: 1,
    },
    answerContainer: {
        flexDirection: 'row',
        padding: '3.5%',
        marginVertical: '2%',
    },
    answerText: {
        fontSize: 18,
        color: '#75416b',
        fontWeight: '500',
    },
    subQuestionContainer: {
        marginVertical: '2%',
        width: '100%',
    },
    subQuestionText: {
        fontSize: 19,
        fontWeight: '500',
    },
});