import { screenWidth } from '@utils/layout/Screen_Size';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Questionnaire, QuestionnaireTemplate, } from 'types/app/patient/health/Question_Types';
import { UserType } from 'types/user/User_Types';
import { MaterialIcons } from '@expo/vector-icons';
import { handleColorType } from '@utils/design/Color';
import QuestionVisualization from './questionnaire_visualization/QuestionVisualization';
import SwipeIndicator from './questionnaire_visualization/SwipeIndicator';

interface QuestionnaireAnswersProps {
    questionnaire: Questionnaire;
    template: QuestionnaireTemplate;
    type: UserType;
    setGestureActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionnaireAnswers: React.FC<QuestionnaireAnswersProps> = ({
    questionnaire,
    template,
    type,
    setGestureActive,
}) => {
    const styles = QuestionnaireAnswersStyle(type);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    const questionTranslateX = useSharedValue(0);
    const swipeOpacity = useSharedValue(1);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < template.questions.length - 1) {
            if (currentQuestionIndex === -1) {
                swipeOpacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
            }
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex >= 0) {
            if(currentQuestionIndex === 0){
                swipeOpacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
            }
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const gestureHandler = Gesture.Pan()
        .onStart(() => {
            runOnJS(setGestureActive)(true);
        })
        .onUpdate((event) => {
            questionTranslateX.value = withSpring(event.translationX);

            if (currentQuestionIndex === -1) {
                swipeOpacity.value = interpolate(
                    questionTranslateX.value,
                    [-screenWidth / 1.5, 0],
                    [0, 1], 
                    Extrapolation.CLAMP
                );
            }
        })
        .onEnd((event) => {
            runOnJS(setGestureActive)(false);

            if (event.translationX < -screenWidth / 4 && currentQuestionIndex !== template.questions.length - 1) {

                questionTranslateX.value = withTiming(-screenWidth, { duration: 200, easing: Easing.ease }, () => {
                    runOnJS(handleNextQuestion)();
                    questionTranslateX.value = screenWidth;
                    questionTranslateX.value = withTiming(0, { duration: 400, easing: Easing.cubic });
                });
                return;
            } else if (event.translationX > screenWidth / 4 && currentQuestionIndex >= 0) {

                questionTranslateX.value = withTiming(screenWidth, { duration: 300, easing: Easing.ease }, () => {
                    runOnJS(handlePreviousQuestion)();
                    questionTranslateX.value = - screenWidth;
                    questionTranslateX.value = withTiming(0, { duration: 400, easing: Easing.ease });
                });

                return;
            }
            questionTranslateX.value = withSpring(0, { damping: 15, stiffness: 55 });
        });

    const swipeAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: swipeOpacity.value
        }
    })

    const questionAnimatedStyle = useAnimatedStyle(() => {
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

    return (
        <View style={styles.root}>
            <GestureDetector gesture={gestureHandler}>
                <View style={styles.gestureContainer}>
                    <View style={styles.swipeContainer}>
                        <SwipeIndicator
                            type={type}
                            animatedStyles={swipeAnimatedStyle}
                        />
                    </View>

                    {
                        template.questions.map((question, index) => {
                            if (index === currentQuestionIndex) {
                                return (
                                    questionnaire.answers &&
                                    <QuestionVisualization
                                        key={index}
                                        question={question}
                                        index={index}
                                        currentQuestionIndex={currentQuestionIndex}
                                        animatedStyle={questionAnimatedStyle}
                                        questionnaireAnswers={questionnaire.answers}
                                        type={type}
                                    />
                                );
                            }
                            return <Animated.View key={index} style={[{ flex: 1 }]} />
                        })
                    }
                </View>
            </GestureDetector>
        </View>
    );
};

export default QuestionnaireAnswers;

const QuestionnaireAnswersStyle = (type: UserType) => {
    return StyleSheet.create({
        root: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        gestureContainer: {
            width: screenWidth,
            flexDirection: 'row',
            flex: 1
        },
        swipeContainer: {
            position: 'absolute',
            height: '70%',
            alignItems: 'center',
            justifyContent: 'center'
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
            color: handleColorType({ patientColor: '#502b54', doctorColor: '#2b4054', userType: type }),
        },
        questionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: '8%',
            textAlign: 'center',
            color: '#471c3a'
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
        metadataContainer: {
            marginTop: '5%',
            borderRadius: 15,
            backgroundColor: handleColorType({ patientColor: '#f4f0f5', doctorColor: '#f0f2f5', userType: type }),
            flexDirection: 'row',
            borderWidth: 2,
            borderColor: handleColorType({ patientColor: '#ad9eb0', doctorColor: '#9eadb0', userType: type }),
            alignItems: 'flex-start',
            padding: 10,
            minHeight: '25%'
        },
        metadataText: {
            flex: 1,
            fontSize: 17,
            color: handleColorType({ patientColor: '#4b2259', doctorColor: '#225059', userType: type }),
            overflow: 'scroll',
        }
    });
} 