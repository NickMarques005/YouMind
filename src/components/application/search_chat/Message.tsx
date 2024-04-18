import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { format } from 'timeago.js';
import { screenWidth, screenHeight } from '../../../utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { UseAuth } from '../../../providers/AuthenticationProvider';
import { FormatTimeHours } from '../../../functions/dates/ConvertDate';

export interface MessageType {
    conversationId: string;
    content: string;
    sender: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

type MessageProps = {
    message: MessageType;
    ownMessage: boolean;
    showUserIcon: boolean;
}

const Message: React.FC<MessageProps> = ({ message, ownMessage, showUserIcon }: MessageProps) => {
    const { authData } = UseAuth();

    const userIcon = authData.type === 'doctor' ? ownMessage ? require("../../../assets/app_doctor/chat/doctor_icon_chat.png") : require("../../../assets/app_patient/chat/user_icon_chat.png") : ownMessage ? require("../../../assets/app_patient/chat/user_icon_chat.png") : require("../../../assets/app_doctor/chat/doctor_icon_chat.png");
    const iconSize = 25;

    return (
        <>

            <LinearGradient colors={authData.type === 'patient' ? ownMessage ? ["#9f55b5",`#6f2975`] : [`#355f75`, "#3a94a6",] : ownMessage ? [`#355f75`, "#3a94a6",] : [`#a14cba`, "#7f3287",]}
                start={{ x: 0, y: 0 }
                }
                end={{ x: 1, y: 0.8 }} style={[ownMessage ? { alignSelf: 'flex-end', paddingHorizontal: 14, paddingBottom: 26, paddingVertical: 18, marginVertical: 2, marginHorizontal: 10, maxWidth: screenWidth * 0.8, minWidth: screenWidth * 0.2, borderRadius: 20, borderBottomRightRadius: 0 } : { alignSelf: 'flex-start', paddingHorizontal: 14, paddingBottom: 26, paddingVertical: 18, marginVertical: 2, marginHorizontal: 10, maxWidth: screenWidth * 0.8, minWidth: screenWidth * 0.2, borderRadius: 20, borderBottomLeftRadius: 0  }, showUserIcon ? { marginTop: 15, } : {}]} >

                <View style={ownMessage ? { width: '100%', } : {}}>
                    <Text style={ownMessage ? { color: 'white', } : { color: 'white' }}>{message.content}</Text>
                </View>
                <View style={{ position: 'absolute', bottom: 4, right: 14, }}>
                    <Text style={{ fontSize: 13, color: '#d9d0db', opacity: 1 }}>{FormatTimeHours(message.createdAt)}</Text>
                </View>
                {
                    showUserIcon ?
                        <View style={[{ position: 'absolute', display: 'flex', top: -30, borderRadius: 50, overflow: 'hidden' }, authData.type === 'patient' ? ownMessage ? { right: 0, backgroundColor: '#b18fcf' } : { left: 0, backgroundColor: '#8fb4cf', } : ownMessage ? { right: 0, backgroundColor: '#8fb4cf', } : { left: 0, backgroundColor: '#b18fcf' }]}>
                            <Image style={{ width: screenHeight * ((iconSize + 25) / 1000), height: screenHeight * ((iconSize + 25) / 1000) }} source={userIcon} />
                        </View>
                        : ""
                }
            </LinearGradient >
        </>

    )
}

export default Message;