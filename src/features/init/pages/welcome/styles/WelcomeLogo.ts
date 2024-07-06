import { screenHeight, screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet, Platform } from "react-native";


export const welcome_logo_style = () => {

    return StyleSheet.create({
        welcomeContent: {
            alignItems: 'center',
            width: '100%',
            paddingVertical: 50,
            gap: 60,
        },
        viewImage: {
            height: screenHeight * 0.29,
            width: screenWidth * 0.6,
            overflow: 'hidden',
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                },
                android: {
                    elevation: 8
                }
            })
        },
        imageYouMind: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
        },
        welcomeText: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#632b70'
        },

    });
}


