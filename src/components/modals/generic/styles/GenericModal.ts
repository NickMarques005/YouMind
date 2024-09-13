import { screenHeight } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native";
import { UserType } from "types/user/User_Types";

export const generic_modal_styles = (userType?: UserType) => {
    return StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            minHeight: screenHeight * 0.1,
            backgroundColor: 'white',
            padding: 20,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 5,
            zIndex: 5,
        },
        overlay: {
            width: '100%',
            height: '100%',
            backgroundColor: userType === 'doctor' ? 'rgba(30, 65, 69, 0.5)' : 'rgba(51, 30, 69, 0.5)',
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
        closeButton: {
            marginTop: 20,
            padding: 10,
            backgroundColor: '#ccc',
            borderRadius: 10,
        },
        closeButtonText: {
            color: 'white',
            fontSize: 16,
        },
    });
};