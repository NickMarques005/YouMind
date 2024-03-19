import React, { LegacyRef, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, View, TouchableOpacity, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import { screenHeight, screenWidth } from '../../../../components/screen_size/Screen_Size';
import Icon from 'react-native-vector-icons/Ionicons';

const inputs = Array(4).fill('');

let newInputIndex = 0;

const OTPScreen = () => {
    const inputReferences : RefObject<TextInput>[] = inputs.map(() => React.createRef<TextInput>());
    const [OTP, setOTP] = useState<Record<number, string>>({
        0: '',
        1: '',
        2: '',
        3: ''
    });

    const [nextInputIndex, setNextInputIndex] = useState(0);

    const HandleChangeOTP = (text: string, index: number) => {
        const newOTP = {...OTP};
        newOTP[index] = text;
        setOTP(newOTP);

        const lastInputIndex = inputs.length - 1;
        if(!text){
            newInputIndex = index === 0 ? 0 : index - 1;
        }
        else{
            newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
        }
        
        setNextInputIndex(newInputIndex);

        console.log(newInputIndex);
    };

    const isObjValid = (obj: Record<number, string>) => {
        return Object.values(obj).every((val) => val.trim());
    }

    const SubmitOTP = () => {
        Keyboard.dismiss();
        if(isObjValid(OTP))
        {
            console.log('OTP válido: ', OTP);
            return;
        }
        
        console.log("Preencha todos os campos do OTP corretamente ");
    };



    useEffect(() => {
        if (inputReferences[nextInputIndex] && inputReferences[nextInputIndex].current) {
            inputReferences[nextInputIndex].current?.focus();
        }
    }, [nextInputIndex]);

    return (
        <KeyboardAvoidingView style={OtpStyles.mainContainer}>
            <View style={OtpStyles.textContainer}>
                <Text style={OtpStyles.text}>
                    PIN enviado ao seu e-mail! Por favor, verifique seu endereço de e-mail.
                </Text>
            </View>
            <View style={OtpStyles.otpContainer}>
                {
                    inputs.map((input, index) => {
                        return <TextInput
                            key={index.toString()}
                            keyboardType='numeric'
                            maxLength={1}
                            style={OtpStyles.input}
                            value={OTP[index]}
                            onChangeText={(text) => HandleChangeOTP(text, index)}
                            ref={inputReferences[index]}
                            placeholder={'*'}
                            placeholderTextColor={"rgba(183, 118, 207, 0.2)"}
                        />
                    })
                }
            </View>
            <TouchableOpacity onPress={() => SubmitOTP()} style={OtpStyles.button}>
                <Icon size={30} name="checkmark-outline" style={OtpStyles.submitIcon} />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const OtpStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 45
    },
    textContainer: {
        paddingHorizontal: 50,
        
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: (screenWidth / 6) / 1.5
    },
    text: {
        color: '#8469cf',
        textAlign: 'center',
        fontSize: 20
    },
    input: {
        display: 'flex',
        width: screenWidth / 6,
        height: screenHeight / 8,
        borderWidth: 2,
        borderColor: '#9759c9',
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        color: '#6314a3',
    },
    button: {
        marginTop: 45
    },
    submitIcon: {
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#7f2f9c',
        color: 'white',
        borderRadius: 50
    }
});

export default OTPScreen;