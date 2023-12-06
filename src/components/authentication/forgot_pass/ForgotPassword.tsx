import React, { useState, useEffect } from 'react'; //importa biblioteca React
import { View, Image, Dimensions, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native'; //importa as bibliotecas de widgets de React Native
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { UseAuth } from '../../../contexts/AuthContext';

interface ForgotPasswordProps {
    isVisible: boolean;
    onClose: () => void;
}

const ForgotPassword = ({ isVisible, onClose }) => {
    const { userType } = UseAuth();

    //Navegation do app
    const navigation = useNavigation();

    //Função para enviar o email para resetar password
    const EnviarEmail = () => {
        //Executará o comando de envio de reset password para o e-mail correspondente
    }

    //O que irá retornar no modal ForgotPassword:
    return (
        <Modal visible={isVisible}
            animationType="none"
            transparent={true}>
            <Animated.View style={styleforgot.modalScreen}>

                <View style={styleforgot.container1}>
                    <TouchableOpacity onPress={onClose} style={styleforgot.buttonVoltar}>
                        {
                            userType === "doctor" ?
                                <Image
                                    source={require('../../../assets/init/back/arrow_back_doctor.png')}
                                    style={styleforgot.imgIconBack} />
                                :
                                <Image
                                    source={require('../../../assets/init/back/arrow_back_patient.png')}
                                    style={styleforgot.imgIconBack} />
                        }
                    </TouchableOpacity>
                    <View style={styleforgot.forgotContentView}>
                        <View style={styleforgot.container2}>
                            <Text style={[styleforgot.textEsqueceuSenha, { color: `${userType === 'doctor' ? '#20627a' : '#79266f'}` }]}>NÃO LEMBRA A SENHA?</Text>
                            <Text style={styleforgot.text1}>Não se preocupe! Digite seu endereço de e-mail. Será enviado um código de 4 dígitos para você resetá-la.</Text>
                        </View>

                        <TextInput style={[styleforgot.input, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}`, color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                            placeholder="Seu endereço de e-mail"
                            placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                        />
                        <LinearGradient colors={[`${userType === 'doctor' ? '#57afb5' : userType === 'patient' ? '#823d94' : ""}`, `${userType === 'doctor' ? '#326660' : userType === 'patient' ? '#4d2448' : ""}`]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0.2 }} style={styleforgot.buttonGradientEnviar}>
                            <TouchableOpacity style={styleforgot.buttonEnviar} onPress={EnviarEmail}>
                                <Text style={styleforgot.textEnviar}>ENVIAR</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                    </View>
                </View>

            </Animated.View>
        </Modal>
    );
};

const styleforgot = StyleSheet.create({
    modalScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(125, 143, 150, 0.5)',
        marginBottom: 0,
    },
    imgIconBack: {
        width: 40,
        height: 40,

    },
    container1: {
        backgroundColor: 'white',
        height: screenHeight * 0.6,
        width: screenWidth * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        paddingHorizontal: 30,
    },
    forgotContentView: {
        width: '100%',
    },
    container2: {
        width: '100%',
        height: screenHeight * 0.2,
        justifyContent: 'flex-start',
    },
    textEsqueceuSenha: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 12,
        marginLeft: 5,
        lineHeight: 45,
    },
    text1: {
        marginLeft: 5,
        fontSize: 15,
        marginRight: 5,
        marginBottom: 10,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#bfbfbf',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        marginVertical: 30,
        fontSize: 16,
    },
    buttonVoltar: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: -10,
        marginBottom: 30,
        marginLeft: -(screenWidth * 0.68),

    },
    buttonEnviar: {
        width: '100%',
        padding: 20,
        alignItems: 'center',

    },
    buttonGradientEnviar: {
        borderRadius: 30,
        width: '100%',
    },
    textEnviar: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }


});

export default ForgotPassword; //Retorna e exporta o modal ForgotPassword