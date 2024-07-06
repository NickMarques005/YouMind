import { screenHeight, screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native";

export const action_button_style = () => {

    return StyleSheet.create({
        buttonViewStart: {
            width: screenWidth * 0.8,
            height: screenHeight * 0.1,
            padding: 20,
            borderRadius: 15,
            backgroundColor: 'white',
            elevation: 5,
        },
        buttonStart: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        startText: {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
        }

    });
}
