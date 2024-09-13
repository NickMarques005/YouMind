import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import images from '@assets/images';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import useMenuAnimation from '@hooks/animation/UseMenuAnimation';
import { UserType } from 'types/user/User_Types';
import { ChatUser } from 'types/chat/Chat_Types';

interface DefaultChatHeaderProps {
    userType: UserType;
    chatUser: ChatUser | null; 
    handleChatNavigateBack: () => void;
    handleChatMenu: () => void;
    chatMenu: boolean;
    closeMenu: () => void;
}

const DefaultChatHeader: React.FC<DefaultChatHeaderProps> = ({
    userType,
    chatUser,
    handleChatNavigateBack,
    handleChatMenu,
    chatMenu,
    closeMenu
}) => {

    const userIcon = userType === 'doctor' ? images.app_doctor_images.chat.user_icon_chat : images.app_patient_images.chat.doctor_icon_chat;
    const userIconSize = responsiveSize * 0.15;
    const backIconSize = responsiveSize * 0.07;
    const backIcon = images.generic_images.back.arrow_back_white;
    const vertMenuIconSize = responsiveSize * 0.08;

    return (
        <View style={[styles.header_container, { backgroundColor: userType === 'doctor' ? '#3a94a6' : '#9b3aa6' }]}>
            <TouchableOpacity onPress={() => { handleChatNavigateBack() }}>
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
                    <Text numberOfLines={1} style={styles.otherUser_Text}>
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
    );
};

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
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

export default DefaultChatHeader;