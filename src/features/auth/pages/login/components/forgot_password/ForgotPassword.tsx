import React, { SetStateAction, useState } from 'react'; //importa biblioteca React
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native'; //importa as bibliotecas de widgets de React Native
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import images from '@assets/images';
import CustomButton from '@components/button/CustomButton';
import CustomTextInput from '@components/text_input/CustomInput';
import { forgot_password_style } from './styles/ForgotPasswordModal';
import { HandleError } from 'types/error/Error_Types';
import { UseForgotPassword } from './hooks/UseForgotPassword';
import { UseLoading } from '@hooks/loading/UseLoading';
import DefaultLoading from '@components/loading/DefaultLoading';
import { UseErrors } from '@hooks/error/UseErrors';
import { MessageIcon } from '@components/modals/message/types/type_message_modal';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
}

interface ErrorHandlingProps {
    HandleResponseError: (error: string) => void;
}

interface MessageHandlingProps {
    HandleMessage: (msg: string, messageType: MessageIcon) => void
}

interface ForgotPasswordProps {
    modal: ModalProps;
    errorHandling: ErrorHandlingProps;
    messageHandling: MessageHandlingProps;
}

const ForgotPassword = ({ modal, errorHandling, messageHandling }: ForgotPasswordProps) => {
    const { isVisible, onClose } = modal;
    const { HandleResponseError } = errorHandling;
    const { HandleMessage } = messageHandling;

    const { userType } = UseAuth();
    const { HandleErrors, errors, ClearError } = UseErrors(['email']);
    const { loading, setLoading } = UseLoading();
    const { email, handleSendEmail, HandleEmailChange } = UseForgotPassword(HandleResponseError, setLoading, userType, HandleMessage, isVisible, HandleErrors, errors, ClearError);

    const arrow_back = userType === "doctor" ? images.generic_images.back.arrow_back_doctor : images.generic_images.back.arrow_back_patient;
    const colors = userType === 'doctor' ? ['#57afb5', '#326660'] : ['#823d94', '#4d2448'];

    const styles = forgot_password_style(userType);

    return (
        <Modal visible={isVisible} animationType="fade" transparent={true}>
            <Animated.View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.buttonBack}>
                            <Image source={arrow_back} style={styles.imgIconBack} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.viewTitle}>
                            <Text style={styles.title}>NÃO LEMBRA A SENHA?</Text>
                            <Text style={styles.description}>Não se preocupe! Digite seu endereço de e-mail. Será enviado um link para você resetá-la.</Text>
                        </View>
                        <CustomTextInput
                            placeholder="Seu endereço de e-mail"
                            value={email}
                            onChangeText={(e) => HandleEmailChange(e)}
                            placeholderTextColor='rgba(76, 108, 120, 0.5)'
                            inputStyle={styles.input}
                            viewStyle={styles.viewInput}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            editable={!loading}
                            error={errors.email}
                        />

                        <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }} style={styles.buttonGradient}>
                            <CustomButton title="ENVIAR"
                                onPress={handleSendEmail}
                                disabled={loading}
                                textStyle={styles.buttonText}
                                buttonStyle={styles.button}
                                loading={
                                    loading ? <DefaultLoading color={"white"} size={30} /> : undefined
                                } />
                        </LinearGradient>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    );
};

export default ForgotPassword; 