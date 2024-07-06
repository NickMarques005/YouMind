import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, runOnJS, Easing, withSpring } from 'react-native-reanimated';
import images from '@assets/images';

interface IntroductionModalProps {
    isVisible: boolean;
    closeModal: () => void;
}

const IntroductionModal = ({ isVisible, closeModal }: IntroductionModalProps) => {
    const translateX = useSharedValue(0);
    const [firstTime, setFirstTime] = useState(true);
    useEffect(() => {
        if (isVisible) {
            if (firstTime) {
                translateX.value = 0;
                setFirstTime(false);
                return;
            }
            translateX.value = withSpring(0, { damping: 25, mass: 2, });
        }
    }, [isVisible]);

    const closeAnimation = () => {
        translateX.value = withSpring(screenWidth, { damping: 25, stiffness: 90, mass: 2 }, () => {
            runOnJS(closeModal)();
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const answerIllustration = images.app_patient_images.health.quiz.answer_questionnaire_illustration;

    return isVisible ? (
        <Animated.View style={[styles.container, animatedStyle]}>
            <LinearGradient
                colors={['#fae6f1', '#d6c1c9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.main}>
                <LinearGradient
                    colors={['#ad5e8d', '#80427b', '#523a50']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={styles.headerView}>
                    <View style={styles.backInfo}>
                        <Text style={styles.title}>Hora de responder seu Questionário Diário!</Text>
                        <Text style={styles.subTitle}>
                            Não se preocupe! Isso levará apenas alguns minutos, mas fará uma grande diferença.
                        </Text>
                    </View>
                </LinearGradient>
                <View style={styles.content}>
                    <View style={{}}>
                        <View style={{}}>
                            <Text style={{ color: '#643b69', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                                Por favor, seja honesto e transparente ao responder às perguntas a seguir. Se tiver alguma dúvida, não hesite em conversar com seu médico responsável pelo tratamento ou entrar em contato com nosso suporte.
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, width: '100%', padding: '5%' }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={answerIllustration} />
                    </View>
                    <LinearGradient
                        colors={['#a760a8', '#563a5e']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} style={styles.gradientButton}>
                        <TouchableOpacity onPress={closeAnimation} style={styles.button}>
                            <Text style={styles.buttonText}>
                                RESPONDER
                            </Text>
                            <MaterialIcons name="assignment" size={20} color="white" style={styles.icon} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </Animated.View>
    ) : null;
}

export default IntroductionModal

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(97, 74, 84, 0.6)',
        height: screenHeight,
        alignItems: 'center',
        width: '100%',
        zIndex: 10,
    },
    main: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        padding: '10%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerView: {
        height: '30%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6%'
    },
    backInfo: {
        width: '90%',
        alignItems: 'center',
    },
    titleView: {
        width: '70%',
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '2%',
    },
    subTitle: {
        fontSize: 18,
        color: '#d9c1de',
        textAlign: 'center',
    },
    illustrationView: {
        height: screenHeight * 0.15,
        width: '100%',
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    gradientButton: {
        width: '100%',
        borderRadius: 30,
        marginTop: '3%',
        overflow: 'hidden',
    },
    button: {
        width: '100%',
        height: screenHeight * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        marginLeft: '2%',
    }
});