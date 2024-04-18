import React, { useState, useEffect, useRef } from 'react'
import {
    View, Linking, ActivityIndicator, ScrollView, Animated,
    ToastAndroid, Image, FlatList, Dimensions, ImageBackground, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '../../utils/layout/Screen_Size';
import WaveCallAnimation from './call/WaveCallAnimation';

function Health_Call() {

    const handleCall = () => {
        console.log("CALL FUNCTION!");
    }


    return (
        <SafeAreaView style={styleHealthCall.healthCall_mainContainer}>
            <View style={styleHealthCall.healthCall_contentView}>
                <>
                    {
                        [...Array(3).keys()].map((_, index) => {
                            return <WaveCallAnimation index={index} viewStyle={styleHealthCall.healthCall_viewWave} key={index} />
                        })
                    }
                    <LinearGradient colors={['#4d2448', '#ab32a5']}
                        start={{ x: 0.1, y: 0 }}
                        end={{ x: 0.3, y: 0.8 }} style={styleHealthCall.healthCall_viewTitle}>
                        <View style={styleHealthCall.healthCall_viewTitleContent}>
                            <View style={styleHealthCall.healthCall_viewTitleInfo}>
                                <LinearGradient colors={['#872282', 'transparent']}
                                    start={{ x: 0.1, y: 0 }}
                                    end={{ x: 0.6, y: 0.5 }} style={styleHealthCall.healthCall_designCircle}></LinearGradient>
                                <View style={styleHealthCall.healthCall_title}>
                                    <Text style={styleHealthCall.healthCall_textTitle}>
                                        Mantenha-se sempre saudável
                                    </Text>
                                </View>
                                <View style={styleHealthCall.healthCall_viewTextInfo}>
                                    <Text style={styleHealthCall.healthCall_textInfo}>
                                        Não está se sentindo bem? Não lute sozinho. Ligue para o Centro de Valorização a Vida e compartilhe seus sentimentos.
                                    </Text>
                                    <Text style={styleHealthCall.healthCall_textBoldInfo}>Sua saúde mental é importante!</Text>
                                </View>
                                <View style={styleHealthCall.healthCall_ViewHealthIllustration}>
                                    <Image style={styleHealthCall.healthCall_HealthIllustration} source={require('../../assets/health/call/call_illustration.png')} />
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => handleCall()} style={styleHealthCall.healthCall_ViewButtonHelp}>
                                <Image style={styleHealthCall.healthCall_ButtonHelp} source={require('../../assets/health/call/call_help_button.png')} />
                            </TouchableOpacity>
                        </View>

                    </LinearGradient>
                </>
                <LinearGradient colors={['#4d2448', '#733982']}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 0.3, y: 1 }} style={styleHealthCall.healthCall_viewBackground}>
                </LinearGradient>

            </View>
        </SafeAreaView>
    )
}

const styleHealthCall = StyleSheet.create({
    healthCall_mainContainer: {
        flex: 1,
        width: screenWidth,
        height: screenHeight * 0.9,
        alignItems: 'center',
    },
    healthCall_contentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    healthCall_mainImg: {

    },
    healthCall_viewTitle: {
        width: screenWidth * 1.5,
        height: '80%',
        borderRadius: 280,
        top: -80,
        zIndex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    healthCall_viewWave: {
        top: -90,
        position: 'absolute',
        width: screenWidth * 1,
        height: '80%',
        borderRadius: 200,
        zIndex: 1,
        backgroundColor: '#b14eba'
    },
    healthCall_viewBackground: {
        width: '100%',
        height: '50%',
        top: -(screenHeight * 0.4),

    },
    healthCall_viewTitleContent: {
        height: '70%',
        width: '60%',

    },
    healthCall_viewTitleInfo: {
        display: 'flex',
        gap: 30,
    },
    healthCall_designCircle: {
        position: 'absolute',
        borderRadius: 180,
        left: -40,
        bottom: -80,
        width: '110%',
        height: screenHeight * 0.45,
        zIndex: 1,
    },
    healthCall_title: {
        zIndex: 2,
    },
    healthCall_textTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f1e1f2',
        textTransform: 'uppercase',
        width: '70%',
        lineHeight: 40,
    },
    healthCall_viewTextInfo: {
        gap: 10,
        zIndex: 2,
    },
    healthCall_textInfo: {
        fontSize: 18,
        color: 'white',
        opacity: 0.7
    },
    healthCall_textBoldInfo: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        opacity: 0.7
    },
    healthCall_ViewHealthIllustration: {
        position: 'absolute',
        top: 0,
        right: -60,

    },
    healthCall_HealthIllustration: {
        opacity: 0.2,
        width: screenWidth * 0.85,
        height: screenHeight * 0.4,
        
    },
    healthCall_ViewButtonHelp: {
        position: 'absolute',
        bottom: -30,
        right: screenWidth * 0.34,
        elevation: 14,
    },
    healthCall_ButtonHelp: {
        width: 80,
        height: 80,
    },

});

export default Health_Call
