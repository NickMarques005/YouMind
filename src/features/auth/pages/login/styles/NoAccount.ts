import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { StyleSheet } from 'react-native';
import { UserType } from 'types/user/User_Types';

export const no_account_style = (userType:UserType) => {
    return StyleSheet.create({
        registerSection: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            paddingVertical: 30
        },
        registerText: {
            fontSize: 16,
            color: userType === 'doctor' ? '#5c6a6b' : '#6b5c6a'
        },
        registerLink: {
            fontSize: 16,
            fontWeight: 'bold',
            color: userType === 'doctor' ? '#2c696e' : '#6e2c62'
        }
    })
}