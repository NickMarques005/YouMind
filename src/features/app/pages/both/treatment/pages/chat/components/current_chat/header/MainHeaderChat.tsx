import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { ChatUser, MentionedMessageTemplate, MessageSelected, } from 'types/chat/Chat_Types';
import useMenuAnimation from '@hooks/animation/UseMenuAnimation';
import ChatMenu from '../menu/ChatMenu';
import { UserType } from 'types/user/User_Types';
import DefaultChatHeader from './DefaultChatHeader';
import { useMainHeaderManager } from './hooks/useMainHeaderManager';
import { useHeaderAnimation } from '../../../../../../../../../../hooks/animation/useHeaderAnimation';
import Animated from 'react-native-reanimated';
import MessageHandlingHeader from './MessageHandlingHeader';
import { ChatHeaderType } from '@utils/header/chatTypes';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import SendToNoteHeader from './SendToNoteHeader';
import { LoadingStructure } from 'types/loading/Loading_Types';

interface ChatMainHeaderChatProps {
    userType: UserType;
    chatUser: ChatUser | null;
    chatMenu: boolean;
    isSelecting: boolean;
    selectedMessages: MessageSelected[];
    currentMentionedMessage: MentionedMessageTemplate | undefined;
    currentChatNote: NoteTemplate | undefined;
    sendToNoteLoading: LoadingStructure;
    replySelectedMessage: (selectedMessage: MessageSelected) => void;
    handleChatMenu: () => void;
    handleChatNavigateBack: () => void;
    clearSelection: () => void;
    handleMessageDeleteModal: () => void;
    markSelectedMessages: (selectedMessages: MessageSelected[], isMarked: boolean) => void;
    clearCurrentChatNote: () => void;
}

const MainHeaderChat = ({
    userType,
    chatUser,
    chatMenu,
    isSelecting,
    selectedMessages,
    currentChatNote,
    sendToNoteLoading,
    replySelectedMessage,
    handleChatNavigateBack,
    handleChatMenu,
    clearSelection,
    handleMessageDeleteModal,
    markSelectedMessages,
    clearCurrentChatNote
}: ChatMainHeaderChatProps) => {

    const [currentHeader, setCurrentHeader] = useState<ChatHeaderType>(ChatHeaderType.DEFAULT);
    const { opacity, translateY, closeMenu } = useMenuAnimation({ isVisible: chatMenu, onClose: handleChatMenu });
    const { switchHeader, headerAnimatedStyle } = useHeaderAnimation({ setCurrentHeader, currentHeader });

    useMainHeaderManager({
        isSelecting,
        currentChatNote,
        switchHeader
    });

    return (
        <>
            <View style={[{ backgroundColor: userType === 'doctor' ? '#3a94a6' : '#9b3aa6' }, styles.mainContainer]}>
                <Animated.View style={[{ flex: 1 }, headerAnimatedStyle]}>
                    {
                            currentHeader === ChatHeaderType.DEFAULT ? (
                            <DefaultChatHeader
                                userType={userType}
                                chatUser={chatUser}
                                handleChatMenu={handleChatMenu}
                                handleChatNavigateBack={handleChatNavigateBack}
                                chatMenu={chatMenu}
                                closeMenu={closeMenu}
                            />
                        ) :
                            currentHeader === ChatHeaderType.MESSAGE_HANDLING ? (
                                <MessageHandlingHeader
                                    handleBack={clearSelection}
                                    handleReply={replySelectedMessage}
                                    handleRemove={handleMessageDeleteModal}
                                    handleMark={markSelectedMessages}
                                    selectedMessages={selectedMessages}
                                />
                            ) :
                                currentHeader === ChatHeaderType.SEND_TO_NOTE && currentChatNote ? (
                                    <SendToNoteHeader
                                        handleBack={clearCurrentChatNote}
                                        selectedNoteMessages={selectedMessages}
                                        currentChatNote={currentChatNote}
                                        sendToNoteLoading={sendToNoteLoading}
                                    />
                                ) : null
                    }
                </Animated.View>
            </View>
            {chatMenu && (
                <ChatMenu
                    opacity={opacity}
                    translateY={translateY}
                    closeChatMenu={closeMenu}
                    userType={userType as UserType}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: screenWidth,
        height: screenHeight * 0.12,
        top: 0,
        zIndex: 1,
        paddingLeft: 15,
        paddingRight: 20,
        elevation: 80,
    }
});

export default MainHeaderChat;