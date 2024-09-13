import { KeyboardAvoidingView, StyleSheet, Platform, View } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { ChatUser, MentionedMessageTemplate, MessageSelected, MessageTemplate } from 'types/chat/Chat_Types';
import { UserData, UserType } from 'types/user/User_Types';
import { UseMessageHandling } from '../../../hooks/UseMessageHandling';
import images from '@assets/images';
import { UseGlobalResponse } from '@features/app/providers/sub/ResponseProvider';
import useAudioHandling from '../../../hooks/UseAudioHandling';
import { UseChatAnimation } from '../../../hooks/UseChatAnimation';
import { LoadingStructure } from 'types/loading/Loading_Types';
import { useProcessedMessageHandling } from './hooks/useProcessedMessageHandling';
import MessageList from './message/MessageList';
import { useMessageListBehavior } from './hooks/useMessageListBehavior';
import { useProcessedListBehavior } from './hooks/useProcessedListBehavior';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import ChatInputMessage from './input/ChatInputMessage';
import ButtonSendMessagesToNote from './note/ButtonSendMessagesToNote';

interface ContentHeaderProps {
    userType: UserType;
    userData?: UserData;
    chatUser?: ChatUser;
    messages: MessageTemplate[];
    currentMentionedMessage?: MentionedMessageTemplate;
    page: number;
    fetchMessagesLoading: LoadingStructure;
    selectedMessages: MessageSelected[];
    isSelecting: boolean;
    currentMessageScrollingId?: string;
    currentChatNote: NoteTemplate | undefined;
    sendToNoteLoading: LoadingStructure;
    handleSendMessageToNoteModal: () => void;
    handleGetMessages: (page: number) => void;
    handleReadMessage: (message: MessageTemplate, user?: UserData) => void;
    handleAddNewMessage: (message: MessageTemplate) => void;
    handleSendMessage: (newMessage: MessageTemplate) => void;
    handleLongPressMessage: (message: MessageSelected, chatNote?: NoteTemplate) => void;
    handleTapMessage: (message: MessageSelected) => void;
    clearSelection: () => void;
    clearCurrentMentionedMessage: () => void;
    clearCurrentMessageScrollingId: () => void;
}

const Content = ({
    userType, chatUser, page,
    messages, userData, currentChatNote,
    isSelecting, selectedMessages, currentMentionedMessage,
    currentMessageScrollingId, fetchMessagesLoading, sendToNoteLoading,
    handleReadMessage, handleSendMessage, handleSendMessageToNoteModal,
    handleGetMessages, handleAddNewMessage, clearCurrentMentionedMessage,
    clearSelection, handleLongPressMessage, handleTapMessage,
    clearCurrentMessageScrollingId
}: ContentHeaderProps
) => {
    const { HandleResponseAppError } = UseGlobalResponse();
    const { newMessage, handleSendNewMessage, setNewMessage,
        newMessageLoading, preprocessMessages } = UseMessageHandling({
            chatId: chatUser?._id,
            handleSendMessage,
            clearCurrentMentionedMessage,
            handleAddNewMessage
        });

    //Processamento das mensagens
    const { processedMessages, handleViewableItemsChanged } = useProcessedMessageHandling({
        messages,
        userData,
        handleReadMessage,
        preprocessMessages
    });

    //Audio
    const { handleAudioPress, handleAudioRelease, isRecording, recordTime } =
        useAudioHandling({
            HandleResponseAppError, handleSendNewMessage,
            senderId: userData?._id, senderType: userType, mentionedMessage: currentMentionedMessage
        });

    //Lista das mensagens
    const { showScrollToBottom,
        handleScroll,
        flatListRef,
        scrollToBottom } = useMessageListBehavior();

    const { scrollToIndexFailed } = useProcessedListBehavior({
        processedMessages, flatListRef,
        currentMessageScrollingId, clearCurrentMessageScrollingId
    });

    //Animação
    const { audioAnimatedStyle, longPressGesture } = UseChatAnimation({
        handleAudioPress, handleAudioRelease, clearSelection,
        newMessageLoading, userId: userData?._id, senderType: userType, mentionedMessage: currentMentionedMessage,
        isSelecting
    });

    const viewabilityConfig = { itemVisiblePercentThreshold: 30 };
    const audioIcon = userType === 'doctor' ? images.app_doctor_images.chat.icon_audio : images.app_patient_images.chat.icon_audio;
    const sendIcon = userType === 'doctor' ? images.app_doctor_images.chat.icon_send : images.app_patient_images.chat.icon_send;

    /*useEffect(() => {
        console.log("Total mensagens: ", processedMessages.length);
    }, [processedMessages]);
    */

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            keyboardVerticalOffset={screenHeight * 0.04}
            behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
            <LinearGradient colors={['#fcf7fc', '#bed3e6']} style={styles.chat}>
                {
                    sendToNoteLoading.loading &&
                    <View style={[styles.overlay,
                    { backgroundColor: userType === 'doctor' ? 'rgba(30, 65, 69, 0.5)' : 'rgba(51, 30, 69, 0.5)' }
                    ]} />
                }
                {
                    chatUser &&
                    <MessageList
                        processedMessages={processedMessages}
                        messages={messages}
                        viewabilityConfig={viewabilityConfig}
                        flatListRef={flatListRef}
                        userType={userType}
                        userData={userData}
                        chatUser={chatUser}
                        page={page}
                        fetchMessagesLoading={fetchMessagesLoading}
                        selectedMessages={selectedMessages}
                        onScroll={handleScroll}
                        handleLongPressMessage={handleLongPressMessage}
                        handleTapMessage={handleTapMessage}
                        handleGetMessages={handleGetMessages}
                        handleViewableItemsChanged={handleViewableItemsChanged}
                        scrollToIndexFailed={scrollToIndexFailed}
                    />
                }
                {
                    !currentChatNote ?
                        <ChatInputMessage
                            userData={userData}
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            handleSendNewMessage={() => handleSendNewMessage({
                                senderId: userData?._id,
                                senderType: userType,
                                mentionedMessage: currentMentionedMessage
                            })}
                            isRecording={isRecording}
                            recordTime={recordTime}
                            showScrollToBottom={showScrollToBottom}
                            scrollToBottom={scrollToBottom}
                            audioAnimatedStyle={audioAnimatedStyle}
                            longPressGesture={longPressGesture}
                            newMessageLoading={newMessageLoading}
                            sendIcon={sendIcon}
                            audioIcon={audioIcon}
                            userType={userData?.type as UserType}
                            currentMentionedMessage={currentMentionedMessage}
                            clearCurrentMentionedMessage={clearCurrentMentionedMessage}
                            clearSelection={clearSelection}
                            isSelecting={isSelecting}
                        />
                        :
                        <ButtonSendMessagesToNote
                            selectedMessages={selectedMessages}
                            sendToNoteLoading={sendToNoteLoading}
                            handleSendMessageToNoteModal={handleSendMessageToNoteModal}
                        />
                }
            </LinearGradient>
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
    },
})

export default Content;