import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { StyleSheet } from 'react-native';

export const otp_inputs_style = () => {

    return StyleSheet.create({
        otpContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: (screenWidth / 6) / 1.5,
            gap: 10,
        },
        input: {
            display: 'flex',
            width: screenWidth / 6,
            height: screenHeight / 8,
            borderWidth: 2,
            borderColor: '#9759c9',
            textAlign: 'center',
            fontSize: 35,
            fontWeight: 'bold',
            color: '#6314a3',
        },
    });
}