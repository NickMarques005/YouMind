import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { StyleSheet } from 'react-native';

export const profile_options_style = (userType: string | undefined) => {
    
    return StyleSheet.create({
    profileOptionsView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#e0dcdc',
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    profileOptionView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 10,
        justifyContent: 'flex-start',
    },
    profileOptionButton: {
        display: 'flex',
        height: screenHeight * 0.054,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    profileOptionIcon: {
        width: 35,
        height: 35,
    },
    profileDivisaIcon: {
        width: 25,
        height: 25,
        opacity: 0.2,
    },
    profileOptionText: {
        fontSize: 18,
        color: userType === 'doctor' ? '#2e8079' : '#8f326e'
    },
});

}