import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { StyleSheet } from 'react-native';

export const otp_header_style = () => {
    
    return StyleSheet.create({
        backButton: {
            backgroundColor: 'white',
            height: 60,
            width: 60,
            padding: 15,
            borderRadius: 50,
            elevation: 3
        },
        imgIconBack: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
        }
    })
}