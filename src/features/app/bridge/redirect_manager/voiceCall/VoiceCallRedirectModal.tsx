import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserType } from 'types/user/User_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface VoiceCallStyle {
    modalHeight: number;
    iconSize: number;
    userType: UserType;
}

const VoiceCallRedirectModal: React.FC = () => {
    const { userData } = UseForm();
    const [isMuted, setIsMuted] = useState(false);
    const [user, setUser] = useState<TreatmentInfoTemplate | undefined>(undefined);
    const toggleMute = () => setIsMuted(!isMuted);

    const userIcon = userData?.type === 'doctor' ? images.app_doctor_images.chat.user_icon_chat :
        images.app_patient_images.chat.doctor_icon_chat;

    const modalHeight = screenHeight * 0.08;
    const iconSize = responsiveSize * 0.11;

    const callModalStyle = styles({
        modalHeight,
        iconSize,
        userType: userData?.type as UserType
    });

    return (
        <View style={callModalStyle.container}>
            <View style={callModalStyle.priorityIconView}>
                <View style={callModalStyle.avatarCallContainer}>
                    <Image source={user && user.avatar ? { uri: user.avatar } : userIcon} style={callModalStyle.avatarIcon} />
                </View>
            </View>
            <View style={callModalStyle.contentContainer}>
                <View style={callModalStyle.textContainer}>
                    <Text numberOfLines={1} style={callModalStyle.text}>{`Usuário`}</Text>
                    <Text style={callModalStyle.timer}>{`00:15:32`}</Text>
                </View>
                <TouchableOpacity onPress={toggleMute} style={callModalStyle.muteButton}>
                    <FontAwesome name={isMuted ? 'microphone-slash' : 'microphone'} size={iconSize * 0.6} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = (styleData: VoiceCallStyle) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 50,
        overflow: 'hidden',
        height: styleData.modalHeight,
        borderWidth: 3,
        borderColor: 'white',
    },
    priorityIconView: {
        height: '100%',
        width: screenWidth * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '1%',
        backgroundColor: styleData.userType === 'doctor' ? '#046d80' : '#6b0480'
    },
    avatarCallContainer: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
    },
    avatarIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    textContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        width: screenWidth * 0.35,
    },
    text: {
        fontSize: styleData.modalHeight * 0.25,
        fontWeight: 'bold',
    },
    timer: {
        fontSize: styleData.modalHeight * 0.25,
        color: 'gray',
    },
    muteButton: {
        width: styleData.iconSize,
        height: styleData.iconSize,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleData.userType === 'doctor' ? '#046d80' : '#6b0480',
        borderRadius: styleData.iconSize * 0.5
    },
});

export default VoiceCallRedirectModal;