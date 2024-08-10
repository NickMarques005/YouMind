import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import images from '@assets/images';
import { screenHeight } from '@utils/layout/Screen_Size';
import { FormattedAnswer, Question } from 'types/app/patient/health/Question_Types';

interface ProgressQuestionsProps {
    questions: Question[];
    currentQuestionIndex: number;
    answers: FormattedAnswer[];
    backIcon: any;
    handleConfirmBackToAppModal: () => void;
    handleIntroduction: () => void;
    HandleSpecificQuestion: (index: number) => void;
    isEverySubQuestionAnswered: (index: number) => boolean | undefined;
}

const ProgressQuestions: React.FC<ProgressQuestionsProps> = ({
    questions,
    currentQuestionIndex,
    answers,
    backIcon,
    handleConfirmBackToAppModal,
    handleIntroduction,
    HandleSpecificQuestion,
    isEverySubQuestionAnswered,
}) => {

    return (
        <>
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
        </>
    );
}

export default ProgressQuestions;

const styles = StyleSheet.create({
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
    icon: {
        flex: 1,
        textAlign: 'center',
        aspectRatio: 1,
    },
});