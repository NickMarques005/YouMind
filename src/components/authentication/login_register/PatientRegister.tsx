import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'
import { UseAuth } from '../../../contexts/AuthContext';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthStackTypes } from '../../../routes/MainRouter';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';
import { UseAuthentication } from '../../../services/AuthenticationService';

function PatientRegister() {
    const { handleLogin, userType } = UseAuth();
    const navigation = useNavigation<AuthStackTypes>();
    const { RegisterUser, loading} = UseAuthentication();

    const [formPatientData, SetFormPatientData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(prevPass => !prevPass);
    }

    const handleInputChange = (field: any, value: any) => {
        SetFormPatientData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    }

    const turnToLogin = () => {
        handleLogin();
    }

    const handleBackTypes = () => {
        navigation.navigate('choose_type');
    }

    const handlePatientRegister = async () => {
        console.log("REGISTER PATIENT: ", formPatientData);
        if (formPatientData.name && formPatientData.password && formPatientData.email && formPatientData.phone) {

            const patientData = {
                name: formPatientData.name,
                email: formPatientData.email,
                password: formPatientData.password,
                phone: formPatientData.phone,
                type: userType
            }

            await RegisterUser(patientData, userType, turnToLogin);
        }
        else {
            Alert.alert("Houve um erro ao cadastrar usuário!", "Preencha todos os campos corretamente");
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={stylePatientRegister.patientRegister_scrollviewKeyboard}>
                {
                    loading ?
                        <LoadingAuthScreen />
                        : ""
                }
                <View style={stylePatientRegister.patientRegister_mainContainer}>
                    <LinearGradient colors={['#4d2448', '#823d94', '#729edb']}
                        start={{ x: 0.7, y: 0 }}
                        end={{ x: 1, y: 0.3 }} style={stylePatientRegister.patientRegister_backgroundView}>
                        <View style={stylePatientRegister.patientRegister_backgroundChildView}>

                            <Image style={{ bottom: '-1%', right: -30, width: '85%', height: '69%', transform: [{ rotate: '-18deg' }, { scaleX: -1 }], }} source={require('../../../assets/init/auth/patient/patient_background_auth.jpg')} />
                        </View>
                    </LinearGradient>

                    <View style={stylePatientRegister.patientRegister_headerContainer}>
                        <View style={stylePatientRegister.patientRegister_backArrowView}>
                            <TouchableOpacity onPress={() => handleBackTypes()} style={stylePatientRegister.patientRegister_backArrowButton}>
                                <Image style={stylePatientRegister.patientRegister_backArrowImg} source={require('../../../assets/init/back/arrow_back_white.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={stylePatientRegister.patientRegister_titleView}>
                            <Text style={stylePatientRegister.patientRegister_titleText}>Cadastrar</Text>
                        </View>
                    </View>

                    <View style={stylePatientRegister.patientRegister_form}>

                        <View style={stylePatientRegister.patientRegister_inputsMainView}>
                            <View style={[stylePatientRegister.patientRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/patient/user_patient.png')} />
                                <TextInput
                                    style={[stylePatientRegister.patientRegister_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="Nome"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={formPatientData.name}
                                    onChangeText={value => handleInputChange('name', value)}
                                />
                            </View>
                            <View style={[stylePatientRegister.patientRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/patient/email_patient.png')} />
                                <TextInput
                                    style={[stylePatientRegister.patientRegister_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="E-mail"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={formPatientData.email}
                                    onChangeText={value => handleInputChange('email', value)}
                                />
                            </View>
                            <View style={[stylePatientRegister.patientRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/patient/phone_patient.png')} />
                                <TextInput
                                    style={[stylePatientRegister.patientRegister_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="Telefone"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={formPatientData.phone}
                                    onChangeText={value => handleInputChange('phone', value)}
                                />
                            </View>
                            <View style={stylePatientRegister.patientRegister_userPassOptionsContainer}>
                                <View style={[stylePatientRegister.patientRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/patient/pass_patient.png')} />
                                    <TextInput
                                        style={[stylePatientRegister.patientRegister_inputPassword, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                        placeholder="Senha"
                                        placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                        secureTextEntry={!showPassword}
                                        value={formPatientData.password}
                                        onChangeText={value => handleInputChange('password', value)}
                                    />
                                    <TouchableOpacity style={stylePatientRegister.patientRegister_passwordIcon} onPress={handlePasswordVisibility}>
                                        <MaterialCommunityIcons
                                            name={showPassword ? 'eye' : 'eye-off'}
                                            size={27}
                                            color="#7c5a8f"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <TouchableOpacity style={stylePatientRegister.patientRegister_loginButton} onPress={() => handlePatientRegister()}>
                            <Image style={[stylePatientRegister.patientRegister_imageButton, { transform: [{ scaleX: -1 }] }]} source={require('../../../assets/init/auth/patient/patient_button_background_auth.jpg')} />
                            <Text style={stylePatientRegister.patientRegister_loginButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                        <View style={stylePatientRegister.patient_loginSection}>
                            <Text style={stylePatientRegister.patient_loginText}>Já tem uma conta existente?</Text>
                            <TouchableOpacity onPress={() => turnToLogin()}>
                                <Text style={stylePatientRegister.patient_loginLink}>Faça Login agora</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </KeyboardAwareScrollView>
        </ScrollView>
    )
};

const stylePatientRegister = StyleSheet.create({
    patientRegister_mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    patientRegister_scrollviewKeyboard: {
        width: '100%',
        backgroundColor: 'white',
        height: '100%'
    },
    patientRegister_backgroundView: {
        transform: [{ rotate: '15deg' }],
        width: '140%',
        height: screenHeight * 0.5,
        top: '-10%',
        borderBottomRightRadius: 320,
    },
    patientRegister_backgroundChildView: {
        transform: [{ rotate: '-2deg' }],
        width: '100%',
        height: '120%',
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 400,
        borderTopRightRadius: 300,
        right: 30,
        top: '-30%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden'
    },
    patientRegister_headerContainer: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    patientRegister_backArrowView: {

    },
    patientRegister_backArrowButton: {
        width: 40,
        height: 40,
    },
    patientRegister_backArrowImg: {
        width: 30,
        height: 30,
    },
    patientRegister_titleView: {
        width: '100%',
        paddingVertical: 25,
        alignItems: 'center'
    },
    patientRegister_titleText: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold'
    },
    patientRegister_form: {
        top: '-3%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        paddingHorizontal: 45,
    },
    patientRegister_inputsMainView: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    patientRegister_viewInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 10,
        borderColor: '#444f87',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        width: '100%',
    },
    patientRegister_input: {
        width: '88%',
        height: 40,
        fontSize: 16
    },
    patientRegister_inputPassword: {
        width: '75%',
        height: 40,
        fontSize: 16
    },
    patientRegister_passwordIcon: {

    },
    patientRegister_userPassOptionsContainer: {
        width: '100%',
    },
    patientRegister_imageButton: {
        position: 'absolute',
        width: '100%',
        height: 70,
        opacity: 0.8,
    },
    patientRegister_loginButton: {
        marginTop: 40,
        width: '100%',
        paddingVertical: 20,
        borderRadius: 40,
        alignItems: 'center',
        overflow: 'hidden',
        top: '-5%'
    },
    patientRegister_loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    patient_loginSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,

    },
    patient_loginText: {
        fontSize: 16,
        color: '#6b5c6a'
    },
    patient_loginLink: {
        fontSize: 16,
        color: '#6e2c62',
        fontWeight: 'bold'
    }
})

export default PatientRegister