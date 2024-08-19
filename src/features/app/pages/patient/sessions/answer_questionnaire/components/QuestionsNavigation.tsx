import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { QuestionnaireTemplate } from 'types/app/patient/health/Question_Types';
import { responsiveSize } from '@utils/layout/Screen_Size';

interface QuestionsNavigationProps {
    currentQuestionIndex: number;
    template: QuestionnaireTemplate;
    handlePreviousQuestion: () => void;
    handleNextQuestion: () => void;
}

const QuestionsNavigation: React.FC<QuestionsNavigationProps> = ({
    currentQuestionIndex,
    template,
    handlePreviousQuestion,
    handleNextQuestion,
}) => {
    return (
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
                            start={{ x: currentQuestionIndex === 0 ? 0 : 1.2, y: 0 }}
                            end={{ x: currentQuestionIndex === 0 ? 1.2 : 0, y: 0 }} style={styles.gradientButton}>
                            <MaterialIcons name="arrow-forward" size={24} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                )
            }
        </View>
    );
}

export default QuestionsNavigation;

const styles = StyleSheet.create({
    navigationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    previousButton: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientButton: {
        height: responsiveSize * 0.15,
        width: responsiveSize * 0.15,
        borderRadius: responsiveSize * 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
});