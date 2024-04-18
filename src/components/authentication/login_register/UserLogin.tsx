import React, { useState } from 'react';
import {
    View, Text, StyleSheet, Alert, TextInput, ScrollView, TouchableOpacity, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ForgotPassword from '../forgot_pass/ForgotPasswordModal';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';
import { UseAuth, AuthContextData } from '../../../providers/AuthenticationProvider';
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import { AuthStackTypes } from '../../../navigation/stacks/MainStack';
import { Tokens } from '../../../types/auth/Auth_Types';

function UserLogin({ }) {

    const navigation = useNavigation<AuthStackTypes>();
    const { signIn, handleLogin, userType, saveTokenInAsyncStorage } = UseAuth();

    const { loading, LoginUser } = UseAuthentication();
    const [modalForgotPassVisible, setModalForgotPassVisible] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const loginStyles = UserLoginStyles(userType);

    const handlePasswordVisibility = () => {
        setShowPassword(prevPass => !prevPass);
    }

    const handleInputChange = (field: any, value: any) => {
        setLoginData(prevData => ({
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

    const LoginService = async () => {
        console.log("(UserLogin) ENTER LOGIN PATIENT: ", loginData);
        if (loginData.email && loginData.password) {
            const patientData = {
                email: loginData.email,
                password: loginData.password,
                type: userType
            }

            const response = await LoginUser(patientData, userType);

            try {
                console.log(response);
                if (response?.tokens) {
                    const tokens = response.tokens as Tokens;
                    if (tokens.accessToken && tokens.refreshToken) {
                        signIn(tokens.accessToken, tokens.refreshToken);
                        if (rememberMe) {
                            saveTokenInAsyncStorage(tokens.refreshToken);
                        }
                        return;
                    }
                    console.log("(UserLogin) Houve algum erro ao fazer SignIn...");
                }
                else {
                    console.log(response?.errors);
                }
            }
            catch (err) {
                console.log("(UserLogin) Houve um erro no login!!!");
            }
        }
        else {

            Alert.alert("Erro ao logar!", "Preencha todos os campos corretamente");
        }

    }

    const handleRememberMe = () => {
        console.log("(UserLogin) SAVE TOKEN!! * Remember me");
        setRememberMe(!rememberMe);
    }

    const backgroundHeader = userType === 'doctor' ? require('../../../assets/init/auth/doctor/doctor_background_auth.jpg') : require('../../../assets/init/auth/patient/patient_background_auth.jpg');
    const emailIcon = userType === 'doctor' ? require('../../../assets/init/auth/doctor/email_doctor.png') : require('../../../assets/init/auth/patient/email_patient.png');
    const passIcon = userType === 'doctor' ? require('../../../assets/init/auth/doctor/pass_doctor.png') : require('../../../assets/init/auth/patient/pass_patient.png');
    const loginButton = userType === 'doctor' ? require('../../../assets/init/auth/doctor/doctor_button_background_auth.jpg') : require('../../../assets/init/auth/patient/patient_button_background_auth.jpg');


    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={loginStyles.scrollviewKeyboard}>
                {
                    loading ?
                        <LoadingAuthScreen />
                        : ""
                }
                <View style={loginStyles.mainContainer}>
                    <LinearGradient colors={userType === 'doctor' ? ['#cdbea0', '#57afb5', '#326660'] : ['#4d2448', '#823d94', '#729edb']}
                        start={{ x: 0.7, y: 0 }}
                        end={{ x: 1, y: 0.3 }} style={loginStyles.backgroundView}>
                        <View style={loginStyles.backgroundChildView}>

                            <Image style={{ bottom: '-1%', right: -30, width: '85%', height: '69%', transform: [{ rotate: '-12deg' }], }} source={backgroundHeader} />
                        </View>
                    </LinearGradient>

                    <View style={loginStyles.headerContainer}>
                        <View style={loginStyles.backArrowView}>
                            <TouchableOpacity onPress={() => handleBackTypes()} style={loginStyles.backArrowButton}>
                                <Image style={loginStyles.backArrowImg} source={require('../../../assets/init/back/arrow_back_white.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={loginStyles.titleView}>
                            <Text style={loginStyles.titleText}>Entrar</Text>
                        </View>
                    </View>

                    <View style={loginStyles.form}>

                        <View style={loginStyles.inputsMainView}>
                            <View style={[loginStyles.viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={emailIcon} />
                                <TextInput
                                    style={[loginStyles.input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder={userType == 'patient' ? 'patienttest@gmail.com' : 'doctortest@gmail.com'}
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={loginData.email}
                                    onChangeText={value => handleInputChange('email', value)}
                                />
                            </View>
                            <View style={loginStyles.userPassOptionsContainer}>
                                <View style={[loginStyles.viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                    <Image style={{ width: 25, height: 25 }} source={passIcon} />
                                    <TextInput
                                        style={[loginStyles.inputPassword, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                        placeholder={userType == 'patient' ? 'PatientTest123' : 'DoctorTest123'}
                                        placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                        secureTextEntry={!showPassword}
                                        value={loginData.password}
                                        onChangeText={value => handleInputChange('password', value)}
                                    />
                                    <TouchableOpacity style={loginStyles.passwordIcon} onPress={handlePasswordVisibility}>
                                        <MaterialCommunityIcons
                                            name={showPassword ? 'eye' : 'eye-off'}
                                            size={27}
                                            color={userType === 'doctor' ? "#58878c" : "#7c5a8f"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={loginStyles.userOptionsView}>
                                    <View style={loginStyles.userRememberMeView}>
                                        <TouchableOpacity style={[loginStyles.userRememberMeButton, rememberMe ? loginStyles.RememberMeActive : null]} onPress={() => handleRememberMe()}>
                                            {
                                                rememberMe ?
                                                    <MaterialCommunityIcons
                                                        name="check"
                                                        size={20}
                                                        color={userType === 'doctor' ? "#58878c" : "#7c5a8f"}
                                                    />
                                                    : ""
                                            }
                                        </TouchableOpacity>
                                        <Text style={loginStyles.userRememberMeText}>
                                            Lembre de mim
                                        </Text>
                                    </View>
                                    <View style={loginStyles.userForgotPassView}>
                                        <TouchableOpacity onPress={() => handleForgotPassModal()} style={loginStyles.userForgotPassButton}>
                                            <Text style={loginStyles.userForgotPassText}>Esqueceu a senha?</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <TouchableOpacity style={loginStyles.loginButton} onPress={() => LoginService()}>
                            <Image style={loginStyles.imageButton} source={loginButton} />
                            <Text style={loginStyles.loginButtonText}>ENTRAR</Text>
                        </TouchableOpacity>
                        <View style={loginStyles.registerSection}>
                            <Text style={loginStyles.registerText}>Não possui conta ainda?</Text>
                            <TouchableOpacity onPress={() => turnToRegister()}>
                                <Text style={loginStyles.registerLink}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ForgotPassword onClose={handleForgotPassModal} isVisible={modalForgotPassVisible} />

                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

const UserLoginStyles = (userType: "doctor" | "patient" | "") => {
    return StyleSheet.create({
        mainContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
            height: screenHeight,
        },
        scrollviewKeyboard: {
            width: '100%',
            height: '100%'
        },
        backgroundView: {
            transform: [{ rotate: '15deg' }],
            width: '140%',
            height: screenHeight * 0.5,
            top: '-10%',
            borderBottomRightRadius: 320,
        },
        backgroundChildView: {
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
        headerContainer: {
            position: 'absolute',
            zIndex: 2,
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 40,
        },
        backArrowView: {},
        backArrowButton: {
            width: 40,
            height: 40,
        },
        backArrowImg: {
            width: 30,
            height: 30,
        },
        titleView: {
            width: '100%',
            paddingVertical: 25,
            alignItems: 'center'
        },
        titleText: {
            fontSize: 35,
            color: 'white',
            fontWeight: 'bold'
        },
        form: {
            top: '-3%',
            width: '100%',
            height: '49%',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            paddingHorizontal: 45,
        },
        inputsMainView: {
            width: '100%',
            alignItems: 'center',
            gap: 10,
        },
        viewInput: {
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
        input: {
            width: '88%',
            height: 40,
            fontSize: 16,
        },
        inputPassword: {
            width: '75%',
            height: 40,
            fontSize: 16,
        },
        passwordIcon: {},
        userPassOptionsContainer: {
            width: '100%',
        },
        imageButton: {
            position: 'absolute',
            width: '100%',
            height: 70,
            opacity: 0.8,
        },
        loginButton: {
            marginTop: 20,
            width: '100%',
            paddingVertical: 20,
            borderRadius: 40,
            alignItems: 'center',
            overflow: 'hidden',
            top: '-5%',
        },
        loginButtonText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white'
        },
        userOptionsView: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
        },
        userRememberMeView: {
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
        },
        userRememberMeButton: {
            width: 20,
            height: 20,
            borderRadius: 2,
            borderWidth: 0.8,
            borderColor: userType === 'doctor' ? '#62878a' : '#81628a'
        },
        userRememberMeText: {
            fontSize: 14,
            color: userType === 'doctor' ? 'rgba(59, 105, 110, 0.6)' : 'rgba(102, 59, 110, 0.6)'
        },
        RememberMeActive: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        userForgotPassView: {

        },
        userForgotPassButton: {

        },
        userForgotPassText: {
            fontSize: 16,
            color: userType === 'doctor' ? 'rgba(38, 110, 101, 0.5)' : 'rgba(110, 38, 110, 0.5)',
            fontWeight: 'bold'
        },
        registerSection: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
        },
        registerText: {
            fontSize: 16,
            color: userType === 'doctor' ? '#5c6a6b' : '#6b5c6a'
        },
        registerLink: {
            fontSize: 16,
            fontWeight: 'bold',
            color: userType === 'doctor' ? '#2c696e' : '#6e2c62'
        }
    })
}

export default UserLogin;



