import { screenHeight, screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native";

export const explanation_content_style = () => {
    return StyleSheet.create({
        containerFuncionamento: {
            width: screenWidth * 0.8,
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            elevation: 15,
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
            overflow:'hidden',
            marginVertical: '6%'
        },
        textFuncionamento: {
            fontSize: 20,
            color: '#fce3fb'
        },
        containerLongText: {
            maxWidth: screenWidth * 0.9,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            flexWrap: 'wrap',
        },
        longText: {
            fontSize: 14,
            textAlign: 'center',
            padding: 5,
        },
    });
}
