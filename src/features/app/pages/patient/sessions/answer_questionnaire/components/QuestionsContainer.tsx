import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { Answer, AnswerType, FormattedAnswer, Question, QuestionnaireTemplate } from 'types/app/patient/health/Question_Types';

interface QuestionsContainerProps {
    template: QuestionnaireTemplate,
    questions: Question[];
    currentQuestionIndex: number;
    answers: FormattedAnswer[];
    handleAnswerChange: (template: QuestionnaireTemplate, answer?: string, type?: AnswerType, subAnswer?: Answer, subQuestionIndex?: number) => void;
    handleMetadataChange: (questionId: string, newMetadata: string) => void;
    sendLoading: { loading: boolean };
    questionnaireAnimatedStyle: any;
    isEverySubQuestionAnswered: (index: number) => boolean | undefined;
}

const QuestionsContainer: React.FC<QuestionsContainerProps> = ({
    template,
    questions,
    currentQuestionIndex,
    answers,
    handleAnswerChange,
    handleMetadataChange,
    sendLoading,
    questionnaireAnimatedStyle,
    isEverySubQuestionAnswered,
}) => {

    return (
        <Animated.View style={[styles.questionContainer, questionnaireAnimatedStyle]}>
            <View style={styles.headerQuestion}>
                <Text style={styles.headerText}>{`Questão ${currentQuestionIndex + 1}`}</Text>
            </View>
            <Text style={styles.questionTitle}>
                {
                    questions[currentQuestionIndex].title || "Titulo"
                }
            </Text>
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
                                                onPress={() => answerOption.answer && answerOption.type && handleAnswerChange(template, undefined, undefined, { answer: answerOption.answer, type: answerOption.type }, SubQuestionindex)}
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
                                onPress={() => answerOption.answer && answerOption.type && handleAnswerChange(template, answerOption.answer, answerOption.type)}
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
            {
                questions[currentQuestionIndex].answers.some(answerOption =>
                    answerOption.answer === answers[currentQuestionIndex].answer &&
                    answerOption.hasMetadata &&
                    answers[currentQuestionIndex].metadata !== undefined
                ) &&
                <View style={styles.input_View}>
                    <TextInput
                        style={styles.metadata_TextInput}
                        editable={!sendLoading.loading}
                        placeholder='Mensagem'
                        placeholderTextColor={'rgba(207, 192, 201, 0.9)'}
                        onChangeText={(value) => handleMetadataChange(answers[currentQuestionIndex].questionId, value)}
                        value={answers[currentQuestionIndex].metadata}
                        multiline={true}
                    />
                </View>
            }
        </Animated.View>
    );
}

export default QuestionsContainer;

const styles = StyleSheet.create({
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
    input_View: {
        marginTop: '5%',
        borderRadius: 15,
        backgroundColor: '#f4f0f5',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#ad9eb0',
        alignItems: 'center',
        padding: 10,
        minHeight: '10%'
    },
    metadata_TextInput: {
        flex: 1,
        fontSize: 17,
        color: '#4b2259',
        overflow: 'scroll',
    }
});