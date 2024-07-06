import { screenHeight } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native";
import { UserType } from "types/user/User_Types";

export const default_modal_styles = (userType?: UserType) => {

    return StyleSheet.create({
        rootView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        overlay: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: userType === 'doctor' ? 'rgba(30, 65, 69, 0.5)' : 'rgba(51, 30, 69, 0.5)',
        },
        container: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            minHeight: screenHeight * 0.25,
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
    });
}