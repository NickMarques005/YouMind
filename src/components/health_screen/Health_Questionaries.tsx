import React from 'react'
import {
    View, Linking, ActivityIndicator, ScrollView,
    ToastAndroid, Image, FlatList, ImageBackground, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QuestionaireList from './questionaires/QuestionaireList';
import { UseQuestionaire } from '../../providers/QuestionariesProvider';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';


function Health_Questionaries() {
    const { questionaires } = UseQuestionaire();

    const activeIndex = useSharedValue(0);
    const handleFlingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
        if(activeIndex.value === 0)
        {
            return;
        }
        activeIndex.value = withTiming(activeIndex.value - 1, {duration: 400, easing: Easing.ease});
        console.log("CARD UP");
    });

    const handleFlingDown = Gesture.Fling().direction(Directions.DOWN).onStart(() => {
        if(activeIndex.value === questionaires.length)
        {
            return;
        }
        activeIndex.value = withTiming(activeIndex.value + 1, {duration: 400, easing: Easing.ease});
        console.log("CARD DOWN");
    });

    return (
        <SafeAreaView style={styleHealthQuestionaries.healthQuestionaries_mainView}>
            <LinearGradient colors={['#4d2448', '#ab32a5']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 0.3, y: 0.28 }} style={styleHealthQuestionaries.questionaire_contentView}>

                <Image style={styleHealthQuestionaries.questionaire_background} source={require('../../assets/health/questionaires/questionaires_background2.png')} />
                <View style={styleHealthQuestionaries.titleView}>
                    <Text style={styleHealthQuestionaries.titleText}>Questionários</Text>
                </View>
                <GestureHandlerRootView style={styleHealthQuestionaries.questionaire_listContainer}>
                    <GestureDetector
                        gesture={Gesture.Exclusive(handleFlingUp, handleFlingDown)}
                    >
                    <View style={styleHealthQuestionaries.questionaire_listView}>
                        <QuestionaireList activeIndex={activeIndex} questionaires={questionaires} />
                    </View>
                    </GestureDetector>
                </GestureHandlerRootView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styleHealthQuestionaries = StyleSheet.create({
    healthQuestionaries_mainView: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'white',
    },
    questionaire_contentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 80,
        gap: 15
    },
    questionaire_background: {
        position: 'absolute',
        width: screenWidth, 
        height: '100%', 
        opacity: 0.4
    },
    titleView: {
        width: '90%',
        height: 'auto',
        alignItems: 'center',
        paddingVertical: 30
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f1e1f2'
    },
    questionaire_listContainer: {
        display: 'flex',
        width: '100%',
        height: '70%',
        paddingHorizontal: 40,
    },
    questionaire_listView: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
})

export default Health_Questionaries