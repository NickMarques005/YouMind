import { screenHeight, screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native";

export const explanation_content_style = () => {
    return StyleSheet.create({
        containerFuncionamento: {
            width: screenWidth,
            height: screenHeight * 0.22,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
            overflow:'hidden',
            top: '-2%'
        },
        textFuncionamento: {
            fontSize: 22,
            color: '#fce3fb',
            fontWeight: '800'
        },
        containerExplanation: {
            width: '100%',
        },
        containerLongText: {
            maxWidth: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: '3%',
            marginHorizontal: '6%',
            flexWrap: 'wrap',
        },
        titleWelcomeText: {
            fontSize: 22,
            textAlign: 'center',
            paddingVertical: '5%',
        },
        longText: {
            fontSize: 17,
            textAlign: 'center',
            paddingVertical: 10,
        },
    });
}
