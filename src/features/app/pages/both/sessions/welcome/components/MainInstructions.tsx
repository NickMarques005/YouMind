import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { instructionsData } from '@utils/welcome_treatment/Instructions';
import { WelcomeMenuSelectOption } from '../WelcomeSession';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MainInstructionsProps {
    selectedOption: WelcomeMenuSelectOption;
    goBackToMenu: () => void;
}

const screenHeight = Dimensions.get('window').height;

const MainInstructions = ({ selectedOption, goBackToMenu }: MainInstructionsProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const instructions = instructionsData[selectedOption] || [];
    const translateX = useSharedValue(0);

    const handleNext = () => {
        if (currentStep < instructions.length - 1) {
            translateX.value = withSpring(-Dimensions.get('window').width);
            setCurrentStep(currentStep + 1);
            translateX.value = withSpring(0);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            translateX.value = withSpring(Dimensions.get('window').width);
            setCurrentStep(currentStep - 1);
            translateX.value = withSpring(0);
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    if (instructions.length === 0) {
        return <Text>{`Não há instruções disponíveis para ${selectedOption}`}</Text>;
    }

    return (
        <ScrollView contentContainerStyle={{
            minHeight: screenHeight,
            width: '100%',
        }} style={styles.container}>
            <LinearGradient
                colors={['#6b2a6b', '#c2927a']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }} style={styles.gradient}>
                <View style={styles.navigationHeader}>
                    <TouchableOpacity style={styles.navigationButton} onPress={goBackToMenu}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <Animated.View style={[styles.instructionsContainer, animatedStyle]}>
                    <Text style={styles.content}>{instructions[currentStep].content}</Text>
                    {instructions[currentStep].image && (
                        <Image source={{ uri: instructions[currentStep].image }} style={styles.image} />
                    )}
                </Animated.View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handlePrevious} disabled={currentStep === 0} style={styles.button}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext} disabled={currentStep === instructions.length - 1} style={styles.button}>
                        <MaterialIcons name="arrow-forward" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    navigationHeader: {
        height: screenHeight * 0.1,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    navigationButton: {
        width: '10%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    content: {
        fontSize: 16,
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
    },
});

export default MainInstructions;