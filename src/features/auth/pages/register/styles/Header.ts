import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { StyleSheet } from 'react-native';

export const register_header_style = () => {
    return StyleSheet.create({
        mainHeader: {
            height: screenHeight * 0.4,
            width: '100%',
        },
        backgroundView: {
            transform: [{ rotate: '15deg' }],
            width: screenWidth * 1.41,
            height: screenHeight * 0.5,
            top: '-30%',
            left: '-25%',
            borderBottomRightRadius: screenWidth * 0.7,
            borderBottomLeftRadius: screenWidth * 0.65,
            
        },
        backgroundChildView: {
            transform: [{ rotate: '-2deg' }],
            width: '100%',
            height: '125%',
            borderBottomRightRadius: screenWidth * 0.68,
            borderBottomLeftRadius: screenWidth * 0.68,
            right: '5%',
            top: '-31%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            overflow: 'hidden'
        },
        headerContainer: {
            position: 'absolute',
            zIndex: 2,
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 40,
        },
        backArrowButton: {
            width: 40,
            height: 40,
        },
        backArrowImg: {
            width: 30,
            height: 30,
        },
        titleView: {
            width: '100%',
            paddingVertical: 25,
            alignItems: 'center'
        },
        titleText: {
            fontSize: 35,
            color: 'white',
            fontWeight: 'bold'
        },
    });
} 