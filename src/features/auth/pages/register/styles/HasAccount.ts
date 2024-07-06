import { StyleSheet } from 'react-native';
import { UserType } from 'types/user/User_Types';

export const has_account_style = (userType: UserType) => {
    return StyleSheet.create({
        loginSection: {
            width: '100%',
            alignItems: 'center',
            paddingVertical: 30,
        },
        loginText: {
            fontSize: 16,
            color: userType === 'doctor' ? '#5c6a6b' : '#6b5c6a'
        },
        loginLink: {
            fontSize: 16,
            fontWeight: 'bold',
            color: userType === 'doctor' ? '#2c696e' : '#6e2c62'
        }
    });
}

