import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Question, Answer, FormattedAnswer } from 'types/app/patient/health/Question_Types';
import { UserType } from 'types/user/User_Types';
import AnswerVisualization from './AnswerVisualization';
import { handleColorType } from '@utils/design/Color';
import MetadataVisualization from './MetadataVisualization';

interface QuestionVisualizationProps {
    question: Question;
    index: number;
    currentQuestionIndex: number;
    animatedStyle: any;
    questionnaireAnswers: FormattedAnswer[];
    type: UserType;
}

const QuestionVisualization: React.FC<QuestionVisualizationProps> = ({
    question,
    index,
    currentQuestionIndex,
    animatedStyle,
    questionnaireAnswers,
    type
}) => {
    const styles = createStyles(type);

    if (index !== currentQuestionIndex) {
        return null;
    }

    return (
        <Animated.View key={index} style={[styles.container, animatedStyle]}>
            <View style={styles.questionBox}>
                <View style={styles.header}>
                    <Text style={styles.questionNumber}>{`Questão ${index + 1}`}</Text>
                </View>
                <Text style={styles.questionTitle}>{question.title}</Text>
                <View style={styles.answersContainer}>
                    {question.sub_questions && question.sub_questions.length > 0 ? (
                        question.sub_questions.map((subQuestion, subQuestionIndex) => (
                            <View key={subQuestionIndex} style={styles.subQuestionContainer}>
                                <Text style={styles.subQuestionText}>{subQuestion}</Text>
                                {questionnaireAnswers?.[currentQuestionIndex]?.subAnswers?.[subQuestionIndex] && (
                                    <AnswerVisualization
                                        answers={question.answers}
                                        currentAnswer={questionnaireAnswers?.[currentQuestionIndex]?.subAnswers?.[subQuestionIndex]}
                                        type={type}
                                    />
                                )}
                            </View>
                        ))
                    ) : (
                        questionnaireAnswers?.[currentQuestionIndex] && (
                            <AnswerVisualization
                                answers={question.answers}
                                currentAnswer={questionnaireAnswers?.[currentQuestionIndex]}
                                type={type}
                            />
                        )
                    )}
                </View>
                {
                    questionnaireAnswers?.[currentQuestionIndex] &&
                    <MetadataVisualization
                        answers={question.answers}
                        currentAnswer={questionnaireAnswers?.[currentQuestionIndex]}
                        type={type}
                    />
                }
            </View>
        </Animated.View>
    );
};

const createStyles = (type: UserType) => StyleSheet.create({
    container: {
        width: '100%',
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
    header: {
        marginBottom: '2%',
        borderBottomWidth: 1,
        borderColor: handleColorType({ patientColor: '#c0aec2', doctorColor: '#aebdc2', userType: type }),
        paddingVertical: '1%',
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
        color: '#471c3a',
    },
    answersContainer: {
        flex: 1,
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
        minHeight: '25%',
    },
    metadataText: {
        flex: 1,
        fontSize: 17,
        color: handleColorType({ patientColor: '#4b2259', doctorColor: '#225059', userType: type }),
        overflow: 'scroll',
    },
});

export default QuestionVisualization;