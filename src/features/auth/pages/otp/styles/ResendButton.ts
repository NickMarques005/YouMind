import { StyleSheet } from "react-native";

export const resend_button_style = () => {
    return StyleSheet.create({
        container: {
            width: '100%',
            paddingHorizontal: 15,
            paddingVertical: 20,
        },
        gradient: {
            paddingVertical: 20,
            paddingHorizontal: 20,
            minHeight: 70,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            color: 'white',
            fontSize: 16,
        }
    });
}