import { View, Text, KeyboardAvoidingView, ScrollView, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { ChatUser, MessageTemplate, ProcessedMessageItem } from 'types/chat/Chat_Types';
import Message from './Message';
import { UserData } from 'types/user/User_Types';
import { UseMessageHandling } from '../../hooks/UseMessageHandling';
import images from '@assets/images';
import MessageDate from './MessageDate';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import useAudioHandling from '../../hooks/UseAudioHandling';
import Animated from 'react-native-reanimated';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { UseChatAnimation } from '../../hooks/UseChatAnimation';
import AudioTimer from './AudioTimer';
import { ViewToken, ViewabilityConfigCallbackPairs } from 'react-native';
import { UseLoading } from '@hooks/loading/UseLoading';

interface ContentHeaderProps {
    userType: string | undefined;
    userData?: UserData;
    chatUser?: ChatUser;
    messages: MessageTemplate[];
    socket: any;
    getMessages: (conversationId: string, page: number) => Promise<void>;
    page: number;
    handleReadMessage: (message: MessageTemplate, user?: UserData) => void;
    handleAddNewMessage: (message: MessageTemplate) => void;
}

interface ViewableItem extends ViewToken {
    item: ProcessedMessageItem;
}

interface ViewableItemsChanged {
    viewableItems: ViewableItem[];
}

const Content = ({
    handleReadMessage, userType, chatUser,
    messages, userData, socket, 
    page, getMessages, handleAddNewMessage }: ContentHeaderProps
    ) => {
    const { HandleResponseAppError } = UseGlobalResponse();
    const { newMessage, handleSendNewMessage, setNewMessage, newMessageLoading, preprocessMessages } = UseMessageHandling({ conversation: chatUser?._id, socket, handleAddNewMessage });
    const { handleAudioPress, handleAudioRelease, isRecording, recordTime } = useAudioHandling({ HandleResponseAppError, handleSendNewMessage, senderId: userData?._id });
    const [processedMessages, setProcessedMessages] = useState<ProcessedMessageItem[]>([]);
    const viewabilityConfig = { itemVisiblePercentThreshold: 50 };
    const audioIcon = userType === 'doctor' ? images.app_doctor_images.chat.icon_audio : images.app_patient_images.chat.icon_audio;
    const sendIcon = userType === 'doctor' ? images.app_doctor_images.chat.icon_send : images.app_patient_images.chat.icon_send;
    const { animatedStyle, longPressGesture } = UseChatAnimation({
        handleAudioPress, handleAudioRelease,
        newMessageLoading, userId: userData?._id
    });

    const renderMessageItem = useCallback(({ item, index }: { item: ProcessedMessageItem, index: number }) => {
        if (item.type === 'dateLabel') {
            return <MessageDate date={item.date} userType={userType} />;
        } else {
            const messageData = item.data;
            const nextItem = processedMessages[index + 1];
            const isDifferentSender = nextItem && nextItem.type === 'message' && messageData.sender !== nextItem.data.sender;
            const isLastMessage = index === processedMessages.length - 1;
            const nextIsDate = nextItem && nextItem.type === 'dateLabel';
            const showUserIcon = isLastMessage || isDifferentSender || nextIsDate;
            const isRead = chatUser?.uid && messageData.readBy && messageData.readBy.includes(chatUser.uid) ? true : false;
            return (
                <Message
                    isRead={isRead}
                    key={index.toString()}
                    avatar={messageData.sender === userData?._id ? userData.avatar : chatUser?.avatar}
                    message={messageData}
                    ownMessage={messageData.sender === userData?._id}
                    showUserIcon={showUserIcon}
                    userType={userData?.type}
                    audioUrl={messageData.audioUrl}
                    duration={messageData.duration}
                />
            );
        }
    }, [processedMessages, userType, userData, chatUser]);

    const handleViewableItemsChanged = useCallback(({ viewableItems }: ViewableItemsChanged) => {
        viewableItems.forEach(viewableItem => {
            if (viewableItem.item.type !== 'dateLabel') {
                const ownMessage = viewableItem.item.data.sender === userData?._id;
                if (!ownMessage && userData && !viewableItem.item.data.readBy?.includes(userData?._id)) {
                    handleReadMessage(viewableItem.item.data, userData);
                }
            }
        });
    }, [handleReadMessage, userData]);

    useEffect(() => {
        const updatedMessages = preprocessMessages(messages);
        setProcessedMessages(updatedMessages);
    }, [messages]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            keyboardVerticalOffset={screenHeight * 0.04}
            behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
            <GestureHandlerRootView>
                <LinearGradient colors={['#fcf7fc', '#bed3e6']} style={styles.chat}>
                    <FlatList
                        data={processedMessages}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderMessageItem}
                        inverted
                        viewabilityConfig={viewabilityConfig}
                        onViewableItemsChanged={handleViewableItemsChanged}
                        style={{ width: '100%', }}
                        contentContainerStyle={{ width: '100%', paddingVertical: 30, paddingTop: screenHeight * 0.1 }}
                        onEndReached={() => chatUser?._id && getMessages(chatUser?._id, page)}
                        onEndReachedThreshold={0.7}
                    />
                    <View style={[styles.textInput_View]}>
                        <AudioTimer recordTime={recordTime} isRecording={isRecording} userType={userData?.type} />
                        <View style={[styles.input_View, { borderColor: userType === 'doctor' ? '#84b1f5' : '#e381a2', opacity: isRecording ? 0.5 : 1 }]}>
                            <TextInput
                                style={styles.chat_TextInput}
                                editable={!isRecording}
                                placeholder='Mensagem'
                                placeholderTextColor={userType === 'doctor' ? 'rgba(192, 205, 207, 0.6)' : 'rgba(207, 192, 201, 0.6)'}
                                onChangeText={(value) => setNewMessage(value)}
                                value={newMessage}
                                multiline={true}
                            />

                            <View style={styles.chatButtons_View}>

                                <TouchableOpacity disabled={isRecording || newMessageLoading} onPress={() => handleSendNewMessage(userData?._id)} style={[styles.chat_Button, { opacity: newMessageLoading ? 0.5 : 1 }]}>
                                    <Image
                                        source={sendIcon}
                                        style={styles.chatEnvio_Image}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <GestureDetector
                            gesture={longPressGesture}
                        >
                            <Animated.View style={[styles.chatAudio_Button, animatedStyle]}>
                                <Image
                                    source={audioIcon}
                                    style={styles.chatAudio_Image}
                                />
                            </Animated.View>
                        </GestureDetector>
                    </View>

                </LinearGradient>
            </GestureHandlerRootView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    chat: {
        flex: 1,
        width: screenWidth,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    chatContent_View: {
        width: '100%',
        minHeight: screenHeight - screenHeight * 0.136 - screenHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textInput_View: {
        width: '94%',
        bottom: 10,
        position: 'absolute',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 20,
    },
    input_View: {
        width: screenWidth * 0.78,
        minHeight: screenHeight * 0.07,
        maxHeight: screenHeight * 0.15,
        borderRadius: 35,
        flexDirection: 'row',
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
        paddingHorizontal: 20,
        paddingVertical: 8,
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
        alignSelf: 'flex-end'
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
        width: screenHeight * 0.07,
        height: screenHeight * 0.07,
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
    }
})

export default Content;