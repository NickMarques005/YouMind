import { StyleSheet } from 'react-native';

export const otp_form_style = () => {

    return StyleSheet.create({
        formOtp: {
            gap: 45,
            paddingVertical: '20%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContainer: {
            paddingHorizontal: 50,
        },
        text: {
            color: '#8469cf',
            textAlign: 'center',
            fontSize: 20
        },
        buttonContainer: {
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: '#7f2f9c',
            marginTop: 45,
            overflow: 'hidden'
        },
        button: {
            width: '100%',
            height: '100%',
            padding: 15,
            
        },
        submitIcon: {
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            color: 'white',
        },
    });
}