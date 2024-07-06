import { screenHeight } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native";
import { UserType } from "types/user/User_Types";

export const error_modal_styles = (userType: UserType) => {

    return StyleSheet.create({
        overlay: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        container: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            minHeight: screenHeight * 0.3,
            backgroundColor: 'white',
            padding: 20,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        dragHandle: {
            width: '20%',
            height: 4,
            backgroundColor: '#ccc',
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: 10,
            opacity: 0.6,
        },
        viewMessage: {
            width: '100%',
            paddingVertical: 30,
            minHeight: 20,
            gap: 15,
        },
        message: {
            marginBottom: 20,
            textAlign: 'center',
            fontSize: 16,
            color: userType === 'doctor' ? '#437573' : '#441d54',
        },
        button: {
            width: '100%',
        },
        buttonGradient: {
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonText: {
            color: 'white',
            fontSize: 16
        }
    });
}