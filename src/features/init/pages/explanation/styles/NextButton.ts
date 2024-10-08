import { screenHeight, screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native";


export const explanation_nextbutton_style = () => {
    return StyleSheet.create({
        containerbuttonNext: {
            width: screenWidth * 0.8,
            height: screenHeight * 0.1,
            borderRadius: 15,
            elevation: 5,
            alignSelf: 'center',
            marginVertical: '10%'
        },
        buttonNext: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        textNext: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold'
        },
    });
}