import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { ChatUser } from 'types/chat/Chat_Types';
import { TreatmentScreenName } from 'types/navigation/Navigation_Types';
import { UseChat } from '@providers/ChatProvider';

interface ChatHeaderProps{
    userType: string | undefined;
    chatUser?: ChatUser;
    navigateToTreatmentScreen: (screenName: TreatmentScreenName) => void
}

const Header = ({ userType, chatUser, navigateToTreatmentScreen }: ChatHeaderProps) => {
    const { handleRedirectChat } = UseChat();
    const userIcon = userType === 'doctor' ? images.app_doctor_images.chat.user_icon_chat : images.app_patient_images.chat.doctor_icon_chat;
    const backIcon = images.generic_images.back.arrow_back_white;
    const threePoinsIcon = images.generic_images.chat.three_points;

    return (
        <View style={[styles.header_Chat, { backgroundColor: userType === 'doctor' ? '#3a94a6' : '#9b3aa6'}]}>
            <TouchableOpacity onPress={() =>{ navigateToTreatmentScreen('main_treatment')}}>
                <Image style={{ width: 25, height: 25 }} source={backIcon} />
            </TouchableOpacity>
            <View style={styles.otherAccount_View}>
                <TouchableOpacity style={styles.otherAccount_Button}>
                    <Image
                        source={chatUser?.avatar ? { uri: chatUser.avatar } : userIcon}
                        style={styles.otherAccount_Image}
                    />
                </TouchableOpacity>

                <View style={{ display: 'flex', gap: 0, height: '100%', flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.otherUser_Text}>
                        {
                            chatUser && chatUser.name ? chatUser.name : userType === 'doctor' ? 'Paciente' : 'Doutor'
                        }
                    </Text>
                    <Text  style={{ fontSize: 14, color: '#cbd1d6'}}>
                        {chatUser?.online ? "Online" : "Offline"}
                    </Text>
                </View>
            </View>
            <View style={styles.threepoints_View}>
                <TouchableOpacity style={styles.threepoints_Button}>
                    <Image
                        source={threePoinsIcon}
                        style={styles.threepoints_Image}
                    />
                </TouchableOpacity>
            </View>
        </View>
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
    otherAccount_Button: {
        borderRadius: 50,
    },
    otherAccount_Image: {
        borderRadius: 50,
        width: 53,
        height: 53,
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