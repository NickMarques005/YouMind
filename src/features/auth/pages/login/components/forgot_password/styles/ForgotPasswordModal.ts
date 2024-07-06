import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { StyleSheet } from 'react-native';
import { UserType } from 'types/user/User_Types';

export const forgot_password_style = (userType: UserType) => {

    return StyleSheet.create({
            overlay: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(125, 143, 150, 0.5)',
            },
            container: {
                backgroundColor: 'white',
                minHeight: screenHeight * 0.6,
                width: screenWidth * 0.9,
                borderRadius: 20,
                justifyContent: 'space-between',
                padding: 30,
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 10,
            },
            header: {

            },
            content: {
                width: '100%',
                gap: 10,
            },
            viewTitle: {
                gap: 10,
            },
            title: {
                fontSize: 30,
                fontWeight: 'bold',
                color: userType === 'doctor' ? '#20627a' : '#79266f',
            },
            description: {
                fontSize: 15,
                marginBottom: 30,
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
                height: 40,
                fontSize: 16,
                color: userType === 'doctor' ? '#1a586e' : '#5b1869'
            },
            buttonBack: {
                alignSelf: 'flex-start',
                marginBottom: 20,
            },
            imgIconBack: {
                width: 40,
                height: 40,
            },
            buttonGradient: {
                borderRadius: 30,
                minHeight: '15%',
                justifyContent: 'center',
            },
            button: {
                alignItems: 'center'
            },
            buttonText: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16
            }
    })
}