import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { FormatISODate } from '../../../functions/medicines/FormatDate';

const screenHeight = Dimensions.get('window').height;

type Questionaire = {
    id: number;
    name: string;
    date: string;
    expired: boolean;
    checked: boolean;
    new: boolean;
    total_questions: number;
    positive_questions: number;
};

type QuestionaireCardProps = {
    questionaire: Questionaire;
    index: number;
    totalLength: number;
    activeIndex: SharedValue<number>
};

const QuestionaireCard: React.FC<QuestionaireCardProps> = ({ questionaire, index, totalLength, activeIndex }) => {

    const cardStyleProps = {
        cardGap: 20,
        maxVisibleCards: 7,
        cardHeight: screenHeight * 0.7
    }

    const animatedStyleCard = useAnimatedStyle(() => {

        return {
            position: 'absolute',
            zIndex: totalLength - index,
            opacity: interpolate(
                activeIndex.value,
                [index - 1, index, index + 1],
                [1 - 1 / cardStyleProps.maxVisibleCards, 1, 1]

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

    return (
        <Animated.View style={[styleQuestionaireCard.cardContainer, animatedStyleCard]}>

            <View style={styleQuestionaireCard.cardContent}>
                <View style={styleQuestionaireCard.cardHeader}>
                    <View style={styleQuestionaireCard.cardHeaderInfo}>
                        <View style={styleQuestionaireCard.cardDate}>
                            <Text style={styleQuestionaireCard.cardTextDate}>
                                {FormatISODate(questionaire.date)}
                            </Text>
                        </View>
                        <Text style={styleQuestionaireCard.cardTitle}>
                            {questionaire.name}
                        </Text>
                    </View>
                    <View style={styleQuestionaireCard.cardHeaderCheck}>
                        <View style={styleQuestionaireCard.cardCheck}>

                        </View>
                    </View>
                </View>
                <View style={styleQuestionaireCard.cardInfoContainer}>
                    <View style={styleQuestionaireCard.cardInfoQuestions}>
                        <Image source={require('../../../assets/health/questionaires/questionaire_card_ilustration.png')}/>
                    </View>
                </View>
                <LinearGradient colors={['#bb58c4', "#7a45a8", '#7475b5']}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 1, y: 1 }} style={styleQuestionaireCard.cardButtonsView}>
                    {
                        !questionaire.expired && !questionaire.checked ?
                            <TouchableOpacity style={styleQuestionaireCard.cardButtonAnswer}>
                                <Text style={styleQuestionaireCard.cardTextAnswer}>RESPONDER</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styleQuestionaireCard.cardButtonVisualize}>
                                <Text style={styleQuestionaireCard.cardTextVisualize}>VISUALIZAR</Text>
                            </TouchableOpacity>
                    }
                </LinearGradient>
            </View>

        </Animated.View>
    )
};

const styleQuestionaireCard = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        backgroundColor: '#f5edfc',
        padding: 25,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 5,
        elevation: 20,
        height: '90%',
        width: '100%',
    },
    cardContent: {
        display: 'flex',
        flex: 1,
        gap: 15,
        justifyContent: 'space-between'
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardHeaderInfo: {

    },
    cardDate: {

    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7b2d7a'
    },
    cardTextDate: {
        fontSize: 16,
        color: 'rgba(80, 35, 99, 0.4)',
        fontWeight: '300',
    },
    cardHeaderCheck: {
        width: '19%',
        height: '100%',
    },
    cardCheck: {
        width: 50,
        height: 50,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: '#8733ab'
    },
    cardInfoContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center'
    },
    cardInfoQuestions: {
        height: 200,
        width: 250,
    },
    cardInfoPerformance: {

    },
    cardButtonsView: {
        borderRadius: 40,
    },
    cardButtonAnswer: {
        width: '100%',
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardTextAnswer: {
        fontSize: 18,
        color: 'white'
    },
    cardButtonVisualize: {
        width: '100%',
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardTextVisualize: {
        fontSize: 18,
        color: 'white'
    }
})

export default QuestionaireCard;