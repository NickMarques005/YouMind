import React from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import MainTreatments from '../search_chat/MainTreatments';

const Doctor_Treatment = () => {
    return (
        <View style={styleDoctorChat.screen_Chat}>
            <MainTreatments/>
        </View>

    );
};

const styleDoctorChat = StyleSheet.create({
    screen_Chat: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    chatEnvironment_View: {
        width: '100%',
        height: screenHeight,
        zIndex: 2,
    },
    header_Chat: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#b049c9',
        width: screenWidth,
        height: screenHeight * 0.136,
        top: 0,
        zIndex: 1,
        padding: 10,
        paddingBottom: screenHeight * 0.01,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 7,
        shadowRadius: 3.84,
        elevation: 80,

    },
    otherAccount_View: {
        flexDirection: 'row',
        height: screenHeight * 0.18,
        width: screenWidth * 0.7,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 15,

    },
    otherAccount_Button: {
        borderRadius: 50,
        marginTop: screenHeight * 0.01,
        marginRight: 15,
    },
    otherAccount_Image: {
        borderRadius: 50,
        width: 60,
        height: 60
    },
    otherUser_Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: screenHeight * 0.01
    },
    threepoints_View: {
        height: screenHeight * 0.1,
        marginTop: screenHeight * 0.01,
        alignItems: 'center',
        justifyContent: 'center',

    },
    threepoints_Button: {
        alignItems: 'center'
    },
    threepoints_Image: {
        width: 25,
        height: 25
    },
    chat: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        zIndex: 1,

    },
    chatContent_View: {

    },
    textInput_View: {
        width: '100%',
        position: 'absolute',
        height: screenHeight * 0.11,
        bottom: screenHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    input_View: {
        width: screenWidth * 0.78,
        height: screenHeight * 0.07,
        borderRadius: 35,
        flexDirection: 'row',
        backgroundColor: '#132042',
        borderColor: '#84f5e4',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 10
    },
    chat_TextInput: {
        width: screenWidth * 0.56,
        height: screenHeight * 0.046,
        marginLeft: -3,
        fontSize: 14,
        paddingLeft: 20,
        paddingBottom: 8,
        color: 'white',

    },
    chatButtons_View: {
        flexDirection: 'row',
    },
    chat_Button: {
        width: screenWidth * 0.08,
        height: screenHeight * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6
    },
    chatEnvio_Image: {
        width: '80%',
        height: '80%'
    },
    chatEmoji_Image: {
        width: '80%',
        height: '80%'
    },
    chatAudio_Button: {
        width: screenWidth * 0.142,
        height: screenHeight * 0.070,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70,
        marginLeft: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,

    },
    chatAudio_Image: {
        width: '100%',
        height: '100%',

    }

});

export default Doctor_Treatment;