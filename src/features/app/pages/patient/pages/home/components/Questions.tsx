import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { screenWidth, screenHeight } from '@utils/layout/Screen_Size';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { PatientScreenName } from 'types/navigation/Navigation_Types';
import { HealthPage, UseHealthPage } from '@features/app/providers/patient/HealthProvider';
import { useShowQuestionPerformance } from '../hooks/UseShowPerformance';

interface QuestionsProps {
    navigateTo: (screenName: PatientScreenName) => void;
}

const Questions = ({ navigateTo }: QuestionsProps) => {
    const { handleCurrentHealthPage } = UseHealthPage();
    const questionsBg = images.app_patient_images.home.bg_home_content_1;
    const { performance } = useShowQuestionPerformance();

    const handleGoToOption = (tab: PatientScreenName, page: HealthPage) => {
        console.log("GO TO: ", page);
        handleCurrentHealthPage(page);
        navigateTo(tab);
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={questionsBg}
                style={styles.backgroundImage_Questions}
            >
                <View style={styles.content}>
                    <View style={styles.statistics_View}>
                        <View style={styles.desempenho_View}>
                            <Text style={styles.desempenho_Text}>
                                Seu Desempenho
                            </Text>
                        </View>
                        <View style={styles.statisticsQuestions_View}>
                            <AnimatedCircularProgress
                                size={120}
                                width={28}
                                rotation={0}
                                fill={performance}
                                tintColor="#7f1480"
                                backgroundColor="rgba(191, 26, 128, 0.3)"
                            >
                                {(fill) => (
                                    <Text style={styles.percentageQuestions_Text}>{`${Math.round(fill)}%`}</Text>
                                )}
                            </AnimatedCircularProgress>
                        </View>
                        <LinearGradient colors={['#b462e3', '#6d1370']} style={styles.infoQuestions_View}>
                            <TouchableOpacity onPress={() => handleGoToOption('Saúde', "Questionários")} style={styles.infoQuestions_Touchable}>
                                <Text style={styles.statisticsQuestions_Text}>Questionários Respondidos</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'white',
        width: '100%',
        height: screenHeight * 0.35,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    backgroundImage_Questions: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        height: '100%',
        padding: 20,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    desempenho_View: {
        flexGrow: 1,
        alignItems: 'center'
    },
    desempenho_Text: {
        fontWeight: '800',
        textTransform: 'uppercase',
        fontSize: 18,
        color: '#8e137e',
    },
    statistics_View: {
        height: '100%',
        width: '50%',
        alignItems: 'center',
        gap: 10,
    },
    statisticsQuestions_View: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    statisticsQuestions_Text: {
        fontSize: 14,
        fontWeight: '300',
        color: 'white',
        textAlign: 'center'
    },
    percentageQuestions_Text: {
        fontWeight: '900',
        fontSize: 18,
        color: '#9224ba'
    },
    infoQuestions_View: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        width: '90%',
        borderRadius: 40,
    },
    infoQuestions_Touchable: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Questions;