import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AuthData } from '../../../contexts/AuthContext';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { useNavigation } from '@react-navigation/native';
import { Treatment } from '../../../contexts/TreatmentContext';
import { User } from '../../../contexts/ChatContext';

interface UserChat {
    last_text?: string;
    time_last?: string;
    user_img?: string;
}

interface ChatTemplateUserProps {
    user: Treatment;
    user_chat?: UserChat;
    authData: AuthData;
    handleChat: (other_members: Treatment) => void
}

function ChatTemplateUser({ user, user_chat, authData, handleChat }: ChatTemplateUserProps) {
    const userIcon = authData.type === 'patient' ? require("../../../assets/app_patient/chat/doctor_icon_chat.png") : require("../../../assets/app_doctor/chat/user_icon_chat.png");
    const iconSize = 85;

    return (
        <View style={{ display: 'flex', width: '100%', borderBottomWidth: 0.5, borderColor: 'white', }}>
            <LinearGradient colors={[`${authData.type == "patient" ? "rgba(201, 175, 201, 0.8)" : "#b6c6cf"}`, `${authData.type == "patient" ? 'transparent' : "transparent"}`,]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.3, y: 0.4 }} style={{ width: '100%', borderRadius: 5, paddingHorizontal: 10, borderBottomWidth: 1.5, borderBottomColor: authData.type === 'patient' ? '#c6bacf' : '#a4abb3' , paddingVertical: 5 }}>
                <TouchableOpacity onPress={() => handleChat(user)} style={{ display: 'flex', flexDirection: 'row', paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ borderRadius: 50, overflow: 'hidden', height: '100%', backgroundColor: user_chat && user_chat.user_img ? 'transparent' : authData.type === 'patient' ? '#a374a3' : '#748ba3' }}>
                        {
                            user_chat && user_chat.user_img ? (
                                <Image style={{ width: screenHeight * ((iconSize) / 1000), height: screenHeight * ((iconSize) / 1000), opacity: 0.7 }} source={{ uri: user_chat.user_img }} />
                            )
                                :
                                <Image style={{ width: screenHeight * ((iconSize) / 1000), height: screenHeight * ((iconSize) / 1000), opacity: 0.7 }} source={userIcon} />
                        }
                    </View>
                    <View style={{ width: '50%' }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: authData.type === 'patient' ? '#543c57' : '#3c4a57' }}>{user.name}</Text>
                            <Text style={{ fontSize: 14, color: authData.type === 'patient' ? '#99899c' : '#89939c' }}>{user_chat && user_chat.last_text}</Text>
                        </View>
                    </View>
                    <View style={{ width: '20%' }}>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default ChatTemplateUser