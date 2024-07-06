import { screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native"


export const profile_data_style = (userType: string | undefined) => {

    return StyleSheet.create({
        screenProfileData: {
            width: screenWidth,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerProfileData: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
            paddingVertical: 25,
        },
        exitProfileData_Button: {
            height: 35,
            width: 35
        },
        accountView: {
            marginBottom: 30,
            gap: 5,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        accountUserPhotoView: {
    
        },
        accountButton: {
            width: 140,
            height: 140,
            borderRadius: screenWidth * 0.4,
            borderWidth: 7,
            borderColor: userType === 'doctor' ? '#ebfdff' : '#f9ebff',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
        },
        cameraIcon: {
            position: 'absolute',
            bottom: 5,
            right: 5,
            backgroundColor: userType === 'doctor' ? 'rgba(21, 63, 74, 0.6)' : 'rgba(62, 24, 82, 0.6)',
            borderRadius: 50,
            padding: 10
        },
        accountImage: {
            width: '102%',
            height: '102%',
            backgroundColor: '#602e75'
        },
        accountUserTextView: {
            maxWidth: '70%',
        },
        accountUserText: {
            marginVertical: 10,
            color: userType === 'doctor' ? '#167575' : '#611675',
            fontWeight: 'bold',
            fontSize: 22,
            textAlign: 'center',
        },
        profileMainOptionsView: {
            paddingHorizontal: 20,
            gap: 5,
        },
        headerProfileOptionsView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            marginBottom: 10,
        },
        editProfileDataButton: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 3,
        },
        editProfileDataButtonText: {
            color: userType === 'doctor' ? 'rgba(90, 158, 166, 0.8)': 'rgba(149, 90, 166, 0.8)'
        },
        profileOptionsView: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: userType === 'doctor' ? '#5ba4ba' : '#9f5bba'
        },
        profileOptionTemplate: {
            alignItems: 'flex-start',
            gap: 5,
        },
        profileOptionView: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 15,
        },
        profileOptionIcon: {
            marginRight: 10
        },
        profileOptionText: {
            fontSize: 16,
            color: 'black'
        }
    });
}