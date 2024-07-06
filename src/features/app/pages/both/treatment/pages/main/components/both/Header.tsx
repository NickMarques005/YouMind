import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesome } from '@expo/vector-icons';
import images from '@assets/images';
import { screenHeight } from '@utils/layout/Screen_Size';
import { UserData } from 'types/user/User_Types';
import { UseChat } from '@providers/ChatProvider';

interface TreatmentHeader {
    userType?: string;
    userData?: UserData;
    handleSearch?: () => void;
}

const Header = ({ userType, userData, handleSearch }: TreatmentHeader) => {
    const userIcon = userType === 'doctor' ? images.app_doctor_images.chat.doctor_icon_chat : images.app_patient_images.chat.user_icon_chat;
    const iconSize = 26;
    const iconButtonWidth = screenHeight * ((iconSize + 5) / 1000);

    return (
        <LinearGradient colors={[`${userType == "patient" ? "#753567" : "#355f75"}`, `${userType == "patient" ? '#9b3aa6' : "#3a94a6"}`,]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 0.28 }} style={styles.headerMessages_View}>
            <View style={styles.headerIcons_View}>
                <TouchableOpacity style={[styles.menuIcon_Button, { width: iconButtonWidth}]}>
                    <FontAwesome name="list" size={screenHeight * ((iconSize + 5) / 1000)} color="white" />
                </TouchableOpacity>
                <View style={styles.iconCurrentUser_View}>
                    <TouchableOpacity style={[styles.iconCurrentUser_Button, { backgroundColor: `${userType === "patient" ? "#582869" : "#1a3d54"}`, borderWidth: 2, borderColor: userType === 'doctor' ? '#8bbfc9' : '#cf88eb',  }]}>
                        <Image style={{ width: screenHeight * ((iconSize + 25) / 1000), height: screenHeight * ((iconSize + 25) / 1000) }} source={ userData?.avatar ? { uri: userData?.avatar } :userIcon} />
                    </TouchableOpacity>
                </View>
                {
                    userType === 'doctor' ?
                        <TouchableOpacity style={styles.menuIcon_Button} onPress={handleSearch}>
                            <FontAwesome name="search" size={screenHeight * ((iconSize + 5) / 1000)} color="white" />
                        </TouchableOpacity>
                        : 
                        <View style={[styles.menuIcon_Button, { width: iconButtonWidth }]}/>
                }
            </View>

        </LinearGradient>
    )
}

export default Header

const styles = StyleSheet.create({
    headerMessages_View: {
        position: 'absolute',
        width: '100%',
        height: screenHeight * 0.12,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 25,
        zIndex: 5
    },
    headerIcons_View: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuIcon_Button: {
        height: '100%',
        justifyContent: 'center'
    },
    iconCurrentUser_View: {
        height: '100%',
        alignSelf: 'center',
    },
    iconCurrentUser_Button: {
        borderRadius: 60,
        overflow: 'hidden',
    },
})