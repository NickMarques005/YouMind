import React, { useState } from 'react'; //importa biblioteca React
import { View, Image, Dimensions, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'; //importa as bibliotecas de widgets de React Native
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import Home from './MenuPatientHome';
import Chat from './MenuPatientTreatment';
import Profile from './MenuPatientProfile';
import Health from './MenuPatientHealth';
import Bluetooth from './MenuPatientBluetooth';
import { AppStackTypes } from '../../../navigation/stacks/MainStack';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import { MenuTypes, UseMenu } from '../../../providers/MenuProvider';

const MenuPatient = () => {
    //Utilização do navigation: widget para o funcionamento da navegação entre telas através de Pilhas.
    //Será assim pelo navigation que tornará possível a mudança de widgets que retornarão na tela do dispositivo
    const navigation = useNavigation<AppStackTypes>();

    const MenuPatientOptions: { name: string, screen: MenuTypes, icon: any }[] = [         //Matriz contendo as propriedades de cada opção das opções do MenuPatient
        { name: 'Home', screen: 'homeScreen', icon: require('../../../assets/app_patient/menu/menu_patient_home.png') },
        { name: 'Tratamento', screen: 'treatmentScreen', icon: require('../../../assets/app_patient/menu/menu_patient_treatment.png') },
        { name: 'Perfil', screen: 'profileScreen', icon: require('../../../assets/app_patient/menu/menu_patient_user.png') },
        { name: 'Saúde', screen: 'healthScreen', icon: require('../../../assets/app_patient/menu/menu_patient_health.png') },
        { name: 'Bluetooth', screen: 'bluetoothScreen', icon: require('../../../assets/app_patient/menu/menu_patient_bluetooth.png') },
    ];

    const {selectedMenuOption, handleMenuOptionPress} = UseMenu();

    var current_option: string | null = null;

    const renderContent = () => {
        switch (selectedMenuOption) {
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
            case 'healthScreen':
                if (current_option != 'healthScreen') {
                    current_option = 'healthScreen';
                    return <Health />;
                }
                else {
                    console.log("Não atualizar tela!");
                }
            case 'bluetoothScreen':
                if (current_option != 'bluetoothScreen') {
                    current_option = 'bluetoothScreen';
                    return <Bluetooth />;
                }
                else {
                    console.log("Não atualizar tela!");
                }
            default:
                return <Home />;
        }
    };

    //Oque será retornado na tela MenuPatient:
    return (
        <View style={styleMenuPatient.screen}>
            <View style={styleMenuPatient.content}>{renderContent()}</View>

            <LinearGradient colors={[ '#c25adb', 'rgba(176, 73, 201, 1)', '#9837b0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }} style={styleMenuPatient.header}>
                {MenuPatientOptions.map((option, index) => (     //Mapeamento de todas as opções geradas do MenuPatient
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleMenuOptionPress(option.screen)}
                        style={[
                            styleMenuPatient.MenuPatientButton,
                            //index == MenuPatientOptions.length - 1 && styleMenuPatient.bluetoothButton,
                        ]}
                    >
                        <Image source={option.icon} style={styleMenuPatient.MenuPatient_Icon} />
                        <Text style={styleMenuPatient.MenuPatient_Text}>{option.name}</Text>
                    </TouchableOpacity>
                ))}
            </LinearGradient>
        </View>
    );
};

//Estilo da tela MenuPatient: 
const styleMenuPatient = StyleSheet.create({
    screen: {

    },
    content: {
        minHeight: screenHeight
    },
    header: {
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
    MenuPatientButton: {
        alignItems: 'center'
    },
    MenuPatient_Icon: {
        width: 40,
        height: 40,
    },
    MenuPatient_Text: {
        color: 'white',
        fontSize: 12
    }

});

export default MenuPatient; //Retorna e exporta a tela MenuPatient