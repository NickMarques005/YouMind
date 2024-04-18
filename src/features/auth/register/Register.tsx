import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UseAuth } from '../../../providers/AuthenticationProvider';

import { screenHeight } from '../../../utils/layout/Screen_Size';
import { AuthStackTypes } from '../../../types/stack/Navigation_Types';
import images from '@assets/images';

interface FormField {
    key: keyof FormData;
    placeholder: string;
    icon: any;
    isPassword?: boolean;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    phone: string;
    doctor_crm?: string;
}

const Register = () => {
    const navigation = useNavigation<AuthStackTypes>();
    const { userType } = UseAuth();

    const registerStyle = RegisterStyles(userType);

    const backButtonImg = images.generic_images.back.arrow_back_white;
    const registerButton = userType === 'doctor' ? images.generic_images.auth.doctor.doctor_button_auth : images.generic_images.auth.patient.patient_button_auth;
    const backgroundHeader = userType === 'doctor' ? images.generic_images.auth.doctor.doctor_background_auth : images.generic_images.auth.patient.patient_background_auth

    const register_icon = {
        name: userType === 'doctor' ? images.generic_images.auth.doctor.user_doctor : images.generic_images.auth.patient.user_patient,
        email: userType === 'doctor' ? images.generic_images.auth.doctor.email_doctor : images.generic_images.auth.patient.email_patient,
        phone: userType === 'doctor' ? images.generic_images.auth.doctor.phone_doctor : images.generic_images.auth.patient.phone_patient,
        doctor_crm: images.generic_images.auth.doctor.crm_doctor,
        password: userType === 'doctor' ? images.generic_images.auth.doctor.pass_doctor : images.generic_images.auth.patient.pass_patient
    }

    const formFields: FormField[] = [
        { key: 'name', placeholder: 'Nome', icon: register_icon.name },
        { key: 'email', placeholder: 'E-mail', icon: register_icon.email },
        { key: 'phone', placeholder: 'Telefone', icon: register_icon.phone },
        { key: 'doctor_crm', placeholder: 'Registro CRM', icon: register_icon.doctor_crm },
        { key: 'password', placeholder: 'Senha', icon: register_icon.password, isPassword: true }
    ];

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        phone: '',
        ...userType === 'doctor' && { doctor_crm: '' }
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handlePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleRegister = async () => {
        if (formData.name && formData.email && formData.password && formData.phone && userType === 'doctor' ? formData.doctor_crm : "") {
            const data = { ...formData, type: userType };

            console.log(data);
            /*await RegisterUser(data, userType, () => {
                navigation.dispatch(StackActions.replace('otp', { data }));
            });*/
        } else {
            console.log("Erro ao registrar usuário! Preencha todos os campos corretamente");
        }
    };

    const HandleAuthNavigation = () => {
        console.log("HandleAuthNavigation");
    }

    return (
        <ScrollView style={registerStyle.mainScrollView}>
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={registerStyle.scrollviewKeyboard}>
                <View style={registerStyle.mainContainer}>
                    <LinearGradient colors={['#cdbea0', '#57afb5', '#326660']}
                        start={{ x: 0.7, y: 0 }}
                        end={{ x: 1, y: 0.3 }} style={registerStyle.backgroundView}>
                        <View style={registerStyle.backgroundChildView}>

                            <Image style={{ bottom: '-1%', right: -30, width: '85%', height: '69%', transform: [{ rotate: '-12deg' }], }} source={backgroundHeader} />
                        </View>
                    </LinearGradient>

                    <View style={registerStyle.headerContainer}>
                        <TouchableOpacity onPress={() => HandleAuthNavigation()} style={registerStyle.backArrowButton}>
                            <Image style={registerStyle.backArrowImg} source={backButtonImg} />
                        </TouchableOpacity>
                        <View style={registerStyle.titleView}>
                            <Text style={registerStyle.titleText}>Cadastrar</Text>
                        </View>
                    </View>

                    <View style={registerStyle.form}>
                        <View style={registerStyle.inputsMainView}>
                            {formFields.map((field) => (
                                <View key={field.key} style={registerStyle.viewInput}>
                                    <Image style={{ width: 25, height: 25 }} source={field.icon} />
                                    <TextInput
                                        style={registerStyle.input}
                                        placeholder={field.placeholder}
                                        placeholderTextColor={`${userType === 'doctor' ? 'rgba(76, 108, 120, 0.5)' : 'rgba(110, 76, 120, 0.5)'}`}
                                        secureTextEntry={field.isPassword ? !showPassword : false}
                                        value={formData[field.key]}
                                        onChangeText={(value) => handleInputChange(field.key, value)}
                                    />
                                    {field.isPassword && (
                                        <TouchableOpacity style={registerStyle.passwordIcon} onPress={handlePasswordVisibility}>
                                            <MaterialCommunityIcons
                                                name={showPassword ? 'eye' : 'eye-off'}
                                                size={27}
                                                color="#58878c"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity style={registerStyle.registerButton} onPress={() => handleRegister()}>
                            <Image style={registerStyle.imageButton} source={registerButton} />
                            <Text style={registerStyle.registerButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={registerStyle.loginSection}>
                        <Text style={registerStyle.loginText}>Já tem uma conta existente?</Text>
                        <TouchableOpacity onPress={() => HandleAuthNavigation()}>
                            <Text style={registerStyle.loginLink}>Faça Login agora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

const RegisterStyles = (userType: "doctor" | "patient" | "") => {
    return StyleSheet.create({
        mainScrollView: {
            flex: 1
        },
        scrollviewKeyboard: {
            width: '100%',
            height: '100%'
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
            height: screenHeight,
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
            paddingHorizontal: 45,
        },
        inputsMainView: {
            width: '100%',
            alignItems: 'center',
        },
        viewInput: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
            padding: 10,
            borderColor: userType === 'doctor' ? '#4193b0' : '#a541b0',
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
            color: userType === 'doctor' ? '#1a586e' : '#5b1869'
        },
        passwordIcon: {
            position: 'absolute',
            right: 10,
            top: 12,
        },
        imageButton: {
            position: 'absolute',
            width: '100%',
            height: 70,
            opacity: 0.8,
        },
        registerButton: {
            marginTop: 20,
            width: '100%',
            paddingVertical: 20,
            borderRadius: 40,
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: userType === 'doctor' ? '#4193b0' : '#a541b0',
        },
        registerButtonText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white'
        },
        loginSection: {
            width: '100%',
            alignItems: 'center',
            paddingVertical: 10,
        },
        loginText: {
            fontSize: 16,
            color: userType === 'doctor' ? '#5c6a6b' : '#6b5c6a'
        },
        loginLink: {
            fontSize: 16,
            fontWeight: 'bold',
            color: userType === 'doctor' ? '#2c696e' : '#6e2c62'
        }
    });
}


export default Register;





