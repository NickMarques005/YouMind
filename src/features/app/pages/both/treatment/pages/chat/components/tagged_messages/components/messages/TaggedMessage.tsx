import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ConvertFromISOToTimeHours } from '@utils/date/DateConversions';
import { MessageSelected, MessageTemplate } from 'types/chat/Chat_Types';
import AudioPlayer from '../../../current_chat/content/audio/AudioPlayer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsiveSize, screenWidth } from '@utils/layout/Screen_Size';
import { UserData, UserType } from 'types/user/User_Types';
import { useMessageBehavior } from '../../../current_chat/hooks/useMessageBehavior';
import images from '@assets/images';
import { formatDateForChat } from '@utils/date/DateFormatting';
import MentionedMessage from '../../../current_chat/content/message/MentionedMessage';

type TaggedMessageProps = {
    message: MessageTemplate;
    userData?: UserData,
    userType: UserType;
    userName: string;
    isRead: boolean;
    avatar?: string;
    ownMessage: boolean;
    audioUrl?: string;
    duration?: string;
    selectedMessages: MessageSelected[];
    handleTapMessage: (message: MessageSelected) => void;
    handleLongPressMessage: (message: MessageSelected) => void;
};

const TaggedMessage: React.FC<TaggedMessageProps> = ({
    userData,
    message,
    isRead,
    avatar,
    ownMessage,
    userType,
    userName,
    audioUrl,
    duration,
    selectedMessages,
    handleTapMessage,
    handleLongPressMessage
}: TaggedMessageProps) => {
    const { isSelected } = useMessageBehavior({ selectedMessages, message });

    const typePatientIcon = ownMessage ? images.app_patient_images.chat.user_icon_chat : images.app_doctor_images.chat.doctor_icon_chat;
    const typeDoctorIcon = ownMessage ? images.app_doctor_images.chat.doctor_icon_chat : images.app_patient_images.chat.user_icon_chat;
    const userIcon = userType === 'doctor' ? typeDoctorIcon : typePatientIcon;
    const iconSize = responsiveSize * 0.07;
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
        senderName: userName,
        senderType: userType as UserType,
        senderId: userData ? userData._id : ''
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleTapMessage(messageSelectedStructure)}
                onLongPress={() => handleLongPressMessage(messageSelectedStructure)}
                style={[
                    styles.messageContainer,
                    { backgroundColor: isSelected ? selectedMessageBackgroundColor : 'transparent' }
                ]}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <View style={[{
                            width: iconSize, height: iconSize, borderRadius: iconSize, overflow: 'hidden',
                            alignSelf: 'flex-start', zIndex: 2, marginVertical: 3
                        }, userType === 'patient' ? ownMessage ? { backgroundColor: '#b18fcf' } : { backgroundColor: '#8fb4cf', } :
                            ownMessage ? { backgroundColor: '#8fb4cf', } : { backgroundColor: '#b18fcf' }]}>
                            <Image style={{ width: iconSize, height: iconSize }} source={avatar ? { uri: avatar } : userIcon} />
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 15, fontWeight: '500', color: isSelected ? 'white' :
                                    userType === 'patient' ? ownMessage ? '#b18fcf' : '#8fb4cf' : ownMessage ? '#8fb4cf' : '#b18fcf'
                            }}>
                                {
                                    userName ? userName :
                                        userType === 'patient' ? ownMessage ? 'Paciente' : 'Doutor' : ownMessage ? 'Doutor' : 'Paciente'
                                }
                            </Text>
                        </View>

                    </View>
                    <View style={{ gap: 2, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{}}>
                            <Text style={{ fontSize: 12, color: isSelected ? '#f5f7fa' : 'rgba(121, 129, 138, 1)' }}>
                                {
                                    message.createdAt && formatDateForChat(message.createdAt)
                                }
                            </Text>
                        </View>
                        <View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color={isSelected ? 'rgba(245, 247, 250, 0.6)' : 'rgba(121, 129, 138, 0.5)'} />
                        </View>
                    </View>
                </View>

                <LinearGradient
                    colors={isSelected ? selectedMessageGradientColors :
                        notSelectedMessageGradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.messageContent}
                >
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
                        />}
                    <View style={styles.messageWrapper}>
                        <View style={styles.messageTextWrapper}>
                            <Text style={styles.messageText}>{message.content}</Text>
                        </View>
                        {
                            audioUrl && <AudioPlayer
                                totalDuration={duration}
                                url={audioUrl}
                            />
                        }
                    </View>
                    <View style={styles.messageFooter}>
                        {message.isMarked && !message.isRemoved && (
                            <Icon name="star" size={16} color="white" />
                        )}
                        <Text style={styles.timestamp}>{ConvertFromISOToTimeHours(message.createdAt)}</Text>
                        {ownMessage && !message.isRemoved && (
                            <Icon
                                name={message.sending ? 'access-time' : 'done-all'}
                                size={16}
                                color={isRead ? '#fdfcff' : 'rgba(217, 208, 219, 0.4)'}
                            />
                        )}
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageContainer: {
        paddingHorizontal: 10,
        paddingTop: 6,
        paddingBottom: 6,
    },
    messageContent: {
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingBottom: 15,
        paddingVertical: 18,
        maxWidth: screenWidth * 0.8,
        minWidth: screenWidth * 0.2,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        gap: 6
    },
    messageWrapper: {
        width: '100%',
    },
    messageTextWrapper: {
        width: '100%',
    },
    messageText: {
        color: 'white',
    },
    removedMessage: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    removedText: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    messageFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignSelf: 'flex-end',
    },
    timestamp: {
        fontSize: 13,
        color: '#d9d0db',
    },
});

export default React.memo(TaggedMessage);