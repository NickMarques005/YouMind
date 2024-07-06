import { screenHeight } from '@utils/layout/Screen_Size';
import { StyleSheet } from 'react-native';
import { UserType } from 'types/user/User_Types';

export const register_form_style = (userType: UserType) => {
    return StyleSheet.create({
        form: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 25,
            paddingHorizontal: 45,
        },
        inputsMainView: {
            width: '100%',
            alignItems: 'center',
        },
        viewInput: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
            padding: 10,
            borderColor: userType === 'doctor' ? '#4193b0' : '#a541b0',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            backgroundColor: "white",
            width: '100%',
        },
        input: {
            flex: 1,
            paddingRight: 10,
            height: 40,
            fontSize: 16,
            color: userType === 'doctor' ? '#1a586e' : '#5b1869'
        },
        passwordIcon: {
        },
        imageButton: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.8,
        },
        registerButton: {
            minHeight: screenHeight * 0.1, 
            marginTop: 20,
            width: '100%',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: userType === 'doctor' ? '#4193b0' : '#a541b0',
        },
        registerButtonText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white'
        },
    });
} 