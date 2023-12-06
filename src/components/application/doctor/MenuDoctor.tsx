import React, { useState } from 'react'; //importa biblioteca React
import { View, Image, Dimensions, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Text, StyleSheet } from 'react-native'; //importa as bibliotecas de widgets de React Native
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Home from './MenuDoctorHome';
import Chat from './MenuDoctorTreatment';
import Profile from './MenuDoctorProfile';
import Analysis from './MenuDoctorAnalysis';
import Notepad from './MenuDoctorNotepad';

import { AppStackTypes } from '../../../routes/MainRouter';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';

const MenuDoctor = () => {
    //Utilização do navigation: widget para o funcionamento da navegação entre telas através de Pilhas.
    //Será assim pelo navigation que tornará possível a mudança de widgets que retornarão na tela do dispositivo
    const navigation = useNavigation<AppStackTypes>();

    const MenuDoctorOptions = [         //Matriz contendo as propriedades de cada opção das opções do MenuDoctor
        { name: 'Home', screen: 'homeScreen', icon: require('../../../assets/app_doctor/menu/menu_doctor_home.png') },
        { name: 'Tratamento', screen: 'treatmentScreen', icon: require('../../../assets/app_doctor/menu/menu_doctor_treatment.png') },
        { name: 'Perfil', screen: 'profileScreen', icon: require('../../../assets/app_doctor/menu/menu_doctor_user.png') },
        { name: 'Análises', screen: 'analysisScreen', icon: require('../../../assets/app_doctor/menu/menu_doctor_analysis.png') },
        { name: 'Notepad', screen: 'notepadScreen', icon: require('../../../assets/app_doctor/menu/menu_doctor_notepad.png') },
    ];

    const [selectedOption, setSelectedOption] = useState('Home'); //

    var current_option: string | null = null;

    const handleOptionPress = (option: string) => {
        setSelectedOption(option);
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'homeScreen':
                if (current_option == null || current_option != 'homeScreen') {
                    current_option = 'homeScreen';
                    return <Home />;
                }
                else {
                    console.log("Não atualizar tela!");
                }

            case 'treatmentScreen':
                if (current_option != 'treatmentScreen') {
                    current_option = 'treatmentScreen';
                    return <Chat />;
                }
                else {
                    console.log("Não atualizar tela!");
                }

            case 'profileScreen':
                if (current_option != 'profileScreen') {
                    current_option = 'profileScreen';
                    return <Profile />;
                }
                else {
                    console.log("Não atualizar tela!");
                }
            case 'analysisScreen':
                if (current_option != 'analysisScreen') {
                    current_option = 'analysisScreen';
                    return <Analysis />;
                }
                else {
                    console.log("Não atualizar tela!");
                }
            case 'notepadScreen':
                if (current_option != 'notepadScreen') {
                    current_option = 'notepadScreen';
                    return <Notepad />;
                }
                else {
                    console.log("Não atualizar tela!");
                }
            default:
                return <Home />;
        }

    };

    //Oque será retornado na tela MenuDoctor:
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styleMenuDoctor.screen}>
                <View style={styleMenuDoctor.content}>{renderContent()}</View>

                <LinearGradient colors={['#60b5b2', '#40a3a2', '#2d7d79']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }} style={styleMenuDoctor.menu}>
                    {MenuDoctorOptions.map((option, index) => (     //Mapeamento de todas as opções geradas do MenuDoctor
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleOptionPress(option.screen)}
                            style={[
                                styleMenuDoctor.MenuDoctorButton,
                                //index == MenuDoctorOptions.length - 1 && styleMenuDoctor.notepadButton,
                            ]}
                        >
                            <Image source={option.icon} style={styleMenuDoctor.MenuDoctor_Icon} />
                            <Text style={styleMenuDoctor.MenuDoctor_Text}>{option.name}</Text>
                        </TouchableOpacity>
                    ))}
                </LinearGradient>
            </View>
        </KeyboardAvoidingView>
    );
};

//Estilo da tela MenuDoctor: 
const styleMenuDoctor = StyleSheet.create({
    screen: {

    },
    content: {
        minHeight: screenHeight
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight * 0.10,
        position: 'absolute',
        bottom: 0,
        zIndex: 5,
    },
    buttonVoltar: {
        position: 'absolute',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 20,
        width: 20,
        left: 10,
        margin: 10,
        top: 20
    },
    imgIconBack: {
        width: 40,
        height: 40,
    },
    MenuDoctorButton: {
        alignItems: 'center'
    },
    MenuDoctor_Icon: {
        width: 40,
        height: 40,
    },
    MenuDoctor_Text: {
        color: 'white',
        fontSize: 12
    }

});

export default MenuDoctor; //Retorna e exporta a tela MenuDoctor