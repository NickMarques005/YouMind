import React from 'react'; //importa biblioteca React
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'; //importa as bibliotecas de widgets de React Native
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@assets/images';

import { InitStackTypes } from '../../../types/stack/Navigation_Types';
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';

const Welcome = () => {
    const navigation = useNavigation<InitStackTypes>();

    const logo = images.generic_images.logo.logo_mobile_default; 

    const Start = () => {
        navigation.navigate('explanation');
    }

    return (
        <LinearGradient colors={["#6c3775", "#54b0c4", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.2, y: 0.5 }} style={stylewelcome.screen}>
            <View style={stylewelcome.welcomeContent}>
                <View style={stylewelcome.viewImage}>
                    <Image 
                        source={logo}
                        style={stylewelcome.imageYouMind}
                    />
                </View>


                <Text style={stylewelcome.welcomeText}>Bem-vindo!</Text>
            </View>

            <LinearGradient colors={['#ab32a5', '#54b0c4']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 0 }} style={stylewelcome.buttonViewStart}>
                <TouchableOpacity onPress={Start} style={stylewelcome.buttonStart}>
                    <Text style={stylewelcome.startText}>COMEÇAR</Text>
                </TouchableOpacity>
            </LinearGradient>
        </LinearGradient>

    );
};

const stylewelcome = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
    },
    welcomeContent: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: 50,
        gap: 60,
    },
    viewImage: {
        borderRadius: 5, 
        overflow: 'hidden'
    },
    imageYouMind: {
        width: screenWidth * 0.67,
        height: screenHeight * 0.32,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#632b70'
    },
    buttonViewStart: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.1,
        padding: 20,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 5,
    },
    buttonStart: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    startText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    }

});

export default Welcome; 