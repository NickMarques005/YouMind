import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Answer, FormattedAnswer } from 'types/app/patient/health/Question_Types';
import { UserType } from 'types/user/User_Types';

interface AnswerVisualizationProps {
    answers: Answer[];
    currentAnswer: FormattedAnswer | Answer;
    type: UserType;
}

const AnswerVisualization: React.FC<AnswerVisualizationProps> = ({ answers, currentAnswer, type }) => {
    const styles = createStyles(type);

    return (
        <>
            {answers.map((answer, index) => (
                <View key={index} style={[styles.answerContainer, { backgroundColor: currentAnswer?.answer === answer.answer ? 'rgba(201, 163, 190, 0.5)' : 'transparent' }]}>
                    <MaterialIcons
                        name={currentAnswer?.answer === answer.answer ? 'radio-button-checked' : 'radio-button-unchecked'}
                        size={24}
                        color="#75416b"
                        style={{ marginRight: '3%' }}
                    />
                    <Text style={styles.answerText}>{answer.answer}</Text>
                </View>
            ))}
        </>
    );
};

const createStyles = (type: UserType) => StyleSheet.create({
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
});

export default AnswerVisualization;