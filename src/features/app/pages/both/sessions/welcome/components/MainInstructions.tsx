import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { instructionsData } from '@utils/welcome_treatment/Instructions';
import { WelcomeMenuSelectOption } from '../WelcomeSession';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { screenHeight } from '@utils/layout/Screen_Size';
import useWelcomeAnimations from '../hooks/UseWelcomeAnimations';
import { UseLoading } from '@hooks/loading/UseLoading';
import { WelcomeInstruction } from 'types/welcome/Welcome_Types';
import FirebaseStorageService from 'src/__firebase__/services/FirebaseStorageService';
import DefaultLoading from '@components/loading/DefaultLoading';

interface MainInstructionsProps {
    selectedOption: WelcomeMenuSelectOption;
    goBackToMenu: () => void;
    backIconSize: number;
    instructionNavigationIconSize: number;
    loadingIconSize: number;
}

const MainInstructions = ({ selectedOption, goBackToMenu, backIconSize, loadingIconSize, instructionNavigationIconSize }: MainInstructionsProps) => {

    const [instructions, setInstructions] = useState<WelcomeInstruction[]>(instructionsData[selectedOption]);
    const { loading, setLoading } = UseLoading(true);
    const { currentStep, changeStep, animatedStyle } = useWelcomeAnimations({ initialStep: 0 });

    useEffect(() => {
        const loadInstructions = async () => {
            setLoading(true);
            try {
                const fetchedImages = await FirebaseStorageService.fetchInstructionsImages(selectedOption);
                console.log(fetchedImages);
                const updatedInstructions = instructionsData[selectedOption].map((instruction, index) => ({
                    ...instruction,
                    image: fetchedImages[index]
                }));
                console.log(updatedInstructions);
                setInstructions(updatedInstructions);
            } catch (error) {
                console.error("Error loading instructions:", error);
            }
            finally {
                setLoading(false);
            }
        };

        loadInstructions();
    }, [selectedOption]);

    const handleInstruction = (option: WelcomeMenuSelectOption) => {
        switch (option) {
            case 'Tratamento':
                return ['#2a316b', '#4f718f'];
            case 'Paciente':
                return ['#6b2a6b', '#834f8f'];
            case 'Doutor':
                return ['#2a676b', '#4f898f'];
            default:
                return ['#2a316b', '#4f718f'];
        }
    }

    const handleNext = () => {
        if (currentStep < instructions.length - 1) {
            changeStep(currentStep + 1);
        }
        else {
            goBackToMenu();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            changeStep(currentStep - 1);
        }
    };

    return (
        <ScrollView contentContainerStyle={{
            minHeight: screenHeight,
            width: '100%',
        }} style={styles.container}>
            <LinearGradient
                colors={handleInstruction(selectedOption)}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }} style={styles.gradient}>
                <View style={styles.navigationHeader}>
                    <TouchableOpacity style={styles.navigationButton} onPress={goBackToMenu}>
                        <MaterialIcons name="close" size={backIconSize / 1.1} color="white" style={{ opacity: 0.7 }} />
                    </TouchableOpacity>
                </View>

                {
                    instructions.length === 0 ?
                        <View style={styles.instructionsContainer}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.title}>{`Não há instruções disponíveis para ${selectedOption}`}</Text>
                            </View>
                        </View>
                        :
                        <Animated.View style={[styles.instructionsContainer, animatedStyle]}>
                            <View style={{ borderRadius: 20, flex: 1, width: '80%', backgroundColor: 'rgba(44, 45, 46, 0.3)', overflow: 'hidden' }}>
                                {
                                    loading ?
                                        <DefaultLoading size={loadingIconSize} color={"#edf2f0"} style={{ opacity: 0.5 }} />
                                        :
                                        instructions[currentStep].image && (
                                            <Image source={{ uri: instructions[currentStep].image }} style={styles.image} />
                                        )
                                }
                            </View>
                            <View style={{ height: '40%', paddingTop: '6%', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                                {
                                    instructions[currentStep].title ?
                                        <View style={{ width: '100%', alignItems: 'center', paddingVertical: '4%' }}>
                                            <Text style={styles.title}>{instructions[currentStep].title}</Text>
                                        </View>
                                        : ""
                                }
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={styles.content}>{instructions[currentStep].content}</Text>
                                </View>
                            </View>
                        </Animated.View>

                }

                {
                    instructions.length !== 0 &&
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={handlePrevious} disabled={currentStep === 0} style={[styles.button, { opacity: currentStep === 0 ? 0.5 : 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                            <MaterialIcons name="arrow-back" size={instructionNavigationIconSize} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNext} style={[styles.button, { backgroundColor: currentStep === instructions.length - 1 ? 'rgba(106, 217, 161, 0.5)' : 'rgba(255, 255, 255, 0.2)' }]}>
                            <MaterialIcons name={currentStep === instructions.length - 1 ? "check" : "arrow-forward"} size={instructionNavigationIconSize} color="white" />
                        </TouchableOpacity>
                    </View>
                }

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
        justifyContent: 'space-between',
        padding: '8%',
    },
    navigationHeader: {
        height: screenHeight * 0.1,
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    navigationButton: {
        width: '10%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#edf0f2',
        marginBottom: '10%',
        padding: '6%',
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    content: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        marginBottom: 20,
        resizeMode: 'cover',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        padding: '5%',
        borderRadius: 5,
    },
});

export default MainInstructions;