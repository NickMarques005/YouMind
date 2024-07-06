import { screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native";


export const explanation_header_style = () => {
    return StyleSheet.create({
        buttonBack: {
            height: '50%',
            width: '100%',
        },
        imgIconBack: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
        },
        imageYouMind: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            marginBottom: 15,
        },
    });
}
