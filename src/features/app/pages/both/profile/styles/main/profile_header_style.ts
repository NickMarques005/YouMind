import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';

export const profile_header_style = (userType: string | undefined) => {
    
    return StyleSheet.create({
        headerProfile: {
            width: screenWidth,
            height: screenHeight * 0.35,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
        },
        accountView: {
            display: 'flex',
            height: '100%',
            gap: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingBottom: 10,
        },
        accountButton: {
            width: 130,
            height: 130,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            borderWidth: 5,
            borderColor: userType === 'doctor' ? '#569da8' : '#cf88eb',
            overflow: 'hidden',
            backgroundColor: 'transparent',
            elevation: 10,
        },
        accountImage: {
            width: '102%',
            height: '102%',
        },
        accountUserText: {
            color: 'white',
            fontWeight: '900',
            fontSize: 18,
            textTransform: 'uppercase',
        },
        accountUserTextBackground: {
            flexDirection: 'row',
            borderRadius: 25,
            alignItems: 'center',
        },
        accountUserView: {
            flexDirection: 'row',
            alignItems: 'center',
            width: screenWidth,
            justifyContent: 'center',
        },
        accountUserButton: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 15,
            alignItems: 'center',
            marginLeft: 15,
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        accountDivisaIcon: {
            width: 30,
            height: 30,
        },
    });
}

