import { screenHeight } from "@utils/layout/Screen_Size"
import { StyleSheet } from "react-native"

export const choose_title_style = () => {

    return StyleSheet.create({
        chooseUser_TitleContainer: {
            width: '100%',
            height: '35%',
        },
        chooseUser_titleView: {
            marginVertical: 45,
            marginHorizontal: 25,
        },
        chooseUser_titleText: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
        },
        chooseUser_pensativeIconView: {
            padding: '7%',
            height: screenHeight * 0.2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        chooseUser_imgBg: {
            position: 'absolute',
            width: '100%',
            height: '118%',
        }
    })
}