import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { StyleSheet } from 'react-native';
import { UserType } from 'types/user/User_Types';

export const login_form_style = (userType: UserType) => {
    
    return StyleSheet.create({
        form: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        paddingTop: 25,
        paddingHorizontal: 45,
    },
    inputsMainView: {
        width: '100%',
        alignItems: 'center',
        
    },
    viewInput: {
        display: 'flex',
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
        height: 40,
        fontSize: 16,
        color: userType === 'doctor' ? '#1a586e' : '#5b1869',
        paddingRight: 10,
    },
    inputPassword: {
        width: '75%',
        height: 40,
        fontSize: 16,
    },
    passwordIcon: {
    },
    userPassOptionsContainer: {
        width: '100%',
    },
    imageButton: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    loginButton: {
            minHeight: screenHeight * 0.1, 
            marginTop: 20,
            width: '100%',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: userType === 'doctor' ? '#4193b0' : '#a541b0',
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    userOptionsView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    userRememberMeView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    userRememberMeButton: {
        width: 20,
        height: 20,
        borderRadius: 2,
        borderWidth: 0.8,
        borderColor: userType === 'doctor' ? '#62878a' : '#81628a'
    },
    userRememberMeText: {
        fontSize: 14,
        color: userType === 'doctor' ? 'rgba(59, 105, 110, 0.6)' : 'rgba(102, 59, 110, 0.6)'
    },
    RememberMeActive: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    userForgotPassView: {

    },
    userForgotPassButton: {

    },
    userForgotPassText: {
        fontSize: 16,
        color: userType === 'doctor' ? 'rgba(38, 110, 101, 0.5)' : 'rgba(110, 38, 110, 0.5)',
        fontWeight: 'bold'
    },
    })
}