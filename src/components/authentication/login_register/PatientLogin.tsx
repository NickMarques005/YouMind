import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { UseAuth } from '../../../contexts/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ForgotPassword from '../forgot_pass/ForgotPasswordModal';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthStackTypes } from '../../../routes/MainRouter';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';
import { UseAuthentication } from '../../../services/AuthenticationService';

function PatientLogin() {
    const navigation = useNavigation<AuthStackTypes>();
    const { signIn, handleLogin, userType } = UseAuth();
    const [modalForgotPassVisible, setModalForgotPassVisible] = useState(false);
    const { loading, LoginUser } = UseAuthentication();

    const [loginPatientData, setLoginPatientData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(prevPass => !prevPass);
    }

    const handleInputChange = (field: any, value: any) => {
        setLoginPatientData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    }

    const handleForgotPassModal = () => {
        setModalForgotPassVisible(!modalForgotPassVisible);
    }

    const turnToRegister = () => {
        console.log("TURN TO REGISTER");
        handleLogin();
    }

    const handleBackTypes = () => {
        navigation.navigate('choose_type');
    }

    const handleDoctorLogin = async () => {
        console.log("ENTER LOGIN PATIENT: ", loginPatientData);
        if (loginPatientData.email && loginPatientData.password) {
            const patientData = {
                email: loginPatientData.email,
                password: loginPatientData.password,
                type: userType
            }

            const response = await LoginUser(patientData, userType);

            try {
                if (response?.token) {
                    const authToken = response?.token;
                    signIn(authToken);
                }
                else {
                    console.log(response?.errors);
                }
            }
            catch (err) {
                console.log("Houve um erro no login!!!");
            }
        }
        else {

            Alert.alert("Erro ao logar!", "Preencha todos os campos corretamente");
        }

    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={stylePatientLogin.patientLogin_scrollviewKeyboard}>
                {
                    loading ?
                        <LoadingAuthScreen />
                        : ""
                }
                <View style={stylePatientLogin.patientLogin_mainContainer}>
                    <LinearGradient colors={['#4d2448', '#823d94', '#729edb']}
                        start={{ x: 0.7, y: 0 }}
                        end={{ x: 1, y: 0.3 }} style={stylePatientLogin.patientLogin_backgroundView}>
                        <View style={stylePatientLogin.patientLogin_backgroundChildView}>

                            <Image style={{ bottom: '-1%', right: -30, width: '85%', height: '69%', transform: [{ rotate: '-18deg' }, { scaleX: -1 }] }} source={require('../../../assets/init/auth/patient/patient_background_auth.jpg')} />
                        </View>
                    </LinearGradient>

                    <View style={stylePatientLogin.patientLogin_headerContainer}>
                        <View style={stylePatientLogin.patientLogin_backArrowView}>
                            <TouchableOpacity onPress={() => handleBackTypes()} style={stylePatientLogin.patientLogin_backArrowButton}>
                                <Image style={stylePatientLogin.patientLogin_backArrowImg} source={require('../../../assets/init/back/arrow_back_white.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={stylePatientLogin.patientLogin_titleView}>
                            <Text style={stylePatientLogin.patientLogin_titleText}>Entrar</Text>
                        </View>
                    </View>

                    <View style={stylePatientLogin.patientLogin_form}>

                        <View style={stylePatientLogin.patientLogin_inputsMainView}>
                            <View style={[stylePatientLogin.patientLogin_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/patient/email_patient.png')} />
                                <TextInput
                                    style={[stylePatientLogin.patientLogin_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="E-mail"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={loginPatientData.email}
                                    onChangeText={value => handleInputChange('email', value)}
                                />
                            </View>
                            <View style={stylePatientLogin.patientLogin_userPassOptionsContainer}>
                                <View style={[stylePatientLogin.patientLogin_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/patient/pass_patient.png')} />
                                    <TextInput
                                        style={[stylePatientLogin.patientLogin_inputPassword, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                        placeholder="Senha"
                                        placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                        secureTextEntry={!showPassword}
                                        value={loginPatientData.password}
                                        onChangeText={value => handleInputChange('password', value)}
                                    />
                                    <TouchableOpacity style={stylePatientLogin.patientLogin_passwordIcon} onPress={handlePasswordVisibility}>
                                        <MaterialCommunityIcons
                                            name={showPassword ? 'eye' : 'eye-off'}
                                            size={27}
                                            color="#7c5a8f"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={stylePatientLogin.patientLogin_userOptionsView}>
                                    <View style={stylePatientLogin.patientLogin_userRememberMeView}>
                                        <TouchableOpacity style={stylePatientLogin.patientLogin_userRememberMeButton}>

                                        </TouchableOpacity>
                                        <Text style={stylePatientLogin.patientLogin_userRememberMeText}>
                                            Lembre de mim
                                        </Text>
                                    </View>
                                    <View style={stylePatientLogin.patientLogin_userForgotPassView}>
                                        <TouchableOpacity onPress={() => handleForgotPassModal()} style={stylePatientLogin.patientLogin_userForgotPassButton}>
                                            <Text style={stylePatientLogin.patientLogin_userForgotPassText}>Esqueceu a senha?</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <TouchableOpacity style={stylePatientLogin.patientLogin_loginButton} onPress={() => handleDoctorLogin()}>
                            <Image style={[stylePatientLogin.patientLogin_imageButton, { transform: [{ scaleX: -1 }] }]} source={require('../../../assets/init/auth/patient/patient_button_background_auth.jpg')} />
                            <Text style={stylePatientLogin.patientLogin_loginButtonText}>ENTRAR</Text>
                        </TouchableOpacity>
                        <View style={stylePatientLogin.doc_registerSection}>
                            <Text style={stylePatientLogin.doc_registerText}>Não possui conta ainda?</Text>
                            <TouchableOpacity onPress={() => turnToRegister()}>
                                <Text style={stylePatientLogin.doc_registerLink}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ForgotPassword onClose={handleForgotPassModal} isVisible={modalForgotPassVisible} />

                </View>

            </KeyboardAwareScrollView>
        </ScrollView>
    )
};

const stylePatientLogin = StyleSheet.create({
    patientLogin_mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        height: screenHeight
    },
    patientLogin_scrollviewKeyboard: {
        width: '100%',
        height: '100%',

    },
    patientLogin_backgroundView: {
        transform: [{ rotate: '15deg' }],
        width: '140%',
        height: screenHeight * 0.5,
        top: '-10%',
        borderBottomRightRadius: 320,
    },
    patientLogin_backgroundChildView: {
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
    patientLogin_headerContainer: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    patientLogin_backArrowView: {

    },
    patientLogin_backArrowButton: {
        width: 40,
        height: 40,
    },
    patientLogin_backArrowImg: {
        width: 30,
        height: 30,
    },
    patientLogin_titleView: {
        width: '100%',
        paddingVertical: 25,
        alignItems: 'center'
    },
    patientLogin_titleText: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold'
    },
    patientLogin_form: {
        top: '-3%',
        width: '100%',
        height: '49%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        paddingHorizontal: 45,
    },
    patientLogin_inputsMainView: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    patientLogin_viewInput: {
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
    patientLogin_input: {
        width: '88%',
        height: 40,
        fontSize: 16,
    },
    patientLogin_inputPassword: {
        width: '75%',
        height: 40,
        fontSize: 16,
    },
    patientLogin_passwordIcon: {

    },
    patientLogin_userPassOptionsContainer: {
        width: '100%',
    },
    patientLogin_imageButton: {
        position: 'absolute',
        width: '100%',
        height: 70,
        opacity: 0.8,
    },
    patientLogin_loginButton: {
        marginTop: 20,
        width: '100%',
        paddingVertical: 20,
        borderRadius: 40,
        alignItems: 'center',
        overflow: 'hidden',
        top: '-5%',
    },
    patientLogin_loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    patientLogin_userOptionsView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    patientLogin_userRememberMeView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    patientLogin_userRememberMeButton: {
        width: 20,
        height: 20,
        borderColor: '#81628a',
        borderWidth: 2,
        borderRadius: 2,
    },
    patientLogin_userRememberMeText: {
        fontSize: 14,
        color: 'rgba(102, 59, 110, 0.6)',
    },
    patientLogin_userForgotPassView: {

    },
    patientLogin_userForgotPassButton: {

    },
    patientLogin_userForgotPassText: {
        fontSize: 16,
        color: 'rgba(110, 38, 110, 0.5)',
        fontWeight: 'bold'
    },
    doc_registerSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,

    },
    doc_registerText: {
        fontSize: 16,
        color: '#6b5c6a'
    },
    doc_registerLink: {
        fontSize: 16,
        color: '#6e2c62',
        fontWeight: 'bold'
    }
});

export default PatientLogin