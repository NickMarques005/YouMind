import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight } from '@utils/layout/Screen_Size'
import { MaterialIcons } from '@expo/vector-icons';
import images from '@assets/images';

interface BackModalProps {
    closeModal: () => void;
    handleLeaveAnswerQuestionnaire: () => void;
}

const BackModal = ({ closeModal, handleLeaveAnswerQuestionnaire }: BackModalProps) => {
    const questionnaireTemplate = images.app_patient_images.health.quiz.answer_questionnaire_template;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.backInfo}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>
                            Deseja mesmo descartar esse questionário e voltar ao aplicativo?
                        </Text>
                        <Text style={styles.subTitle}>
                            Não se preocupe! Você pode respondê-lo novamente contanto que seja no mesmo dia.
                        </Text>
                    </View>
                    <View style={styles.illustrationView}>
                        <Image source={questionnaireTemplate} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <LinearGradient
                        colors={['#964e95', '#523a50']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.gradientButton}
                    >
                        <TouchableOpacity onPress={closeModal} style={styles.button}>
                            <Text style={styles.buttonText}>Voltar ao Questionário</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient
                        colors={['#a6569f', '#523a50']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.gradientButton}
                    >
                        <TouchableOpacity onPress={handleLeaveAnswerQuestionnaire} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Sair
                            </Text>
                            <MaterialIcons name="exit-to-app" size={20} color="white" style={styles.icon} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>
    )
}

export default BackModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    headerView: {
        height: '10%',
        width: '100%',
    },
    content: {
        width: '100%',
        borderRadius: 20,
        padding: '5%',
        alignItems: 'center',
    },
    backInfo: {
        width: '100%',
        alignItems: 'center',
    },
    titleView: {
        marginVertical: '5%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#75416b',
        textAlign: 'center',
        marginBottom: '2%',
    },
    subTitle: {
        fontSize: 16,
        color: '#75416b',
        textAlign: 'center',
    },
    illustrationView: {
        padding: '3%',
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