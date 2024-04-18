import React from 'react'; 
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'; //importa as bibliotecas de widgets de React Native
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { UseAuth } from '@providers/AuthenticationProvider';

import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { AuthStackTypes } from 'types/stack/Navigation_Types';
import images from '@assets/images';

const ChooseUser = () => {
    const { handleUserType } = UseAuth();
    const navigation = useNavigation<AuthStackTypes>();

    const doctor_type_animation = images.animations.doctor_illustration;
    const patient_type_animation = images.animations.patient_illustration;
    const pensative_animation = images.animations.pensative_icon;

    const handleTypeChoice = (type: string) => {
        switch (type) {
            case "patient":
                console.log("PATIENT!");
                handleUserType(type);
                navigation.navigate('login');
                break;
            case "doctor":
                console.log("DOCTOR!");
                handleUserType(type);
                navigation.navigate('login');
                break;
            default:
                console.log("Tipo não definido ou desconhecido");
                break;
        }
    }

    return (
        <View style={styleChooseUser.chooseUser_mainView}>
            <View style={styleChooseUser.chooseUser_TitleContainer}>
                <Image style={styleChooseUser.chooseUser_imgBg} source={require('@assets/init/choose/choose_bg.png')} />
                <View style={styleChooseUser.chooseUser_titleView}>
                    <Text style={styleChooseUser.chooseUser_titleText}>
                        Quem é você?
                    </Text>
                    <View style={styleChooseUser.chooseUser_pensativeIconView}>
                        <LottieView style={{ width: 100, height: 100 }} source={pensative_animation} autoPlay loop />
                    </View>
                    <View style={{ position: 'absolute', overflow: 'hidden', height: 45, width: 45, borderRadius: 50, right: 0, top: -20, }}>
                        <Image style={{ width: 45, height: 45, opacity: 0.5, }} source={require('@assets/YouMind_Mobile.jpg')} />
                    </View>

                </View>
            </View>
            <View style={styleChooseUser.chooseUser_contentView}>


                <View style={styleChooseUser.chooseUser_buttonsMainView}>
                    <View style={styleChooseUser.chooseUser_ButtonsContainer}>
                        <LinearGradient colors={['#4d2448', '#823d94', '#729edb']}
                            start={{ x: 0, y: 0.7 }}
                            end={{ x: 1, y: 1 }} style={styleChooseUser.chooseUser_buttonStandard}>
                            <TouchableOpacity style={styleChooseUser.chooseUser_buttonTouch} onPress={() => handleTypeChoice("patient")}>
                                <View style={{ transform: [{ rotate: '-45deg' }] }}>
                                    <LottieView style={{ width: 180, height: 180 }} source={patient_type_animation} autoPlay loop />
                                </View>
                                <Text style={[styleChooseUser.chooseUser_buttonText, styleChooseUser.chooseUser_buttonTextPatient]}>Paciente</Text>
                            </TouchableOpacity>

                        </LinearGradient>
                        <LinearGradient colors={['#d9ae77', '#57afb5', '#326660']}
                            start={{ x: 0.7, y: 0 }}
                            end={{ x: 1, y: 1 }} style={[styleChooseUser.chooseUser_buttonStandard]}>
                            <TouchableOpacity style={styleChooseUser.chooseUser_buttonTouch} onPress={() => handleTypeChoice("doctor")}>
                                <View style={{ transform: [{ rotate: '-60deg' }] }}>
                                    <LottieView style={{ width: 150, height: 150 }} source={doctor_type_animation} autoPlay loop />
                                </View>
                                <Text style={[styleChooseUser.chooseUser_buttonText, styleChooseUser.chooseUser_buttonTextDoctor]}>Doutor</Text>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styleChooseUser = StyleSheet.create({
    chooseUser_mainView: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        alignItems: 'center',
    },
    chooseUser_titleView: {
        marginVertical: 45,
        marginHorizontal: 25,
    },
    chooseUser_TitleContainer: {
        width: '100%',
        height: '30%',
    },
    chooseUser_titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    chooseUser_pensativeIconView: {
        padding: 22,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chooseUser_imgBg: {
        position: 'absolute',
        width: '100%',
        height: '118%',
    },
    chooseUser_contentView: {
        width: '100%',
        paddingHorizontal: '10%',
        height: '70%',
        justifyContent: 'center',
        borderTopRightRadius: 60,
        elevation: 20,
        backgroundColor: '#fdedff',
    },
    chooseUser_buttonsMainView: {
        background: 'white',
        width: '100%',
        height: '56%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        paddingVertical: 10,

    },
    chooseUser_ButtonsContainer: {
        height: '140%',
        width: '136%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        transform: [{ rotate: '45deg' }],

    },
    chooseUser_buttonStandard: {
        width: '52%',
        height: '100%',
        borderRadius: 30,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',

    },
    chooseUser_buttonTextPatient: {
        position: 'absolute',
        right: '-10%',
        bottom: '26%',
        transform: [{ rotate: '-90deg' }],
    },
    chooseUser_buttonTextDoctor: {
        position: 'absolute',
        left: '-10%',
        top: '26%',
        transform: [{ rotate: '-90deg' }],
    },
    chooseUser_buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        textTransform: 'uppercase'
    },
    chooseUser_buttonTouch: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ChooseUser; //Retorna e exporta o componente ChooseUser