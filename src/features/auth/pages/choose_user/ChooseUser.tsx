import React from 'react'; 
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'; //importa as bibliotecas de widgets de React Native
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';

import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { AuthStackTypes } from 'types/navigation/Navigation_Types';
import images from '@assets/images';
import ChooseUserTitle from './components/ChooseUserTitle';
import ChooseUserOptions from './components/ChooseUserOptions';

const ChooseUser = () => {

    return (
        <View style={styleChooseUser.chooseUser_mainView}>
            <ChooseUserTitle/>
            <ChooseUserOptions/>
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
});

export default ChooseUser; //Retorna e exporta o componente ChooseUser