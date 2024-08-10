import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DefaultLoading from '@components/loading/DefaultLoading';
import { FormattedAnswer } from 'types/app/patient/health/Question_Types';
import { LoadingStructure } from 'types/loading/Loading_Types';

interface SendButtonProps {
    sendLoading: LoadingStructure;
    handleSendAnswers: (answers: FormattedAnswer[], id: string, onSuccess?: () => void) => Promise<void>;
    answers: FormattedAnswer[];
    questionnaireId: string;
    handleNavigateBackToApp: () => void;
    readyToSend: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({
    sendLoading,
    handleSendAnswers,
    answers,
    questionnaireId,
    handleNavigateBackToApp,
    readyToSend
}) => {
    return (
        <View style={styles.sendButtonContainer}>
            <TouchableOpacity onPress={() => handleSendAnswers(answers, questionnaireId, handleNavigateBackToApp)} disabled={!readyToSend || sendLoading.loading} style={[styles.sendButton, { opacity: !readyToSend || sendLoading.loading ? 0.5 : 1 }]}>
                <LinearGradient
                    colors={['#8f3ea3', '#523a50']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={styles.gradientButton}>
                    {
                        sendLoading.loading ?
                            <DefaultLoading size={30} color={'white'} />
                            :
                            <Text style={styles.sendButtonText}>Enviar</Text>
                    }
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

export default SendButton;

const styles = StyleSheet.create({
    sendButtonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    gradientButton: {
        width: '100%',
        paddingVertical: '5%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        fontSize: 16,
        color: 'white',
    },
});