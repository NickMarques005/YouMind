import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import AudioTimer from '../audio/AudioTimer';
import MentionedMessage from '../message/MentionedMessage';
import { MentionedMessageTemplate } from 'types/chat/Chat_Types';
import { UserData, UserType } from 'types/user/User_Types';

interface ChatInputMessageProps {
    userData?: UserData;
    newMessage: string;
    setNewMessage: (value: string) => void;
    handleSendNewMessage: () => void;
    isRecording: boolean;
    recordTime: number;
    showScrollToBottom: boolean;
    scrollToBottom: () => void;
    audioAnimatedStyle: any;
    longPressGesture: any;
    newMessageLoading: boolean;
    sendIcon: any;
    audioIcon: any;
    userType: UserType;
    currentMentionedMessage?: MentionedMessageTemplate;
    clearCurrentMentionedMessage: () => void;
    clearSelection: () => void;
    isSelecting: boolean;
}

const ChatInputMessage: React.FC<ChatInputMessageProps> = ({
    userData, newMessage, isRecording, recordTime,
    showScrollToBottom, audioAnimatedStyle, longPressGesture, newMessageLoading,
    sendIcon, audioIcon, userType, currentMentionedMessage, isSelecting,
    scrollToBottom, setNewMessage, handleSendNewMessage,
    clearCurrentMentionedMessage, clearSelection,
}) => {
    const audioIconSize = responsiveSize * 0.14;
    const scrollToBottomIconSize = responsiveSize * 0.08;

    return (
        <View style={[styles.textInput_View]}>
            {showScrollToBottom && (
                <View style={{
                    width: audioIconSize, alignSelf: 'flex-end',
                    alignItems: 'center', paddingBottom: 6
                }}>
                    <TouchableOpacity
                        style={{
                            width: scrollToBottomIconSize,
                            height: scrollToBottomIconSize, borderRadius: scrollToBottomIconSize * 0.5,
                            backgroundColor: userType === 'patient' ? '#573b52' : '#3b5755',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={scrollToBottom}
                    >
                        <MaterialIcons name="keyboard-double-arrow-down" size={scrollToBottomIconSize * 0.7} color="rgba(255, 255, 255, 0.7)" />
                    </TouchableOpacity>
                </View>
            )}

            {isRecording && <AudioTimer recordTime={recordTime} isRecording={isRecording} userType={userType} />}

            <View style={[styles.input_View, {
                paddingVertical: audioIconSize * 0.2,
                borderColor: userType === 'doctor' ? '#84b1f5' : '#e381a2',
                opacity: isRecording ? 0.5 : 1,
                borderRadius: audioIconSize * 0.5,
            }]}>
                <View style={{ flex: 1 }}>
                    {currentMentionedMessage && userData && (
                        <MentionedMessage
                            userData={userData}
                            isInput={true}
                            _id={currentMentionedMessage._id}
                            content={currentMentionedMessage.content}
                            senderName={currentMentionedMessage.senderName}
                            senderId={currentMentionedMessage.senderId}
                            senderType={currentMentionedMessage.senderType}
                            clearCurrentMentionedMessage={clearCurrentMentionedMessage}
                        />
                    )}

                    <View style={{
                        flexDirection: 'row', width: '100%',
                        maxHeight: screenHeight * 0.15,
                        minHeight: audioIconSize * 0.6, gap: 5
                    }}>
                        <TextInput
                            style={[styles.chat_TextInput]}
                            editable={!isRecording}
                            placeholder='Mensagem'
                            placeholderTextColor={userType === 'doctor' ? 'rgba(192, 205, 207, 0.6)' : 'rgba(207, 192, 201, 0.6)'}
                            onChangeText={setNewMessage}
                            value={newMessage}
                            multiline={true}
                            onFocus={() => isSelecting && clearSelection()}
                            onTouchStart={() => isSelecting && clearSelection()}
                        />
                        <View style={[styles.chatButtons_View]}>
                            <TouchableOpacity disabled={isRecording || newMessageLoading}
                                onPress={handleSendNewMessage}
                                style={[styles.chat_Button, { opacity: newMessageLoading ? 0.5 : 1 }]}>
                                <Image source={sendIcon} style={styles.chatEnvio_Image} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <GestureDetector gesture={longPressGesture}>
                <Animated.View style={[styles.chatAudio_Button, { width: audioIconSize, height: audioIconSize }, audioAnimatedStyle]}>
                    <Image source={audioIcon} style={styles.chatAudio_Image} />
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    textInput_View: {
        width: '94%',
        bottom: 10,
        position: 'absolute',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    input_View: {
        width: screenWidth * 0.78,
        backgroundColor: '#1e254f',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        paddingHorizontal: 15,
        gap: 10,
    },
    chat_TextInput: {
        flex: 1,
        fontSize: 14,
        color: 'white',
        overflow: 'scroll',
    },
    chatButtons_View: {
        display: 'flex',
        alignSelf: 'flex-end',
    },
    chat_Button: {
        width: screenWidth * 0.08,
        height: screenHeight * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatEnvio_Image: {
        width: '80%',
        height: '80%'
    },
    chatEmoji_Image: {
        width: '80%',
        height: '80%'
    },
    chatAudio_Button: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70,
        marginLeft: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    chatAudio_Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});

export default ChatInputMessage;