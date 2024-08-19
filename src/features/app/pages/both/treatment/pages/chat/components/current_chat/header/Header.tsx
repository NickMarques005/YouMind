import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react';
import images from '@assets/images';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { ChatUser } from 'types/chat/Chat_Types';
import { TreatmentScreenName } from 'types/navigation/Navigation_Types';
import useMenuAnimation from '@hooks/animation/UseMenuAnimation';
import ChatMenu from '../menu/ChatMenu';
import { UserType } from 'types/user/User_Types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface ChatHeaderProps {
    userType: string | undefined;
    chatUser?: ChatUser;
    navigateToTreatmentScreen: (screenName: TreatmentScreenName) => void;
    chatMenu: boolean;
    handleChatMenu: () => void;
}

const Header = ({
    userType,
    chatUser,
    navigateToTreatmentScreen,
    chatMenu,
    handleChatMenu
}: ChatHeaderProps) => {

    const { opacity, translateY, closeMenu } = useMenuAnimation({ isVisible: chatMenu, onClose: handleChatMenu });

    const userIcon = userType === 'doctor' ? images.app_doctor_images.chat.user_icon_chat : images.app_patient_images.chat.doctor_icon_chat;
    const userIconSize = responsiveSize * 0.15;
    const backIconSize = responsiveSize * 0.07;
    const backIcon = images.generic_images.back.arrow_back_white;
    const vertMenuIconSize = responsiveSize * 0.08;

    return (
        <>
            <View style={[styles.header_Chat, { backgroundColor: userType === 'doctor' ? '#3a94a6' : '#9b3aa6' }]}>
                <TouchableOpacity onPress={() => { navigateToTreatmentScreen('main_treatment') }}>
                    <Image style={{ width: backIconSize, height: backIconSize }} source={backIcon} />
                </TouchableOpacity>
                <View style={styles.otherAccount_View}>
                    <View style={{ width: userIconSize, height: userIconSize, borderRadius: userIconSize, overflow: 'hidden' }}>
                        <Image
                            source={chatUser?.avatar ? { uri: chatUser.avatar } : userIcon}
                            style={styles.otherAccount_Image}
                        />
                    </View>

                    <View style={{ display: 'flex', gap: 0, height: '100%', flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.otherUser_Text}>
                            {
                                chatUser && chatUser.name ? chatUser.name : userType === 'doctor' ? 'Paciente' : 'Doutor'
                            }
                        </Text>
                        <Text style={{ fontSize: 14, color: '#cbd1d6' }}>
                            {chatUser?.online ? "Online" : "Offline"}
                        </Text>
                    </View>
                </View>
                <View style={styles.threepoints_View}>
                    <TouchableOpacity onPress={() => { chatMenu ? closeMenu() : handleChatMenu() }} style={styles.threepoints_Button}>
                        <MaterialIcon
                            name="more-vert"
                            size={vertMenuIconSize}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {
                chatMenu &&
                <ChatMenu
                    opacity={opacity}
                    translateY={translateY}
                    closeChatMenu={closeMenu}
                    userType={userType as UserType}
                />
            }
        </>
    )
}

const styles = StyleSheet.create({
    header_Chat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight * 0.12,
        top: 0,
        zIndex: 1,
        paddingLeft: 15,
        paddingRight: 20,
        elevation: 80,
    },
    otherAccount_View: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '78%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    otherAccount_Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    otherUser_Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    threepoints_View: {
        height: '100%',
        marginTop: screenHeight * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
    },
    threepoints_Button: {
        alignItems: 'center'
    },
    threepoints_Image: {
        width: 25,
        height: 25
    },
});

export default Header;