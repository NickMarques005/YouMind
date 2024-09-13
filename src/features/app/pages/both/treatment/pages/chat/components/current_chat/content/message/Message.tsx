import { View, Text, Image, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native'
import React, { memo } from 'react'
import images from '@assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveSize, screenWidth } from '@utils/layout/Screen_Size';
import { ConvertFromISOToTimeHours } from '@utils/date/DateConversions';
import { MessageSelected, MessageTemplate } from 'types/chat/Chat_Types';
import AudioPlayer from '../audio/AudioPlayer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMessageBehavior } from '../../hooks/useMessageBehavior';
import { UserData, UserType } from 'types/user/User_Types';
import MentionedMessage from './MentionedMessage';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { UseChat } from '@features/app/providers/bridge/ChatProvider';

type MessageProps = {
    userData?: UserData;
    avatar?: string;
    message: MessageTemplate;
    ownMessage: boolean;
    showUserIcon: boolean;
    userType?: UserType;
    senderName: string;
    senderType: UserType;
    audioUrl?: string;
    duration?: string;
    isRead: boolean;
    selectedMessages: MessageSelected[];
    handleTapMessage: (message: MessageSelected) => void;
    handleLongPressMessage: (message: MessageSelected, chatNote?: NoteTemplate) => void;
}

const Message: React.FC<MessageProps> = ({
    isRead, duration, audioUrl, message,
    ownMessage, showUserIcon, userType,
    avatar, senderName, senderType,
    selectedMessages, userData,
    handleLongPressMessage,
    handleTapMessage,
}: MessageProps) => {
    const { currentChatNote } = UseChat();
    const { isSelected } = useMessageBehavior({ selectedMessages, message });

    const typePatientIcon = ownMessage ? images.app_patient_images.chat.user_icon_chat : images.app_doctor_images.chat.doctor_icon_chat;
    const typeDoctorIcon = ownMessage ? images.app_doctor_images.chat.doctor_icon_chat : images.app_patient_images.chat.user_icon_chat;
    const userIcon = userType === 'doctor' ? typeDoctorIcon : typePatientIcon;
    const iconSize = responsiveSize * 0.08;
    const messageStatusSize = responsiveSize * 0.04;
    const messageRemoveIconSize = responsiveSize * 0.05;
    const notSelectedMessageGradientColors = userType === 'patient' ? ownMessage ?
        ["#aa36b5", `#6f2975`] :
        [`#369eb5`, "#355f75"] : ownMessage ?
        [`#369eb5`, "#355f75"] :
        [`#aa36b5`, "#6f2975",]

    const selectedMessageGradientColors = userType === 'patient' ? ownMessage ?
        ["#c171d9", `#9a26a3`] :
        [`#29b7c4`, "#2679a3"] : ownMessage ?
        [`#29b7c4`, "#2679a3"] :
        [`#c171d9`, "#9a26a3",]

    const selectedMessageBackgroundColor = userType === 'patient' ? ownMessage ?
        'rgba(138, 21, 118, 0.3)' : 'rgba(21, 138, 130, 0.3)' :
        ownMessage ?
            'rgba(64, 124, 135, 0.5)' : 'rgba(135, 64, 128, 0.3)';

    const messageSelectedStructure: MessageSelected = {
        messageId: message._id,
        ownMessage: ownMessage,
        isMarked: message.isMarked,
        content: message.content,
        senderId: userData ? userData._id : '',
        senderName: senderName,
        senderType: senderType,
        hasAudio: audioUrl !== "" && !!audioUrl
    }

    return (
        <View style={{ flex: 1, }}>
            <TouchableOpacity
                onPress={() => handleTapMessage(messageSelectedStructure)}
                onLongPress={() => handleLongPressMessage(messageSelectedStructure, currentChatNote)}
                style={[
                    {
                        paddingHorizontal: 10,
                        paddingBottom: 4,
                        backgroundColor: isSelected ? selectedMessageBackgroundColor : 'transparent',

                    },
                ]}>
                {
                    showUserIcon ?
                        <View style={[{
                            width: iconSize, height: iconSize, borderRadius: iconSize, overflow: 'hidden',
                            alignSelf: ownMessage ? 'flex-end' : 'flex-start', zIndex: 2, top: iconSize * 0.3
                        }, userType === 'patient' ? ownMessage ? { backgroundColor: '#b18fcf' } : { left: 0, backgroundColor: '#8fb4cf', } :
                            ownMessage ? { right: 0, backgroundColor: '#8fb4cf', } : { left: 0, backgroundColor: '#b18fcf' }]}>
                            <Image style={{ width: iconSize, height: iconSize }} source={avatar ? { uri: avatar } : userIcon} />
                        </View>
                        : ""
                }
                <LinearGradient colors={
                    isSelected ? selectedMessageGradientColors :
                        notSelectedMessageGradientColors
                }
                    start={{ x: 0, y: 0 }
                    }
                    end={{ x: 0, y: 1 }} style={[
                        ownMessage ? {
                            alignSelf: 'flex-end', paddingHorizontal: 14,
                            paddingBottom: 15, paddingVertical: 18,
                            maxWidth: screenWidth * 0.8, minWidth: screenWidth * 0.27, borderRadius: 20,
                            borderBottomRightRadius: 0, gap: 6
                        } :
                            {
                                alignSelf: 'flex-start', paddingHorizontal: 14,
                                paddingBottom: 15, paddingVertical: 18, maxWidth: screenWidth * 0.8, minWidth:
                                    screenWidth * 0.2, borderRadius: 20, borderBottomLeftRadius: 0, gap: 6
                            }, showUserIcon ? {} : {},
                        {
                            opacity: audioUrl && currentChatNote ? 0.6 : 1
                        }]} >
                    {
                        message.mentionedMessage && userData &&
                        <MentionedMessage
                            _id={message.mentionedMessage._id}
                            content={message.mentionedMessage.content}
                            senderId={message.mentionedMessage.senderId}
                            senderName={message.mentionedMessage.senderName}
                            senderType={message.mentionedMessage.senderType}
                            hasAudio={message.mentionedMessage.hasAudio}
                            userData={userData}
                        />
                    }
                    <View style={{ width: '100%' }}>
                        {
                            message.isRemoved ?
                                <View style={{ width: '100%', gap: 5, flexDirection: 'row' }}>
                                    <MaterialCommunityIcons
                                        name="cancel"
                                        size={messageRemoveIconSize}
                                        color="rgba(255, 255, 255, 0.7)"
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {`Mensagem apagada`}
                                    </Text>
                                </View>
                                :
                                !audioUrl ?
                                    <>
                                        <View style={ownMessage ? { width: '100%', } : {}}>
                                            <Text style={ownMessage ? { color: 'white', } : { color: 'white' }}>{message.content}</Text>
                                        </View>
                                    </>
                                    : <AudioPlayer totalDuration={duration} url={audioUrl} />
                        }
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-end' }}>
                        {
                            message.isMarked && !message.isRemoved &&
                            <Icon name="star" size={messageStatusSize} color="white" />
                        }
                        <Text style={{ fontSize: 13, color: '#d9d0db', opacity: 1 }}>{ConvertFromISOToTimeHours(message.createdAt)}</Text>
                        {
                            ownMessage && !message.isRemoved &&
                            <Icon
                                name={message.sending ? 'access-time' : 'done-all'}
                                size={messageStatusSize}
                                color={isRead ? "#fdfcff" : "rgba(217, 208, 219, 0.4)"}
                            />
                        }

                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default Message;