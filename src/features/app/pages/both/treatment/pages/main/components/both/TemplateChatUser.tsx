import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { UserData } from 'types/user/User_Types';
import { responsiveSize } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { formatDateForChat } from '@utils/date/DateFormatting';

interface ChatTemplateUserProps {
    treatment: TreatmentInfoTemplate;
    userData?: UserData;
    handleActiveChat: (chat: TreatmentInfoTemplate) => void
}

const TemplateChatUser = ({ treatment, userData, handleActiveChat }: ChatTemplateUserProps) => {
    const userIcon = userData?.type === 'patient' ? images.app_patient_images.chat.doctor_icon_chat : images.app_doctor_images.chat.user_icon_chat;
    const iconSize = responsiveSize * 0.17;
    const msgCountSize = responsiveSize * 0.082;
    const userChat = treatment.chat;

    return (
        <View style={{ display: 'flex', width: '100%', borderBottomWidth: 0.5, borderColor: 'white', }}>
            <LinearGradient colors={[`${userData?.type == "patient" ? "rgba(201, 175, 201, 0.8)" : "#b6c6cf"}`, `${userData?.type == "patient" ? 'transparent' : "transparent"}`,]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.3, y: 0.4 }} style={{ width: '100%', borderRadius: 5, paddingHorizontal: 10, borderBottomWidth: 1.5, borderBottomColor: userData?.type === 'patient' ? '#c6bacf' : '#a4abb3', paddingVertical: 5 }}>
                <TouchableOpacity onPress={() => handleActiveChat(treatment)} style={{ display: 'flex', flexDirection: 'row', paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ borderRadius: iconSize, overflow: 'hidden', height: iconSize, backgroundColor: `${userData?.type === "patient" ? "#582869" : "#1a3d54"}` }}>
                        <Image style={{ width: iconSize, height: iconSize, opacity: 1 }} source={treatment.avatar ? { uri: treatment.avatar } : userIcon} />
                    </View>
                    <View style={{ flex: 1, paddingLeft: '2%', height: '100%' }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', flex: 1, }}>
                            <View style={{ justifyContent: 'center', flex: 1, }}>
                                <Text
                                    style={{ fontSize: 18, fontWeight: 'bold', color: userData?.type === 'patient' ? '#543c57' : '#3c4a57' }}
                                    numberOfLines={1}
                                    ellipsizeMode={'tail'}
                                >{treatment.name}</Text>
                                <Text
                                    style={{ fontSize: 14, color: userData?.type === 'patient' ? '#99899c' : '#89939c' }}
                                    numberOfLines={1}
                                    ellipsizeMode={'tail'}
                                >{userChat && userChat.last_msg?.content}</Text>
                            </View>
                            <View style={{ width: '30%', alignItems: 'flex-end', paddingHorizontal: '3%' }}>

                                <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: '7%', }}>
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: '300',
                                    }}>
                                        {
                                            userChat && userChat.last_msg?.date && formatDateForChat(userChat.last_msg?.date)
                                        }
                                    </Text>
                                </View>

                                {
                                    userChat && userChat.msg_count !== undefined && userChat.msg_count !== 0 &&
                                    <View style={{
                                        width: msgCountSize, height: msgCountSize, borderRadius: msgCountSize,
                                        backgroundColor: userData?.type === 'patient' ? '#893294' : '#2a8269', padding: '2%',
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ fontSize: msgCountSize / 2.5, color: 'white', fontWeight: '500' }}>
                                            {
                                                userChat?.msg_count
                                            }
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default TemplateChatUser;