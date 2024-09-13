import { screenWidth } from "@utils/layout/Screen_Size";
import { StyleSheet } from "react-native"


export const profile_data_style = (userType: string | undefined, backIconSize: number) => {

    return StyleSheet.create({
        screenProfileData: {
            width: '100%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
        },
        profileMainContainer: {
            paddingBottom: '10%',
            paddingHorizontal: 20
        },
        headerProfileData: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 25,
        },
        exitProfileData_Button: {
            height: backIconSize,
            width: backIconSize,
        },
        accountView: {
            gap: 5,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25
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
            backgroundColor: userType === 'doctor' ? '#2e6875' : '#602e75'
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
        restrictionProfileView: {
            width: '100%',
            flexDirection: 'row', 
            paddingVertical: 20, 
            gap: 10,
            alignItems: 'center'
        },
        restrictionContainerIcon: {
            
        },
        restrictionContainerTitle: {
            flex: 1,
        },
        restrictionTitleText: {
            fontSize: 19,
            fontWeight: '800',
            color: userType === 'patient' ? '#461c5c' : '#1c5c4c',
            width: '86%',
        },
        learnMoreText: {
            fontSize: 15, 
            fontWeight: '600', 
            color: userType === 'patient' ? '#7f37b0' : '#37b092'
        },
        profileMainOptionsView: {
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