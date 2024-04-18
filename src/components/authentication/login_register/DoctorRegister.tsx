import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'
import { UseAuth } from '../../../providers/AuthenticationProvider';
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import { useNavigation, StackActions } from '@react-navigation/native';
import { AuthStackTypes } from '../../../navigation/stacks/MainStack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';
import { UseAuthentication } from '../../../services/auth/AuthenticationServices';

function DoctorRegister() {
    const { handleLogin, userType } = UseAuth();
    const navigation = useNavigation<AuthStackTypes>();
    const { RegisterUser, loading } = UseAuthentication();

    const [formDoctorData, setFormDoctorData] = useState({
        name: '',
        email: '',
        password: '',
        doctor_crm: '',
        phone: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(prevPass => !prevPass);
    }

    const handleInputChange = (field: any, value: any) => {
        setFormDoctorData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    }

    const turnToLogin = () => {
        handleLogin();
    }

    const verifyAccount = (data: any) => {
        console.log("VERIFY OTP!");
        console.log("DADOS A SEREM ENVIADOS AO OTP ROUTE: ", data);
        navigation.dispatch(StackActions.replace('otp', { data }));
        handleLogin();
    }

    const handleBackTypes = () => {
        navigation.navigate('choose_type');
    }

    const handleDoctorRegister = async () => {
        console.log("REGISTER DOCTOR: ", formDoctorData);
        if (formDoctorData.name && formDoctorData.password && formDoctorData.email && formDoctorData.phone && formDoctorData.doctor_crm) {
            const doctorData = {
                name: formDoctorData.name,
                email: formDoctorData.email,
                password: formDoctorData.password,
                phone: formDoctorData.phone,
                doctor_crm: formDoctorData.doctor_crm,
                type: userType
            }
            
            await RegisterUser(doctorData, userType, verifyAccount);
        }
        else{
            Alert.alert("Erro ao registrar usuário!", "Preencha todos os campos corretamente");
        }
    }


    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styleDocRegister.docRegister_scrollviewKeyboard}>
                {
                    loading ?
                        <LoadingAuthScreen />
                        : ""
                }
                <View style={styleDocRegister.docRegister_mainContainer}>
                    <LinearGradient colors={['#cdbea0', '#57afb5', '#326660']}
                        start={{ x: 0.7, y: 0 }}
                        end={{ x: 1, y: 0.3 }} style={styleDocRegister.docRegister_backgroundView}>
                        <View style={styleDocRegister.docRegister_backgroundChildView}>

                            <Image style={{ bottom: '-1%', right: -30, width: '85%', height: '69%', transform: [{ rotate: '-12deg' }], }} source={require('../../../assets/init/auth/doctor/doctor_background_auth.jpg')} />
                        </View>
                    </LinearGradient>

                    <View style={styleDocRegister.docRegister_headerContainer}>
                        <View style={styleDocRegister.docRegister_backArrowView}>
                            <TouchableOpacity onPress={() => handleBackTypes()} style={styleDocRegister.docRegister_backArrowButton}>
                                <Image style={styleDocRegister.docRegister_backArrowImg} source={require('../../../assets/init/back/arrow_back_white.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styleDocRegister.docRegister_titleView}>
                            <Text style={styleDocRegister.docRegister_titleText}>Cadastrar</Text>
                        </View>
                    </View>

                    <View style={styleDocRegister.docRegister_form}>

                        <View style={styleDocRegister.docRegister_inputsMainView}>
                            <View style={[styleDocRegister.docRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/doctor/doctor_icon.png')} />
                                <TextInput
                                    style={[styleDocRegister.docRegister_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="Nome"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={formDoctorData.name}
                                    onChangeText={value => handleInputChange('name', value)}
                                />
                            </View>
                            <View style={[styleDocRegister.docRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/doctor/email_doctor.png')} />
                                <TextInput
                                    style={[styleDocRegister.docRegister_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="E-mail"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={formDoctorData.email}
                                    onChangeText={value => handleInputChange('email', value)}
                                />
                            </View>
                            <View style={[styleDocRegister.docRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/doctor/phone_doctor.png')} />
                                <TextInput
                                    style={[styleDocRegister.docRegister_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="Telefone"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={formDoctorData.phone}
                                    onChangeText={value => handleInputChange('phone', value)}
                                />
                            </View>
                            <View style={[styleDocRegister.docRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/doctor/registration_doctor.png')} />
                                <TextInput
                                    style={[styleDocRegister.docRegister_input, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                    placeholder="Registro CRM"
                                    placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                    value={formDoctorData.doctor_crm}
                                    onChangeText={value => handleInputChange('doctor_crm', value)}
                                />
                            </View>
                            <View style={styleDocRegister.docRegister_userPassOptionsContainer}>
                                <View style={[styleDocRegister.docRegister_viewInput, { borderColor: `${userType === 'doctor' ? '#4193b0' : '#a541b0'}` }]}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../../assets/init/auth/doctor/pass_doctor.png')} />
                                    <TextInput
                                        style={[styleDocRegister.docRegister_inputPassword, { color: `${userType === 'doctor' ? '#1a586e' : '#5b1869'}` }]}
                                        placeholder="Senha"
                                        placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                        secureTextEntry={!showPassword}
                                        value={formDoctorData.password}
                                        onChangeText={value => handleInputChange('password', value)}
                                    />
                                    <TouchableOpacity style={styleDocRegister.docRegister_passwordIcon} onPress={handlePasswordVisibility}>
                                        <MaterialCommunityIcons
                                            name={showPassword ? 'eye' : 'eye-off'}
                                            size={27}
                                            color="#58878c"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <TouchableOpacity style={styleDocRegister.docRegister_loginButton} onPress={() => handleDoctorRegister()}>
                            <Image style={styleDocRegister.docRegister_imageButton} source={require('../../../assets/init/auth/doctor/doctor_button_background_auth.jpg')} />
                            <Text style={styleDocRegister.docRegister_loginButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                        <View style={styleDocRegister.doc_loginSection}>
                            <Text style={styleDocRegister.doc_loginText}>Já tem uma conta existente?</Text>
                            <TouchableOpacity onPress={() => turnToLogin()}>
                                <Text style={styleDocRegister.doc_loginLink}>Faça Login agora</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </KeyboardAwareScrollView>
        </ScrollView>
    )
};

const styleDocRegister = StyleSheet.create({
    docRegister_mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    docRegister_scrollviewKeyboard: {
        width: '100%',
        height: '100%'
    },
    docRegister_backgroundView: {
        transform: [{ rotate: '15deg' }],
        width: '140%',
        height: screenHeight * 0.5,
        top: '-10%',
        borderBottomRightRadius: 320,
    },
    docRegister_backgroundChildView: {
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
    docRegister_headerContainer: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    docRegister_backArrowView: {

    },
    docRegister_backArrowButton: {
        width: 40,
        height: 40,
    },
    docRegister_backArrowImg: {
        width: 30,
        height: 30,
    },
    docRegister_titleView: {
        width: '100%',
        paddingVertical: 25,
        alignItems: 'center'
    },
    docRegister_titleText: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold'
    },
    docRegister_form: {
        top: '-3%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        paddingHorizontal: 45,
    },
    docRegister_inputsMainView: {
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    docRegister_viewInput: {
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
    docRegister_input: {
        width: '88%',
        height: 40,
        fontSize: 16
    },
    docRegister_inputPassword: {
        width: '75%',
        height: 40,
        fontSize: 16
    },
    docRegister_passwordIcon: {

    },
    docRegister_userPassOptionsContainer: {
        width: '100%',
    },
    docRegister_imageButton: {
        position: 'absolute',
        width: '100%',
        height: 70,
        opacity: 0.8,
    },
    docRegister_loginButton: {
        marginTop: 40,
        width: '100%',
        paddingVertical: 20,
        borderRadius: 40,
        alignItems: 'center',
        overflow: 'hidden',
        top: '-5%'
    },
    docRegister_loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    doc_loginSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,

    },
    doc_loginText: {
        fontSize: 16,
        color: '#5c6a6b'
    },
    doc_loginLink: {
        fontSize: 16,
        color: '#2c696e',
        fontWeight: 'bold'
    }
})

export default DoctorRegister