import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { ConvertFromISOToTimeHours } from '@utils/date/DateConversions';
import { MessageTemplate } from 'types/chat/Chat_Types';
import AudioPlayer from './AudioPlayer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserData } from 'types/user/User_Types';

type MessageProps = {
    avatar?: string;
    message: MessageTemplate;
    ownMessage: boolean;
    showUserIcon: boolean;
    userType?: string;
    audioUrl?: string;
    duration?: string;
    isRead: boolean;
}

const Message: React.FC<MessageProps> = ({ isRead, duration, audioUrl, message, ownMessage, showUserIcon, userType, avatar }: MessageProps) => {

    const typePatientIcon = ownMessage ? images.app_patient_images.chat.user_icon_chat : images.app_doctor_images.chat.doctor_icon_chat;
    const typeDoctorIcon = ownMessage ? images.app_doctor_images.chat.doctor_icon_chat : images.app_patient_images.chat.user_icon_chat;

    const userIcon = userType === 'doctor' ? typeDoctorIcon : typePatientIcon;
    const iconSize = 25;


    return (
        <>

            <LinearGradient colors={userType === 'patient' ? ownMessage ? ["#9f55b5", `#6f2975`] : [`#3a94a6`, "#355f75"] : ownMessage ? [`#3a94a6`, "#355f75"] : [`#a14cba`, "#7f3287",]}
                start={{ x: 0, y: 0 }
                }
                end={{ x: 0, y: 1 }} style={[ownMessage ? { alignSelf: 'flex-end', paddingHorizontal: 14, paddingBottom: 26, paddingVertical: 18, marginVertical: 2, marginHorizontal: 10, maxWidth: screenWidth * 0.8, minWidth: screenWidth * 0.2, borderRadius: 20, borderBottomRightRadius: 0 } : { alignSelf: 'flex-start', paddingHorizontal: 14, paddingBottom: 26, paddingVertical: 18, marginVertical: 2, marginHorizontal: 10, maxWidth: screenWidth * 0.8, minWidth: screenWidth * 0.2, borderRadius: 20, borderBottomLeftRadius: 0 }, showUserIcon ? { marginTop: 15, } : {}]} >
                {
                    !audioUrl ?
                        <>
                            <View style={ownMessage ? { width: '100%', } : {}}>
                                <Text style={ownMessage ? { color: 'white', } : { color: 'white' }}>{message.content}</Text>
                            </View>
                            {
                                showUserIcon ?
                                    <View style={[{ position: 'absolute', display: 'flex', top: -30, borderRadius: 50, overflow: 'hidden' }, userType === 'patient' ? ownMessage ? { right: 0, backgroundColor: '#b18fcf' } : { left: 0, backgroundColor: '#8fb4cf', } : ownMessage ? { right: 0, backgroundColor: '#8fb4cf', } : { left: 0, backgroundColor: '#b18fcf' }]}>
                                        <Image style={{ width: screenHeight * ((iconSize + 25) / 1000), height: screenHeight * ((iconSize + 25) / 1000) }} source={avatar ? { uri: avatar } : userIcon} />
                                    </View>
                                    : ""
                            }
                        </>
                        : <AudioPlayer totalDuration={duration} url={audioUrl} message={message} ownMessage={ownMessage} showUserIcon={showUserIcon} />
                }
                <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center', gap: 5, bottom: 4, right: 14, }}>
                    <Text style={{ fontSize: 13, color: '#d9d0db', opacity: 1 }}>{ConvertFromISOToTimeHours(message.createdAt)}</Text>
                    {
                        ownMessage &&
                        <Icon
                            name={'done-all'}
                            size={15}
                            color={isRead ? "#fdfcff" : "rgba(217, 208, 219, 0.4)"}
                        />
                    }
                </View>
            </LinearGradient>
        </>

    )
}

export default Message;