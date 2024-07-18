import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { UserData } from 'types/user/User_Types';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

interface UserChat {
    last_text?: string;
    time_last?: string;
    avatar?: string;
}

interface ChatTemplateUserProps {
    treatment: TreatmentInfoTemplate;
    userChat?: UserChat;
    userData?: UserData;
    handleActiveChat: (other_members: TreatmentInfoTemplate) => void
}

const TemplateChatUser = ({ treatment, userChat, userData, handleActiveChat }: ChatTemplateUserProps) => {
    const userIcon = userData?.type === 'patient' ? images.app_patient_images.chat.doctor_icon_chat : images.app_doctor_images.chat.user_icon_chat;
    const iconSize = responsiveSize * 0.17;

    return (
        <View style={{ display: 'flex', width: '100%', borderBottomWidth: 0.5, borderColor: 'white', }}>
            <LinearGradient colors={[`${userData?.type == "patient" ? "rgba(201, 175, 201, 0.8)" : "#b6c6cf"}`, `${userData?.type == "patient" ? 'transparent' : "transparent"}`,]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.3, y: 0.4 }} style={{ width: '100%', borderRadius: 5, paddingHorizontal: 10, borderBottomWidth: 1.5, borderBottomColor: userData?.type === 'patient' ? '#c6bacf' : '#a4abb3', paddingVertical: 5 }}>
                <TouchableOpacity onPress={() => handleActiveChat(treatment)} style={{ display: 'flex', flexDirection: 'row', paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ borderRadius: iconSize, overflow: 'hidden', height: '100%', backgroundColor: `${userData?.type === "patient" ? "#582869" : "#1a3d54"}` }}>
                        <Image style={{ width: iconSize, height: iconSize, opacity: 1 }} source={treatment.avatar ? { uri: treatment.avatar } : userIcon} />
                    </View>
                    <View style={{ width: '50%' }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: userData?.type === 'patient' ? '#543c57' : '#3c4a57' }}>{treatment.name}</Text>
                            <Text style={{ fontSize: 14, color: userData?.type === 'patient' ? '#99899c' : '#89939c' }}>{userChat && userChat.last_text}</Text>
                        </View>
                    </View>
                    <View style={{ width: '20%' }}>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default TemplateChatUser;