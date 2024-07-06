import { StyleSheet } from "react-native";

export const resend_otp_style = () => {
    return StyleSheet.create({
        container: {
            flex: 0.7,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 30,
        },
        viewCallResend: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
        },
        textCallResend: {
            fontSize: 16,
            color: '#56438a',
        },
        buttonCallResend: {

        },
        textButtonCallResend: {
            fontSize: 16,
            fontStyle: 'italic',
            color: '#6341bf',
            fontWeight: 'bold',

        },
        viewResendOtp: {
            width: '100%',
            paddingHorizontal: 15,
            paddingVertical: 20,

        },
        buttonResend: {
            width: '100%',
            minHeight: '20%',
        },
        buttonResendGradient: {
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        textResend: {
            color: 'white',
            fontSize: 16,
        }
    });
}