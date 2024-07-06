import React, { LegacyRef, MutableRefObject, RefObject, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, TouchableOpacity, Text, StyleSheet, TextInput, Keyboard, Image } from 'react-native';
import { screenHeight, screenWidth } from '../../../../utils/layout/Screen_Size';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthStackTypes } from '../../../../navigation/stacks/MainStack';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import LoadingAuthScreen from '../../../../components/loading/LoadingScreen';

const inputs = Array(4).fill('');

type AuthStackParamList = {
    otp: {
        data?: any;
    }
}

let newInputIndex = 0;

const OTP = () => {
    const route = useRoute<RouteProp<AuthStackParamList, 'otp'>>();
    const navigation = useNavigation<AuthStackTypes>();
    const { ValidateOTP, loading } = UseAuthentication();
    const inputReferences: RefObject<TextInput>[] = inputs.map(() => React.createRef<TextInput>());
    const [OTP, setOTP] = useState<Record<number, string>>({
        0: '',
        1: '',
        2: '',
        3: ''
    });

    const [nextInputIndex, setNextInputIndex] = useState(0);

    const HandleChangeOTP = (text: string, index: number) => {
        const newOTP = { ...OTP };
        newOTP[index] = text;
        setOTP(newOTP);

        const lastInputIndex = inputs.length - 1;
        if (!text) {
            newInputIndex = index === 0 ? 0 : index - 1;
        }
        else {
            newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
        }

        setNextInputIndex(newInputIndex);
    };

    const isObjValid = (obj: Record<number, string>) => {
        return Object.values(obj).every((val) => val.trim());
    }

    const SubmitOTP = async () => {
        Keyboard.dismiss();
        if (isObjValid(OTP)) {

            console.log('OTP válido: ', OTP);
            let otpResult = '';

            Object.values(OTP).forEach(value => {
                otpResult += value;
            })

            const { data } = route.params;

            console.log(data);

            const res = await ValidateOTP(otpResult, data._id, data.type)

            console.log(res);
            return;
        }

        console.log("Preencha todos os campos do OTP corretamente ");
    };

    const HandleBackPress = () => {
        navigation.navigate('choose_type');
        console.log("De volta ao Login/ Register");
    }

    useEffect(() => {
        if (inputReferences[nextInputIndex] && inputReferences[nextInputIndex].current) {
            inputReferences[nextInputIndex].current?.focus();
        }
    }, [nextInputIndex]);

    return (
        <KeyboardAvoidingView style={OtpStyles.mainContainer}>
            {
                loading ?
                    <LoadingAuthScreen />
                    : ""
            }

            <View style={OtpStyles.header}>
                <TouchableOpacity onPress={() => HandleBackPress()} style={OtpStyles.backButton}>
                    <Image
                        source={require('../../../../assets/seta-back-type-2.png')}
                        style={OtpStyles.imgIconBack}
                    />
                </TouchableOpacity>
            </View>
            <View style={OtpStyles.contentOtp}>
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
            </View>
        </KeyboardAvoidingView>
    )
}

const OtpStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,

    },
    textContainer: {
        paddingHorizontal: 50,

    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: (screenWidth / 6) / 1.5
    },
    contentOtp: {
        gap: 45,
        paddingVertical: '20%',
        justifyContent: 'center'
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
        marginTop: 45,
    },
    submitIcon: {
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#7f2f9c',
        color: 'white',
        borderRadius: 50
    },
    header: {
        width: screenWidth,
        height: screenHeight * 0.15,
        paddingVertical: 5,
        paddingHorizontal: 25,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        zIndex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    backButton: {
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 3
    },
    imgIconBack: {
        width: 55,
        height: 55
    }
});

export default OTP;