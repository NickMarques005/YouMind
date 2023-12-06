import React, { useState } from 'react';
import { View, Text, Alert, Modal, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { UseAuth } from '../../../contexts/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ForgotPassword from '../forgot_pass/ForgotPassword';
import { AuthStackTypes } from '../../../routes/MainRouter';
import { ApiRequest } from '../../../services/APIService';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';
import { UseAuthentication } from '../../../services/AuthenticationService';

function DoctorLogin() {
    const navigation = useNavigation<AuthStackTypes>();
    const { signIn, handleLogin, userType } = UseAuth();
    const [modalForgotPassVisible, setModalForgotPassVisible] = useState(false);
    const { LoginUser, loading } = UseAuthentication();

    const [loginDoctorData, setLoginDoctorData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(prevPass => !prevPass);
    };

    const handleInputChange = (field: any, value: any) => {
        setLoginDoctorData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleForgotPassModal = () => {
        setModalForgotPassVisible(!modalForgotPassVisible);
    }

    const turnToRegister = () => {
        console.log("TURN TO REGISTER");
        handleLogin();
    };

    const handleBackTypes = () => {
        navigation.navigate('choose_type');
    }

    const handleDoctorLogin = async () => {
        console.log("ENTER LOGIN DOCTOR: ", loginDoctorData);
        if (loginDoctorData.email && loginDoctorData.password) {
            const doctorData = {
                email: loginDoctorData.email,
                password: loginDoctorData.password,
                type: userType
            }

            const response = await LoginUser(doctorData, userType);

            try {
                if (response?.token) {
                    const authToken = response?.token;
                    signIn(authToken);
                }
                else{
                    console.log(response?.errors);
                }
            }
            catch(err)
            {
                console.log("Houve um erro no login!!!");
            }
            
        }
        else {
            Alert.alert("Erro ao logar!", "Preencha todos os campos corretamente");
        }
    }


    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styleDocLogin.docLogin_scrollviewKeyboard}>
                {
                    loading ?
                        <LoadingAuthScreen />
                        : ""
                }
                <View style={styleDocLogin.docLogin_mainContainer}>
                    <LinearGradient colors={['#cdbea0', '#57afb5', '#326660']}
                        start={{ x: 0.7, y: 0 }}
                        end={{ x: 1, y: 0.3 }} style={styleDocLogin.docLogin_backgroundView}>
                        <View style={styleDocLogin.docLogin_backgroundChildView}>

                            <Image style={{ bottom: '-1%', right: -30, width: '85%', height: '69%', transform: [{ rotate: '-12deg' }], }} source={require('../../../assets/init/auth/doctor/doctor_background_auth.jpg')} />
                        </View>
                    </LinearGradient>

                    <View style={styleDocLogin.docLogin_headerContainer}>
                        <View style={styleDocLogin.docLogin_backArrowView}>
                            <TouchableOpacity onPress={() => handleBackTypes()} style={styleDocLogin.docLogin_backArrowButton}>
                                <Image style={styleDocLogin.docLogin_backArrowImg} source={require('../../../assets/init/back/arrow_back_white.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styleDocLogin.docLogin_titleView}>
                            <Text style={styleDocLogin.docLogin_titleText}>Entrar</Text>
                        </View>
                    </View>

                    <View style={styleDocLogin.docLogin_form}>

                        <View style={styleDocLogin.docLogin_inputsMainView}>
                            <View style={[styleDocLogin.docLogin_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/doctor/email_doctor.png')} />
                                <TextInput
                                    style={[styleDocLogin.docLogin_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="E-mail"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={loginDoctorData.email}
                                    onChangeText={value => handleInputChange('email', value)}
                                />
                            </View>
                            <View style={styleDocLogin.docLogin_userPassOptionsContainer}>
                                <View style={[styleDocLogin.docLogin_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/doctor/pass_doctor.png')} />
                                    <TextInput
                                        style={[styleDocLogin.docLogin_inputPassword, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                        placeholder="Senha"
                                        placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                        secureTextEntry={!showPassword}
                                        value={loginDoctorData.password}
                                        onChangeText={value => handleInputChange('password', value)}
                                    />
                                    <TouchableOpacity style={styleDocLogin.docLogin_passwordIcon} onPress={handlePasswordVisibility}>
                                        <MaterialCommunityIcons
                                            name={showPassword ? 'eye' : 'eye-off'}
                                            size={27}
                                            color="#58878c"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styleDocLogin.docLogin_userOptionsView}>
                                    <View style={styleDocLogin.docLogin_userRememberMeView}>
                                        <TouchableOpacity style={styleDocLogin.docLogin_userRememberMeButton}>

                                        </TouchableOpacity>
                                        <Text style={styleDocLogin.docLogin_userRememberMeText}>
                                            Lembre de mim
                                        </Text>
                                    </View>
                                    <View style={styleDocLogin.docLogin_userForgotPassView}>
                                        <TouchableOpacity onPress={() => handleForgotPassModal()} style={styleDocLogin.docLogin_userForgotPassButton}>
                                            <Text style={styleDocLogin.docLogin_userForgotPassText}>Esqueceu a senha?</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <TouchableOpacity style={styleDocLogin.docLogin_loginButton} onPress={() => handleDoctorLogin()}>
                            <Image style={styleDocLogin.docLogin_imageButton} source={require('../../../assets/init/auth/doctor/doctor_button_background_auth.jpg')} />
                            <Text style={styleDocLogin.docLogin_loginButtonText}>ENTRAR</Text>
                        </TouchableOpacity>
                        <View style={styleDocLogin.doc_registerSection}>
                            <Text style={styleDocLogin.doc_registerText}>Não possui conta ainda?</Text>
                            <TouchableOpacity onPress={() => turnToRegister()}>
                                <Text style={styleDocLogin.doc_registerLink}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ForgotPassword onClose={handleForgotPassModal} isVisible={modalForgotPassVisible} />

                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
};

const styleDocLogin = StyleSheet.create({
    docLogin_mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        height: screenHeight
    },
    docLogin_scrollviewKeyboard: {
        width: '100%',
        height: '100%'
    },
    docLogin_backgroundView: {
        transform: [{ rotate: '15deg' }],
        width: '140%',
        height: screenHeight * 0.5,
        top: '-10%',
        borderBottomRightRadius: 320,
    },
    docLogin_backgroundChildView: {
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
    docLogin_headerContainer: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    docLogin_backArrowView: {

    },
    docLogin_backArrowButton: {
        width: 40,
        height: 40,
    },
    docLogin_backArrowImg: {
        width: 30,
        height: 30,
    },
    docLogin_titleView: {
        width: '100%',
        paddingVertical: 25,
        alignItems: 'center'
    },
    docLogin_titleText: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold'
    },
    docLogin_form: {
        top: '-3%',
        width: '100%',
        height: '46%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        paddingHorizontal: 45,
    },
    docLogin_inputsMainView: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    docLogin_viewInput: {
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
    docLogin_input: {
        width: '88%',
        height: 40,
        fontSize: 16
    },
    docLogin_inputPassword: {
        width: '75%',
        height: 40,
        fontSize: 16
    },
    docLogin_passwordIcon: {

    },
    docLogin_userPassOptionsContainer: {
        width: '100%',
    },
    docLogin_imageButton: {
        position: 'absolute',
        width: '100%',
        height: 70,
        opacity: 0.8,
    },
    docLogin_loginButton: {
        marginTop: 20,
        width: '100%',
        paddingVertical: 20,
        borderRadius: 40,
        alignItems: 'center',
        overflow: 'hidden',
        top: '-5%'
    },
    docLogin_loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    docLogin_userOptionsView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    docLogin_userRememberMeView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    docLogin_userRememberMeButton: {
        width: 20,
        height: 20,
        borderColor: '#62878a',
        borderWidth: 2,
        borderRadius: 2,
    },
    docLogin_userRememberMeText: {
        fontSize: 14,
        color: 'rgba(59, 105, 110, 0.6)',
    },
    docLogin_userForgotPassView: {

    },
    docLogin_userForgotPassButton: {

    },
    docLogin_userForgotPassText: {
        fontSize: 16,
        color: 'rgba(38, 110, 101, 0.5)',
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
        color: '#5c6a6b'
    },
    doc_registerLink: {
        fontSize: 16,
        color: '#2c696e',
        fontWeight: 'bold'
    }
})

export default DoctorLogin;