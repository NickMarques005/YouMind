import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { SharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { FormatDate, FormatISOToStringDate } from '@utils/date/DateFormatting';
import images from '@assets/images';
import { MaterialIcons } from '@expo/vector-icons';
import { screenHeight } from '@utils/layout/Screen_Size';
import { Questionnaire, QuestionnaireItem, QuestionnaireTemplate } from 'types/app/patient/health/Question_Types';
import { isExpired } from '@utils/date/DateConversions';
import DefaultLoading from '@components/loading/DefaultLoading';


type QuestionnaireCardProps = {
    questionnaire: QuestionnaireItem;
    index: number;
    totalLength: number;
    activeIndex: SharedValue<number>;
    onAnswerPress: (id: string, onSuccess?: ((template: QuestionnaireTemplate, questionnaireId: string, questionnaire?: Questionnaire) => void) | undefined) => Promise<void>;
    answerLoading: boolean;
    visualizeLoading: boolean;
    handleSelectQuestionnaireToAnswer: (template: QuestionnaireTemplate, questionnaireId: string) => void;
    handleVisualizeCurrentQuestionnaire: (questionnaireId: string, questionnaire?: Questionnaire, template?: QuestionnaireTemplate, ) => void;
};

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({ handleVisualizeCurrentQuestionnaire, handleSelectQuestionnaireToAnswer, answerLoading, visualizeLoading, onAnswerPress, questionnaire, index, totalLength, activeIndex }) => {

    const cardIllustration = images.app_patient_images.health.quiz.quiz_card_illustration;
    const cardCheckedIllustration = images.app_patient_images.health.quiz.quiz_card_illustration_checked;
    const cardStyleProps = {
        cardGap: 20,
        maxVisibleCards: 7,
        cardHeight: screenHeight * 0.7
    }
    const cardVisualize = ["#864a8c", '#564275'];
    const cardAnswer = ['#bb58c4', "#7a45a8", '#7475b5'];

    const questionnaireExpired = isExpired(questionnaire.currentQuestionnaire.expiredAt);

    const animatedStyleCard = (expired: boolean) => {
        const animationCard = useAnimatedStyle(() => {

            return {
                position: 'absolute',
                zIndex: totalLength - index,
                opacity: (interpolate(
                    activeIndex.value,
                    [index - 1, index, index + 1],
                    [1 - 1 / cardStyleProps.maxVisibleCards, 1, 1])
                    * (expired ? 0.7 : 1)

                ),
                transform: [
                    {
                        translateY: interpolate(
                            activeIndex.value,
                            [index - 1, index, index + 1],
                            [-(cardStyleProps.cardGap), 0, cardStyleProps.cardHeight],
                        )
                    },
                    {
                        scale: interpolate(
                            activeIndex.value,
                            [index - 1, index, index + 1],
                            [0.95, 1, 1]
                        )
                    }]
            }
        })
        return animationCard;
    }

    return (
        <Animated.View style={[styles.cardContainer, animatedStyleCard(questionnaireExpired)]}>
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderInfo}>
                        <View style={styles.cardDate}>
                            <Text style={styles.cardTextDate}>
                                {FormatISOToStringDate(questionnaire.currentQuestionnaire.createdAt)}
                            </Text>
                        </View>
                        <View style={styles.cardTitleView}>
                            <Text style={styles.cardTitle}>
                                {questionnaire.currentQuestionnaire.name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cardHeaderCheck}>
                        <View style={styles.cardCheck}>
                            {
                                questionnaire.currentQuestionnaire.checked ? (
                                    <MaterialIcons name="check" size={35} color="#9749d6" />
                                ) : questionnaireExpired ? (
                                    <MaterialIcons name="timer-off" size={30} color="#872787" />
                                ) : ""
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.cardInfoContainer}>
                    <View style={styles.cardInfoQuestions}>
                        <Image style={styles.cardInfoImg} source={questionnaire.currentQuestionnaire.checked ? cardCheckedIllustration : cardIllustration} />
                    </View>
                </View>
                <LinearGradient colors={!questionnaire.currentQuestionnaire.checked && !questionnaireExpired ? cardAnswer : cardVisualize}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 1, y: 1 }} style={styles.cardButtonsView}>
                    {
                        questionnaireExpired ?
                            <View style={styles.cardButton}>
                                <Text style={styles.cardText}>EXPIRADO</Text>
                            </View>
                            :
                            !questionnaire.currentQuestionnaire.checked ?
                                <TouchableOpacity disabled={answerLoading || visualizeLoading} style={styles.cardButton} onPress={() => onAnswerPress(questionnaire.currentQuestionnaire._id, handleSelectQuestionnaireToAnswer)}>
                                    {
                                        answerLoading ?
                                            <DefaultLoading size={30} color={'white'} />
                                            :
                                            <Text style={styles.cardText}>RESPONDER</Text>
                                    }
                                </TouchableOpacity>
                                :
                                <TouchableOpacity disabled={answerLoading || visualizeLoading} style={styles.cardButton} onPress={() => handleVisualizeCurrentQuestionnaire(questionnaire.currentQuestionnaire._id, questionnaire.currentQuestionnaire, questionnaire.template )}>
                                    {
                                        visualizeLoading ?
                                            <DefaultLoading size={30} color={'white'} />
                                            :
                                            <Text style={styles.cardText}>VISUALIZAR</Text>
                                    }
                                </TouchableOpacity>
                    }
                </LinearGradient>
            </View>

        </Animated.View>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        backgroundColor: '#f5edfc',
        padding: 25,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        elevation: 20,
        height: '90%',
        width: '100%',
    },
    cardContent: {
        display: 'flex',
        flex: 1,
        gap: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardHeader: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHeaderInfo: {
        width: '79%',
    },
    cardDate: {

    },
    cardTitleView: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7b2d7a'
    },
    cardTextDate: {
        fontSize: 16,
        color: 'rgba(80, 35, 99, 0.6)',
        fontWeight: '300',
    },
    cardHeaderCheck: {
        flex: 1,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    cardCheck: {
        width: '100%',
        height: '70%',
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: '#8733ab',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardInfoContainer: {
        width: '80%',
        height: '55%',
        alignItems: 'center',
    },
    cardInfoQuestions: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    cardInfoImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    cardInfoPerformance: {

    },
    cardButtonsView: {
        borderRadius: 40,
        width: '100%',
        height: '16%',
        justifyContent: 'center',
    },
    cardButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
        fontSize: 18,
        color: 'white'
    },
})

export default QuestionnaireCard;