import React from 'react';
import { View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';

interface InitialHeaderProps {
    onBackPress: () => void;
}

const logo = images.generic_images.logo.logo_mobile_default;
const backButtonImg = images.generic_images.back.arrow_back_white;

const InitialHeader = ({ onBackPress }: InitialHeaderProps) => {

    return (
        <LinearGradient colors={['#ab32a5', '#54b0c4']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 0 }} style={styleInitialHeader.header}>
            <Image
                source={logo}
                style={styleInitialHeader.imageYouMind}
            />
            <TouchableOpacity onPress={onBackPress} style={styleInitialHeader.buttonBack}>
                <Image
                    source={backButtonImg}
                    style={styleInitialHeader.imgIconBack}
                />
            </TouchableOpacity>
        </LinearGradient>
    )
};

const styleInitialHeader = StyleSheet.create({
    header: {
        width: screenWidth,
        height: screenHeight * 0.15,
        paddingVertical: 5,
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 14,
    },
    buttonBack: {
        position: 'absolute',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        width: 45,
        height: 45,
        left: 0,
        top: 30,
    },
    imgIconBack: {
        width: 45,
        height: 45,
    },
    imageYouMind: {
        width: '100%',
        height: '70%',
        resizeMode: 'contain',
        marginBottom: 15,
    },
});

export default InitialHeader;