
import { screenHeight } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native"


export const custom_check_input_style = (userType: string | undefined) => {

    return StyleSheet.create({
        container: {
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#ddd',
            overflow: 'hidden',
            flex: 1,
        },
        row: {
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            gap: 15,
        },
        icon: {

        },
        text: {
            fontSize: 18,
        },
    });
}